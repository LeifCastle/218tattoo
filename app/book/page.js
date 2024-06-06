"use client"

import axios from 'axios';
import Image from "next/image"
import BookingDateTime from "../../components/bookingDateTime"
import Designs from "../../components/designs"
import { useRef, useState, useEffect, useContext } from "react"
import { GlobalStateContext } from '../utils/context.js';
import { CldUploadWidget } from 'next-cloudinary';

export default function Book() {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    //--Form Values
    const [dateTime, setDateTime] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [placement, setPlacement] = useState('')
    const [size, setSize] = useState('')
    const [count, setCount] = useState('')
    const [comments, setComments] = useState('')
    const [tattooDesign, setTattooDesign] = useState('flash') //Custom or flash
    const [design, setDesign] = useState('')
    const [referencePhotos, setReferencePhotos] = useState([{ id: 1, src: '/addFile.png' }, { id: 2, src: '/addFile.png' }, { id: 3, src: '/addFile.png' }, { id: 4, src: '/addFile.png' }])
    const { service, setService } = useContext(GlobalStateContext); //Global context is used so it can be preset from the home page

    const [booked, setBooked] = useState(false)
    const [designsWidget, setDesignsWidget] = useState(false); //Sets the visibility of the designs widget (images from cloudinary folder)
    const contactBar = useRef(null)
    const serviceBar = useRef(null)
    const hasErrors = useRef(false)
    const errorBar = useRef(null)


    //--Form values to be submitted to server
    let newBooking = {
        appointment: {
            dateTime: dateTime,
        },
        contact: {
            name: name,
            email: email,
            phone: phone,
        },
        service: {
            service: service,
            tattooDesign: tattooDesign,
            placement: placement,
            size: size,
            count: count,
            comments: comments,
            design: design,
            referencePhotos: referencePhotos,
        }
    }

    const [errors, setErrors] = useState({
        appointment: {
            dateTime: false,
        },
        contact: {
            name: false,
            email: false,
            phone: false,
        },
        service: {
            service: false,
            tattooDesign: false,
            placement: false,
            size: false,
            comments: false,
            design: false,
            referencePhotos: false,
            count: false,
        }
    })

    //Tailwind CSS Presets
    let inputName = "text-xl"
    let inputField = `rounded-[12px] pl-2 text-black bg-inputBg border-2 focus:border-inputBorder focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg`

    //--Checks for any errors in booking information (missing, etc...)
    function checkForErrors(usercheck) {
        function checkForData(section, key) {
            let booking = newBooking[section]
            let errors = newErrors[section]
            if (!booking[key]) {
                if (usercheck) {
                    errors[key] = true;
                    hasErrors.current = true;
                    errorBar.current.style.display = "block"
                    setTimeout(() => {
                        errorBar.current.style.display = "none"
                    }, 3500)
                }
            } else {
                errors[key] = false;
            }
        }
        hasErrors.current = false
        const newErrors = { ...errors };
        for (const section in newBooking) {
            for (const key in newBooking[section]) {
                switch (key) {
                    case "comments":
                        if (tattooDesign === "custom") {
                            checkForData(section, key)
                        }
                        break;
                    case "size":
                        if (service === "tattoo") {
                            checkForData(section, key)
                        }
                        break;
                    case "count":
                        if (service !== "tattoo") {
                            checkForData(section, key)
                        }
                        break;
                    case "referencePhotos":
                        if (tattooDesign === "custom") {
                            checkForData(section, key)
                        }
                        break;
                    case "phone":
                        if (!email) {
                            checkForData(section, key)
                        } else {
                            errors.contact.phone = false
                        }
                        break;
                    case "design":
                        if (tattooDesign !== "custom") {
                            checkForData(section, key)
                        }
                        break;
                    case "email":
                        if (!phone) {
                            checkForData(section, key)
                        }
                        else {
                            errors.contact.email = false
                        }
                        break;
                    case "tattooDesign":
                        break;
                    default:
                        checkForData(section, key)
                }
            }
        }
        setErrors(newErrors);
        //console.log('Errors: ', newErrors)
    }

    //--Updates error status on-the-fly
    useEffect(() => {
        checkForErrors()
    }, [name, email, phone, dateTime, service, tattooDesign, placement, size, count, comments, design, referencePhotos])

    //--Submits booking
    function handleBooking(e) {
        e.preventDefault();
        checkForErrors(true)
        if (!hasErrors.current) {
            let truePhotos = referencePhotos.filter(photo => photo.src != '/addFile.png')
            newBooking.service.referencePhotos = [...truePhotos]
            setBooked(true)
            client.post('/book/new', { newBooking })
                .then(response => {
                    console.log('Sucess', response)
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        }
    }

    function hideBar(arrow, bar) {
        if (bar.style.height === "3px") {
            bar.style.height = `${bar.scrollHeight}px`
            arrow.currentTarget.style.transform = "rotate(-90deg)";
        } else {
            bar.style.height = `${bar.scrollHeight}px`
            const _forceReflow = bar.scrollHeight
            bar.style.height = "3px"
            arrow.currentTarget.style.transform = "rotate(90deg)";
        }
    }

    function updatePhotoTiles(id, url) {
        const update = referencePhotos.map(photo => {
            if (photo.id === id) {
                console.log(photo.id)
                photo.src = url
                console.log('Photo: ', photo)
                return photo;
            }
            else {
                return photo;
            }
        })
        setReferencePhotos(update)
    }

    function handleDesignChoice(choice) {
        setService(choice)
        setDesign('') //Resets design image
        setCount('')
        setPlacement('')
        setComments('')
        setSize('')
        let newErrors = errors;
        for (let key in newErrors.service) {
            newErrors.service[key] = false
        }
        setErrors(newErrors)
    }

    function disableScrolling() {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function enableScrolling() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    useEffect(() => {
        booked ? disableScrolling() : enableScrolling()
    }, [booked])

    return (
        <>
            <div ref={errorBar} className='hidden bg-inputError h-[48px] flex items center jusifty center sticky top-[92px] z-[11]'>
                <p className='text-2xl text-center w-full translate-y-[15%]'>Uh oh...it apperas you&apos;re missing some info</p>
            </div>
            <form onSubmit={handleBooking} className={`${booked ? 'opacity-[.3]' : ''} bg-brownA bg-cover min-h-[50vh]`}>
                <BookingDateTime booked={booked} errors={errors} hideBar={hideBar} setDateTime={setDateTime} />
                {/* Contact Bar */}
                <div className={`${Object.values(errors?.contact)?.some(Boolean) ? 'bg-inputError' : 'bg-blueA'} flex justify-between items-center py-2 w-full`}>
                    <div className="basis-1/3"></div>
                    <div className="text-center basis-1/3 mx-4 text-3xl">Contact</div>
                    <div className="basis-1/3 flex justify-end pr-[5vw]">
                        <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] transition-all ease-in-out duration-500 cursor-pointer"
                            src="/rightArrowWhite.png"
                            width={50}
                            height={50}
                            alt="NextPic"
                            onClick={(e) => hideBar(e, contactBar.current)}
                        />
                    </div>
                </div>
                <div ref={contactBar} className="overflow-y-hidden transition-height ease-in-out duration-500">
                    <div className="flex flex-col items-center justify-center items-end gap-6 py-6 text-xl">
                        <div className="flex gap-4 items-center">
                            <p className={`${inputName}`}>Name</p>
                            <input id="name" placeholder="Me" value={name} onChange={(e) => setName(e.target.value)} className={`${inputField} ${errors.contact.name === true ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className={`${inputName}`}>Phone</p>
                            <input id="phone" placeholder="360-663-6036" value={phone} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                onChange={(e) => {
                                    const phoneNumber = e.target.value.replace(/[^\d-]/g, ""); // Remove non-numeric characters except "-"
                                    e.target.value = phoneNumber;
                                    setPhone(phoneNumber)
                                }} className={`${inputField} ${errors.contact.phone ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className={`${inputName}`}>Email</p>
                            <input id="email" placeholder="me@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputField} ${errors.contact.email ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                        </div>
                    </div>
                </div>
                {/* Service Bar */}
                <div className={`${Object.values(errors?.service)?.some(Boolean) ? 'bg-inputError' : 'bg-blueA'} flex justify-between items-center py-2 w-full`}>
                    <div className="basis-1/3"></div>
                    <div className="text-center basis-1/3 mx-4 text-3xl">Service</div>
                    <div className="basis-1/3 flex justify-end pr-[5vw]">
                        <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] transition-all ease-in-out duration-500 cursor-pointer"
                            src="/rightArrowWhite.png"
                            width={50}
                            height={50}
                            alt="NextPic"
                            onClick={(e) => hideBar(e, serviceBar.current)}
                        />
                    </div>
                </div>
                <div ref={serviceBar} className="overflow-y-hidden transition-height ease-in-out duration-[800ms]">
                    <div className="flex flex-col Tablet:flex-row justify-center my-10">
                        <div className="flex flex-row Tablet:flex-col basis-1/3 justify-center items-center gap-6 text-xl pb-6 Tablet:pb-0">
                            <button type="button" className={`rounded-md ${service === 'tattoo' ? 'bg-blueA p-3 Tablet:p-5 text-2xl' : 'bg-greyB p-2 Tablet:p-3 text-xl'}`} onClick={() => handleDesignChoice('tattoo')}>Tattoo</button>
                            <button type="button" className={`rounded-md ${service === 'piercing' ? 'bg-blueA p-3 Tablet:p-5 text-2xl' : 'bg-greyB p-2 Tablet:p-3 text-xl'}`} onClick={() => handleDesignChoice('piercing')}>Peircing</button>
                            <button type="button" className={`rounded-md ${service === 'tooth' ? 'bg-blueA p-3 Tablet:p-5 text-2xl' : 'bg-greyB p-2 Tablet:p-3 text-xl'}`} onClick={() => handleDesignChoice('tooth')}>Tooth Gem</button>
                        </div>
                        {service === 'tattoo' ? ( //Tattoo 
                            <div className="basis-1/3 mx-6 grow-1">
                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Select Design</p>
                                            <select placeholder="Select" value={tattooDesign} onChange={(e) => setTattooDesign(e.target.value)} className={`${inputField} w-[238px] border-[#998C7E]`}>
                                                <option value="flash">Flash Design</option>
                                                <option value="custom">Custom Design</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                            <input id="Placement" placeholder="Left shoulder" value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${inputField} ${errors.service.placement ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`}>Rough Size</p>
                                            <input id="Size" placeholder="3 inches" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.service.size ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                        </div>
                                    </div>
                                    {tattooDesign === "custom" ?
                                        <div>
                                            <div className="flex flex-col gap-4 pb-6 items-center">
                                                <p className={`${inputName}`}>Description</p>
                                                <textarea id="Comments" placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} ${errors.service.comments ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} w-full max-w-[448px] h-[10vh]`}></textarea>
                                            </div>
                                            <div className="flex flex-col gap-4 items-center">
                                                <p className={`${inputName}`}>Reference Photos</p>
                                                <div className="flex gap-4">
                                                    {referencePhotos.map(photo => {
                                                        return (
                                                            <div key={photo.id} onChange={(e) => setComments(e.target.value)}
                                                                style={{ backgroundImage: (photo.src === '/addFile.png' ? 'none' : `url(${photo.src})`) }}
                                                                className={`rounded-[12px] w-[75px] h-[75px] Tablet:w-[100px] Tablet:h-[100px] bg-${photo.src === '/addFile.png' ? 'greyB' : ''} bg-cover flex items-center justify-center relative`}>
                                                                <Image className={`${photo.src === '/addFile.png' ? photo.src : 'hidden'} rounded-lg hover:scale-125 transition-all ease-in-out duration-500 cursor-pointer mb-[12px]`}
                                                                    src={photo.src}
                                                                    width={50}
                                                                    height={50}
                                                                    alt="Add Reference Photo"
                                                                />
                                                                <div className={`${photo.src === '/addFile.png' ? photo.src : 'hidden'} absolute bottom-0 Tablet:bottom-[6px] text-black}`}>Upload</div>
                                                                <CldUploadWidget signatureEndpoint={`${process.env.NEXT_PUBLIC_SERVER_URL}/book/signImage`}
                                                                    onSuccess={(results) => {
                                                                        console.log('Public ID', results);
                                                                        const url = results.info.url;
                                                                        console.log('URL: ', url)
                                                                        updatePhotoTiles(photo.id, url)
                                                                    }}>
                                                                    {({ open }) => {
                                                                        return (
                                                                            <div className="absolute top-0 left-0 w-full h-full hover:cursor-pointer" onClick={() => open()}>

                                                                            </div>
                                                                        );
                                                                    }}
                                                                </CldUploadWidget>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className='w-full flex flex-col items-center'>
                                            <div className="flex flex-col gap-4 pb-6 items-center w-full">
                                                <p className={`${inputName}`}>Comments</p>
                                                <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} border-[#998C7E] w-full max-w-[448px] h-[10vh]`}></textarea>
                                            </div>
                                            <p className={`${inputName} pb-6`}>Chose from over 100+ handpicked designs</p>
                                            <div onClick={() => setDesignsWidget(!designsWidget)}
                                                style={{ backgroundImage: (design === '' ? 'none' : `url(${design})`) }}
                                                className={`${design === '' ? errors.service.design ? 'bg-inputError h-[100px]' : 'bg-greyB h-[100px]' : 'h-[448px]'} ${booked ? '' : 'hover:scale-[1.075] hover:cursor-pointer'} bg-cover duration-500 rounded-[12px] w-full max-w-[448px] flex items-center justify-center relative`}>
                                                <div className={`${design === '' ? 'block' : 'hidden'} text-white text-4xl hover:cursor-pointer`}>Browse Designs</div>
                                            </div>
                                            <Designs visibility={designsWidget} setVisibility={setDesignsWidget} setDesign={setDesign} designType="Test" />
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : service === 'tooth' ? ( //Tooth Gem
                            <div className="basis-1/3 mx-6">
                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                            <input placeholder="Canines" value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${errors.service.placement ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} ${inputField}`}></input>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`}>Gem Count</p>
                                            <input placeholder="2" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.service.count ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 pb-6 items-center w-full">
                                        <p className={`${inputName}`}>Comments</p>
                                        <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} border-[#998C7E] w-full max-w-[448px] h-[10vh]`}></textarea>
                                    </div>
                                    <p className={`${inputName} pb-6`}>Chose from over 100+ handpicked gems</p>
                                    <div onClick={() => setDesignsWidget(!designsWidget)}
                                        style={{ backgroundImage: (design === '' ? 'none' : `url(${design})`) }}
                                        className={`${design === '' ? errors.service.design ? 'bg-inputError h-[100px]' : 'bg-greyB h-[100px]' : 'h-[448px]'} ${booked ? '' : 'hover:scale-[1.075] hover:cursor-pointer'} bg-cover duration-500 rounded-[12px] w-full max-w-[448px] flex items-center justify-center relative`}>
                                        <div className={`${design === '' ? 'block' : 'hidden'} text-white text-4xl hover:cursor-pointer`}>Browse Gems</div>
                                    </div>
                                    <Designs visibility={designsWidget} setVisibility={setDesignsWidget} setDesign={setDesign} designType="Gem" />
                                </div>
                            </div>
                        ) : ( //Pericing
                            <div className="basis-1/3 mx-6">
                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                            <input placeholder="Ears" value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${errors.service.placement ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} ${inputField}`}></input>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className={`${inputName}`}>Peircing Count</p>
                                            <input placeholder="2" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.service.count ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 pb-6 items-center w-full">
                                        <p className={`${inputName}`}>Comments</p>
                                        <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} border-[#998C7E] w-full max-w-[448px] h-[10vh]`}></textarea>
                                    </div>
                                    <p className={`${inputName} pb-6`}>Chose from over 100+ handpicked peircings</p>
                                    <div onClick={() => setDesignsWidget(!designsWidget)}
                                        style={{ backgroundImage: (design === '' ? 'none' : `url(${design})`) }}
                                        className={`${design === '' ? errors.service.design ? 'bg-inputError h-[100px]' : 'bg-greyB h-[100px]' : 'h-[448px]'} ${booked ? '' : 'hover:scale-[1.075] hover:cursor-pointer'} bg-cover duration-500 rounded-[12px] w-full max-w-[448px] flex items-center justify-center relative`}>
                                        <div className={`${design === '' ? 'block' : 'hidden'} text-white text-4xl hover:cursor-pointer`}>Browse Piercings</div>
                                    </div>
                                    <Designs visibility={designsWidget} setVisibility={setDesignsWidget} setDesign={setDesign} designType="Piercings" />
                                </div>
                            </div>
                        )}
                        <div className="basis-1/3 grow-0"></div>
                    </div>
                </div>
                <div className="w-full h-2 bg-blueA"></div>
                {/* Finalize Booking (without payment for now) */}
                <div className="w-full flex justify-center py-10">
                    <button type="submit" className={`${booked ? 'cursor-default' : 'hover:scale-[1.15]'} bg-blueA rounded-md p-5 text-2xl duration-[750ms]`}>Book Your Appointment</button>
                </div>
                {/* <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div> */}

            </form>
            <div className={`${booked ? '' : 'hidden'} rounded-lg w-[90vw] Mobile-L:w-[80vw] Tablet:w-[50vw] h-auto bg-greyB fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col justify-between items-center p-4`}>
                <div className="absolute top-0 right-0 w-[50px] h-[60px] hover:scale-[1.25] duration-500" onClick={() => {
                    setBooked(false)
                    setDesign('')
                    setEmail('')
                    setPhone('')
                    setName('')
                    setPlacement('')
                    setSize('')
                    setCount('')
                    setComments('')
                    setReferencePhotos([{ id: 1, src: '/addFile.png' }, { id: 2, src: '/addFile.png' }, { id: 3, src: '/addFile.png' }, { id: 4, src: '/addFile.png' }])
                }}>
                    <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[17px] rotate-45 bg-blackA rounded w-[5px] h-[30px]"></div>
                    <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[17px] rotate-[-45deg] bg-blackA rounded w-[5px] h-[30px]"></div>
                </div>
                <p className='text-6xl text-black mt-6'>Success!</p>
                <p className='text-2xl text-black my-12 text-center'>You're appointment has been scheduled, please check your{email ? phone ? ' phone or email' : ' email' : ' phone'} for our confirmation</p>
                <p className='text-4xl text-black mb-6 text-center'>Thanks for booking with us!</p>
            </div>
        </>
    )
}