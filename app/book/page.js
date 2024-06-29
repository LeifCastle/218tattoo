"use client"

import axios from 'axios';
import Image from 'next/image.js';
import BookingDateTime from "../../components/bookingDateTime"
import Designs from "../../components/designs"
import { useRef, useState, useEffect, useContext } from "react"
import { GlobalStateContext } from '../utils/context.js';
import { CldUploadWidget } from 'next-cloudinary';

import ServiceOptions from "../../components/serviceOptions"

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
    const hasErrors = useRef(false)
    const errorBar = useRef(null)
    const [formTitle, setFormTitle] = useState('Service')


    const [formProgress, setFormProgress] = useState(1)

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
        console.log('tryna be booked')
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

    //Sets the form title according to a user's form progress
    useEffect(() => {
        switch (formProgress) {
            case 1:
                setFormTitle("Service")
                break;
            case 2:
                setFormTitle('Service Details')
                break;
            case 3:
                setFormTitle("Contact")
                break;
            case 4:
                setFormTitle("Appointment")
                break;
        }
    }, [formProgress])

    useEffect(() => {
        booked ? disableScrolling() : enableScrolling()
    }, [booked])

    return (
        <>
            <div ref={errorBar} className='hidden bg-inputError h-[48px] flex items center jusifty center sticky top-[92px] z-[11]'>
                <p className='text-2xl text-center w-full translate-y-[15%]'>Missing info</p>
            </div>
            <form onSubmit={handleBooking} className={`${booked ? 'opacity-[.3]' : ''} bg-white opacity-90 bg-cover min-h-[50vh] relative flex flex-col items-center`}>
                {/* <Image className={`w-full h-[300px] object-cover opacity-80`}
                    src='/tattooBanner.jpg'
                    width={1798}
                    height={1200}
                    alt="Add Reference Photo"
                />
                <div className='w-full h-[300px] absolute top-0 left-0 opacity-50 bg-black'></div>
                <div className='text-white text-8xl text-center absolute top-0 left-0 w-full h-[300px] flex items-center justify-center'>
                    <h2>Book Your Appointment</h2>
                </div>
                */}
                {/*Start*/}
                <div class="p-5 w-[75vw]">
                    <div class="flex items-center">
                        {/* Step 1 */}
                        <div class="flex items-center text-teal-600 relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Service</div>
                        </div>
                        {/* Border */}
                        <div className="relative flex-auto">
                            <div className="absolute inset-0 border-t-2 border-gray-300"></div>
                            <div className={`absolute inset-0 border-t-2 border-teal-600 transition-all duration-1000 ${formProgress > 1 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                        </div>
                        {/* Step 2 */}
                        <div class="flex items-center text-white relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus ">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Service Details</div>
                        </div>
                        {/* Border */}
                        <div className="relative flex-auto">
                            <div className="absolute inset-0 border-t-2 border-gray-300"></div>
                            <div className={`absolute inset-0 border-t-2 border-teal-600 transition-all duration-1000 ${formProgress > 2 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                        </div>
                        {/* Step 3 */}
                        <div class="flex items-center text-gray-500 relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Contact</div>
                        </div>
                        {/* Border */}
                        <div className="relative flex-auto">
                            <div className="absolute inset-0 border-t-2 border-gray-300"></div>
                            <div className={`absolute inset-0 border-t-2 border-teal-600 transition-all duration-1000 ${formProgress > 3 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                        </div>
                        {/* Step 4 */}
                        <div class="flex items-center text-gray-500 relative">
                            <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                </svg>
                            </div>
                            <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Appointment</div>
                        </div>
                    </div>
                </div>
                {/*End*/}
                <div className='text-5xl text-black pt-10'>{formTitle}</div>
                <div className='py-10'>
                    {/*----Service Options----*/}
                    <div className={formProgress === 1 ? 'block' : 'hidden'}>
                        <ServiceOptions setService={setService} setFormProgress={setFormProgress} />
                    </div>
                    {/*----Service Details----*/}
                    <div className={`${formProgress === 2 ? 'block' : 'hidden'} py-10 w-[50vw]`}>
                        {service === 'tattoo' ? ( //Tattoo 
                            <div className="flex items-center justify-between">
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
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`}>Description</p>
                                        <textarea id="Comments" placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} ${errors.service.comments ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} w-full max-w-[448px] h-[10vh]`}></textarea>
                                    </div>
                                </div>
                                <div>
                                    {tattooDesign === "custom" ?
                                        <div>
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
                            <div className="flex items-center w-full justify-between">
                                <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                        <input placeholder="Canines" value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${errors.service.placement ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} ${inputField}`}></input>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`}>Gem Count</p>
                                        <input placeholder="2" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.service.count ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`}>Comments</p>
                                        <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} border-[#998C7E] w-full max-w-[448px] h-[10vh]`}></textarea>
                                    </div>
                                </div>
                                <div>
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
                            <div className="flex items-center w-full justify-between">
                                <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                        <input placeholder="Ears" value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${errors.service.placement ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'} ${inputField}`}></input>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`}>Peircing Count</p>
                                        <input placeholder="2" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.service.count ? 'border-inputError border-opacity-60' : 'border-[#998C7E]'}`}></input>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <p className={`${inputName}`}>Comments</p>
                                        <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} border-[#998C7E] w-full max-w-[448px] h-[10vh]`}></textarea>
                                    </div>
                                </div>
                                <div>
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
                    </div>
                    {/*----Contact----*/}
                    <div className={`${formProgress === 3 ? '' : 'hidden'}`}>
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
                    {/*----Appointment----*/}
                    <div className={`${formProgress === 4 ? '' : 'hidden'} w-[50vw]`}>
                        <BookingDateTime booked={booked} errors={errors} setDateTime={setDateTime} />
                    </div>
                </div>
                <div className='flex justify-between w-[50vw] mb-10'>
                    <button type="button" className={`${formProgress > 1 ? 'visible' : 'invisible'} text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200 bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition`}
                        onClick={() => setFormProgress(formProgress - 1)}>Previous</button>
                    <button type="button" className={`${formProgress > 1 && formProgress < 4 ? 'visible' : 'invisible'} text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-teal-600  bg-teal-600 text-teal-100 border duration-200 ease-in-out border-teal-600 transition`}
                        onClick={() => setFormProgress(formProgress + 1)}>Next</button>
                </div>
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
                <p className='text-2xl text-black my-12 text-center'>You&apos;re appointment has been scheduled, please check your{email ? phone ? ' phone or email' : ' email' : ' phone'} for our confirmation</p>
                <p className='text-4xl text-black mb-6 text-center'>Thanks for booking with us!</p>
            </div>
        </>
    )
}