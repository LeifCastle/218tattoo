"use client"

import axios from 'axios';
import Image from 'next/image.js';
import BookingDateTime from "../../components/bookingDateTime"
import { useRef, useState, useEffect, useContext } from "react"
import { GlobalStateContext } from '../utils/context.js';
import CustomUpload from "../../components/customUpload"
import { useRouter } from 'next/navigation';

import ServiceOptions from "../../components/serviceOptions"

export default function Book() {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    //**----Form Values----**//
    //Service Details
    const [placement, setPlacement] = useState('')
    const [size, setSize] = useState('')
    const [count, setCount] = useState('')
    const [comments, setComments] = useState('')
    const [designType, setDesignType] = useState('')

    //Contact
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    //Appointment
    const [dateTime, setDateTime] = useState('')
    const [selectedDay, setSelectedDay] = useState('')

    const [referencePhotos, setReferencePhotos] = useState([])
    const { service, setService } = useContext(GlobalStateContext); //Global context is used so it can be preset from the home page
    const { formProgress, setFormProgress } = useContext(GlobalStateContext); //Global context is used so it can be preset from the home page
    const userSubmissionAttempt = useRef(false);

    const [booked, setBooked] = useState(false)
    const errorBar = useRef(null)
    const [formTitle, setFormTitle] = useState('Service')
    const [scrolled, setScrolled] = useState(false)

    const router = useRouter()

    //--Form values to be submitted to server
    let newBooking = {
        appointment: {
            dateTime: dateTime,
        },
        contact: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
        },
        service: {
            service: service,
            designType: designType,
            placement: placement,
            size: size,
            count: count,
            comments: comments,
            referencePhotos: referencePhotos,
        }
    }

    const [errors, setErrors] = useState({
        //Service Details
        designType: false,
        placement: false,
        size: false,
        count: false,
        comments: false,

        //Contact
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
    })

    //Tailwind CSS Presets
    let inputName = "text-sm text-black"
    let inputField = `w-full rounded pl-2 text-black bg-white border-2 focus:border-teal-600 focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg`

    //--Submits booking
    function handleBooking() {
        console.log('tryna be booked')
        //let truePhotos = referencePhotos.filter(photo => photo.src != '/addFile.png')
        //newBooking.service.referencePhotos = [...truePhotos]

        client.post('/book/new', { newBooking })
            .then(response => {
                console.log('Sucess', response)
            })
            .catch(error => {
                console.log('Error: ', error)
            })
    }

    //--Sets scrolled status
    useEffect(() => {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 1) {
                setScrolled(true)
            }
            if (scrollPosition < 1) {
                setScrolled(false)
            }
        });
    }, [])

    //--Sets the form title according to a user's form progress
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
            case 5:
                setFormTitle("Sucess")
                break;
        }
    }, [formProgress])

    function updateErrorStatus(inputs) {
        let noErrors = true;
        for (let key in inputs) {
            if (inputs[key] === "" && userSubmissionAttempt.current === true) {
                setErrors(prevErrors => ({ ...prevErrors, [key]: true }));
                noErrors = false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [key]: false }));
            }
        }
        if (noErrors && userSubmissionAttempt.current === true) {
            setFormProgress(prevProgress => prevProgress + 1); // Increment form progress
            userSubmissionAttempt.current = false; // Update user submission attempt flag
            if (formProgress === 4) { //Resets the form after a user books
                setBooked(false)
                setDesignType('')
                setEmail('')
                setPhone('')
                setFirstName('')
                setLastName('')
                setPlacement('')
                setSize('')
                setCount('')
                setComments('')
                handleBooking() //Book the appointment
            }
        }
    }

    // Effect to update error status whenever inputs change
    useEffect(() => {
        updateErrorStatus({ designType, placement, size, count, comments });
    }, [designType, placement, size, count, comments]);

    // Function to advance form progress
    function advanceFormProgress() {
        userSubmissionAttempt.current = true; // Set submission attempt flag
        switch (formProgress) {
            case 2:
                switch (service) {
                    case 'Tattoo':
                        updateErrorStatus({ designType, placement, size, comments });
                        break;
                    case 'Piercing':
                        updateErrorStatus({ placement, count, comments });
                        break;
                    case 'Tooth':
                        updateErrorStatus({ size, count, comments });
                        break;
                }
            case 3:
                updateErrorStatus({ firstName, lastName, email, phone });
                break;
            case 4:
                updateErrorStatus({ dateTime });
                break;
        }
    }

    function regressFormProgress() {
        let resetErrors = errors
        for (let input in resetErrors) {
            resetErrors[input] = false;
        }
        setErrors(resetErrors);
        setFormProgress(formProgress - 1)
    }


    return (
        <>
            <div ref={errorBar} className='hidden bg-inputError h-[48px] flex items center jusifty center sticky top-[92px] z-[11]'>
                <p className='text-2xl text-center w-full translate-y-[15%]'>Missing info</p>
            </div>
            <form onSubmit={handleBooking} className={`${booked ? 'opacity-[.3]' : ''} opacity-95 bg-cover flex flex-col items-center`}>
                {/*---Booking Banner---*/}
                <div className={`w-full relative h-[200px] Tablet:h-[375px]`}>
                    <Image className={`w-full h-[200px] Tablet:h-[375px] object-cover opacity-80`}
                        src='/tattooBanner.jpg'
                        width={1798}
                        height={1200}
                        alt="Add Reference Photo"
                    />
                    <div className={`${scrolled ? 'opacity-70' : 'opacity-50'} transition-all duration-500 w-full min-h-[200px] Tablet:min-h-[375px] absolute top-0 left-0 bg-black`}></div>
                    <div className={`${scrolled ? 'text-gray-400 scale-[.75]' : 'scale-[1] text-white'} text-center ease-in-out duration-500 absolute top-0 left-0 w-full min-h-[200px] Tablet:min-h-[375px] flex items-center justify-center`}>
                        <p className='text-white text-4xl Mobile-L:text-5xl Tablet:text-6xl Laptop:text-7xl text-wrap'>Book Your Appointment</p>
                    </div>
                </div>
                {/*---Booking Form---*/}
                <div className={`${scrolled ? 'mt-[-20px] Tablet:mt-[-40px] Laptop:mt-[-100px]' : ''} bg-pageGrey w-full z-[2] flex flex-col items-center transition-all duration-500`}>
                    {/*---Progress Bar---*/}
                    <div className="px-5 pt-10 Mobile-L:[px-10] w-[100vw] Mobile-L:w-[95vw] Tablet:w-[80vw] Monitor:w-[50vw]">
                        <div className="flex items-center">
                            {/* Step 1 */}
                            <div className="flex items-center text-progressBarComplete relative">
                                <div className={`${formProgress >= 1 ? 'border-progressBarComplete' : 'border-gray-400'} ${formProgress > 1 ? 'bg-progressBarComplete' : ''} rounded-full transition duration-500 ease-in-out h-11 w-11 Mobile-L:h-12 Mobile-L:w-12 py-3 border-2`}>
                                    <svg viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill={`${formProgress > 1 ? 'white' : '#606773'}`}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus "></g><g id="SVGRepo_iconCarrier">
                                        <path d="M4.334 21.39a6.166 6.166 0 0 1-1.151-.317 4.233 4.233 0 0 1-2.014-1.575 3.945 3.945 0 0 1 .575-4.804 13.407 13.407 0 0 1 3.549-2.401c1.133-.607 2.337-1.328 2.458-2.122.073-.41-.072-.67-.52-1.024a7.441 7.441 0 0 0-1.631-.82c-.61-.243-1.249-.463-1.903-.766a5.268 5.268 0 0 1-.99-.578 1.985 1.985 0 0 1-.786-1.19 1.525 1.525 0 0 1 .09-.828 1.803 1.803 0 0 1 .426-.606 3.477 3.477 0 0 1 1.022-.645 7.69 7.69 0 0 1 2.105-.529 10.898 10.898 0 0 1 4.193.338.5.5 0 0 1-.265.965 9.856 9.856 0 0 0-3.786-.207 6.592 6.592 0 0 0-1.775.49 2.352 2.352 0 0 0-.665.433c-.164.187-.174.241-.154.37.023.236.537.597 1.107.822.572.244 1.21.443 1.854.675a8.645 8.645 0 0 1 1.979.932 2.905 2.905 0 0 1 .907.96 2.275 2.275 0 0 1 .25 1.423 3.454 3.454 0 0 1-1.347 2.122 14.096 14.096 0 0 1-1.778 1.182 12.174 12.174 0 0 0-3.041 2.157 2.45 2.45 0 0 0-.617 1.33 1.794 1.794 0 0 0 .295 1.28A3.3 3.3 0 0 0 5.5 19.5a.99.99 0 0 1 .363.063 2.958 2.958 0 0 1-.755.639 1.493 1.493 0 0 0-.774 1.189zM22.11 6.018L18.4 9.35l-7.45 7.25 1.4 1.4 7.25-7.449 3.383-3.661a.626.626 0 0 0-.873-.873zM9.368 17.619l1.439 1.738a2.94 2.94 0 0 1-1.63 2.234 3.92 3.92 0 0 1-1.626.359 3.598 3.598 0 0 1-1.733-.427s1.8-.968 1.809-2.464c.006-1.38 1.451-1.44 1.703-1.44zm.35 1.99l-.78-.94a.379.379 0 0 0-.311.395 3.191 3.191 0 0 1-.633 1.85 3.042 3.042 0 0 0 .772-.234 1.823 1.823 0 0 0 .952-1.07z"></path><path fill="none" d="M0 0h24v24H0z"></path></g>
                                    </svg>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-[11px] Mobile-L:text-[13px] font-medium uppercase text-progressBarComplete">Service</div>
                            </div>
                            {/* Border */}
                            <div className="relative flex-auto">
                                <div className="absolute inset-0 border-t-2 border-gray-400"></div>
                                <div className={`absolute inset-0 border-t-2 border-progressBarComplete transition-all duration-1000 ${formProgress > 1 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                            </div>
                            {/* Step 2 */}
                            <div className="flex items-center text-white relative">
                                <div className={`${formProgress >= 2 ? 'border-progressBarComplete' : 'border-gray-400'} ${formProgress > 2 ? 'bg-progressBarComplete' : ''} rounded-full transition duration-500 ease-in-out  h-11 w-11 Mobile-L:h-12 Mobile-L:w-12 py-3 border-2`}>
                                    <svg fill={`${formProgress > 2 ? 'white' : '#606773'}`} width="100%" height="100%" viewBox="0 0 34 34" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>clipboard-line</title>
                                            <path d="M29.29,5H27V7h2V32H7V7H9V5H7A1.75,1.75,0,0,0,5,6.69V32.31A1.7,1.7,0,0,0,6.71,34H29.29A1.7,1.7,0,0,0,31,32.31V6.69A1.7,1.7,0,0,0,29.29,5Z" className="clr-i-outline clr-i-outline-path-1"></path>
                                            <path d="M26,7.33A2.34,2.34,0,0,0,23.67,5H21.87a4,4,0,0,0-7.75,0H12.33A2.34,2.34,0,0,0,10,7.33V11H26ZM24,9H12V7.33A.33.33,0,0,1,12.33,7H16V6a2,2,0,0,1,4,0V7h3.67a.33.33,0,0,1,.33.33Z" className="clr-i-outline clr-i-outline-path-2"></path>
                                            <rect x="11" y="14" width="14" height="2" className="clr-i-outline clr-i-outline-path-3"></rect>
                                            <rect x="11" y="18" width="14" height="2" className="clr-i-outline clr-i-outline-path-4"></rect>
                                            <rect x="11" y="22" width="14" height="2" className="clr-i-outline clr-i-outline-path-5"></rect>
                                            <rect x="11" y="26" width="14" height="2" className="clr-i-outline clr-i-outline-path-6"></rect>
                                            <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
                                        </g>
                                    </svg>
                                </div>
                                <div className={`${formProgress >= 2 ? 'text-progressBarComplete' : 'text-gray-500'} absolute top-0 -ml-10 text-center mt-16 w-32 text-[11px] Mobile-L:text-[13px] font-medium uppercase`}>Service Details</div>
                            </div>
                            {/* Border */}
                            <div className="relative flex-auto">
                                <div className="absolute inset-0 border-t-2 border-gray-400"></div>
                                <div className={`absolute inset-0 border-t-2 border-progressBarComplete transition-all duration-1000 ${formProgress > 2 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                            </div>
                            {/* Step 3 */}
                            <div className="flex items-center text-gray-500 relative">
                                <div className={`${formProgress >= 3 ? 'border-progressBarComplete' : 'border-gray-400'} ${formProgress > 3 ? 'bg-progressBarComplete' : ''} rounded-full transition duration-500 ease-in-out  h-11 w-11 Mobile-L:h-12 Mobile-L:w-12 py-3 border-2 border-gray-400`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke={`${formProgress > 3 ? 'white' : '#606773'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail ">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div className={`${formProgress >= 3 ? 'text-progressBarComplete' : 'text-gray-500'} absolute top-0 -ml-10 text-center mt-16 w-32 text-[11px] Mobile-L:text-[13px] font-medium uppercase`}>Contact</div>
                            </div>
                            {/* Border */}
                            <div className="relative flex-auto">
                                <div className="absolute inset-0 border-t-2 border-gray-400"></div>
                                <div className={`absolute inset-0 border-t-2 border-progressBarComplete transition-all duration-1000 ${formProgress > 3 ? `w-full animate-progressForwards` : 'w-0 animate-progressBackwards'}`}></div>
                            </div>
                            {/* Step 4 */}
                            <div className="flex items-center text-gray-500 relative">
                                <div className={`${formProgress >= 4 ? 'border-progressBarComplete' : 'border-gray-400'} ${formProgress > 4 ? 'bg-progressBarComplete' : ''} rounded-full transition duration-500 ease-in-out h-11 w-11 Mobile-L:h-12 Mobile-L:w-12 py-3 border-2 border-gray-400`}>
                                    <svg viewBox="0 0 31 31" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                        <g clipPath="url(#clip0_901_963)">
                                            <path d="M26 4H30C30.553 4 31 4.447 31 5V30C31 30.553 30.553 31 30 31H2C1.447 31 1 30.553 1 30V5C1 4.447 1.447 4 2 4H3M10 4H19M7 13H9M7 19H9M7 25H9M15 13H17M15 19H17M15 25H17M23 13H25M23 19H25M23 25H25M10 6C10 6.553 9.553 7 9 7H7C6.447 7 6 6.553 6 6V2C6 1.447 6.447 1 7 1H9C9.553 1 10 1.447 10 2V6ZM26 6C26 6.553 25.553 7 25 7H23C22.447 7 22 6.553 22 6V2C22 1.447 22.447 1 23 1H25C25.553 1 26 1.447 26 2V6Z" stroke={`${formProgress > 4 ? 'white' : '#606773'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g> <defs> <clipPath id="clip0_901_963"> <rect width="32" height="32" fill="white"></rect> </clipPath> </defs> </g>
                                    </svg>
                                </div>
                                <div className={`${formProgress >= 4 ? 'text-progressBarComplete' : 'text-gray-500'} absolute top-0 ml-[-50%] text-center mt-16 text-[11px] Mobile-L:text-[13px] font-medium uppercase mb-4`}>Appointment</div>
                            </div>
                        </div>
                    </div>
                    <div className='text-5xl text-black text-center mt-20'>{formTitle}</div>
                    <div className='pb-5'>
                        {/*----Service Options----*/}
                        <div className={formProgress === 1 ? 'block' : 'hidden'}>
                            <ServiceOptions setService={setService} setFormProgress={setFormProgress} />
                        </div>
                        {/*----Service Details----*/}
                        <div className={`${formProgress === 2 ? 'block' : 'hidden'} pt-10 Tablet:pb-10 w-full`}>
                            {service === 'Tattoo' ? ( //Tattoo 
                                <div className="flex flex-col Tablet:flex-row items-center Tablet:items-stretch Tablet:gap-12 justify-between Mobile-L:[px-10] w-[100vw] Mobile-L:w-[95vw] Tablet:w-[80vw] Monitor:w-[50vw]">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl w-full max-w-[250px] Mobile-M:max-w-[300px] Mobile-L:max-w-[350px]">
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Tattoo Design</p>
                                            <select value={designType} onChange={(e) => setDesignType(e.target.value)} className={`${inputField} ${errors.designType ? 'border-inputError' : 'border-inputBorder'}`}>
                                                <option className="hidden" value="" disabled>Select Design</option>
                                                <option value="flash">Flash Design</option>
                                                <option value="custom">Custom Design</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Body Placement</p>
                                            <select value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${inputField} ${errors.placement ? 'border-inputError' : 'border-inputBorder'}`}>
                                                <option value="" disabled className='hidden'>Select Placement</option>
                                                <option value="arm">Arm</option>
                                                <option value="shoulder">Shoulder</option>
                                                <option value="hand">Hand</option>
                                                <option value="neck">Neck</option>
                                                <option value="torso">Torso</option>
                                                <option value="leg">Leg</option>
                                                <option value="feet">Feet</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Artwork Size</p>
                                            <input placeholder="3 inches" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.size ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Description</p>
                                            <textarea placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`h-[15vh] ${inputField} ${errors.comments ? 'border-inputError' : 'border-inputBorder'}`}></textarea>
                                        </div>
                                    </div>
                                    <CustomUpload referencePhotos={referencePhotos} setReferencePhotos={setReferencePhotos} />
                                </div>
                            ) : service === 'Tooth' ? ( //Tooth Gem
                                <div className="flex flex-col items-center Tablet:gap-12 justify-between Mobile-L:[px-10] w-[100vw] Mobile-L:w-[95vw] Tablet:w-[80vw] Monitor:w-[50vw]">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl w-full max-w-[250px] Mobile-M:max-w-[300px] Mobile-L:max-w-[350px]">
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Gem size</p>
                                            <input placeholder="Canines" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.size ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Gem Count</p>
                                            <input placeholder="2" type="number" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.count ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Comments</p>
                                            <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`h-[15vh] ${inputField} ${errors.comments ? 'border-inputError' : 'border-inputBorder'}`}></textarea>
                                        </div>
                                    </div>
                                </div>
                            ) : ( //Pericing
                                <div className="flex flex-col items-center Tablet:gap-12 justify-between Mobile-L:[px-10] w-[100vw] Mobile-L:w-[95vw] Tablet:w-[80vw] Monitor:w-[50vw]">
                                    <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl w-full max-w-[250px] Mobile-M:max-w-[300px] Mobile-L:max-w-[350px]">
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <select value={placement} onChange={(e) => setPlacement(e.target.value)} className={`${inputField} ${errors.placement ? 'border-inputError' : 'border-inputBorder'}`}>
                                                <option value="" disabled className='hidden'>Select Placement</option>
                                                <option value="top Lobe">Top Lobe</option>
                                                <option value="bottom Lobe">Bottom Lobe</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Peircing Count</p>
                                            <input placeholder="2" value={count} onChange={(e) => setCount(e.target.value)} className={`${inputField} ${errors.count ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start w-full">
                                            <p className={`${inputName}`}>Comments</p>
                                            <textarea placeholder="I would like..." value={comments} onChange={(e) => setComments(e.target.value)} className={`h-[15vh] ${inputField} ${errors.comments ? 'border-inputError' : 'border-inputBorder'}`}></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/*----Contact----*/}
                        <div className={`${formProgress === 3 ? '' : 'hidden'} py-5 Tablet:py-10 w-[250px] Mobile-M:w-[300px]  Mobile-L:w-[350px] flex justify-center`}>
                            <div className="flex flex-col justify-center items-center gap-6 text-xl w-full">
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <p className={`${inputName}`}>First Name</p>
                                    <input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${inputField} ${errors.firstName ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                </div>
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <p className={`${inputName}`}>Last Name</p>
                                    <input placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${inputField} ${errors.lastName ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                </div>
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <p className={`${inputName}`}>Email</p>
                                    <input placeholder="john.smith@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputField} ${errors.email ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                </div>
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <p className={`${inputName}`}>Phone</p>
                                    <input placeholder="123-456-7890" value={phone} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        onChange={(e) => {
                                            const phoneNumber = e.target.value.replace(/[^\d-]/g, ""); // Remove non-numeric characters except "-"
                                            e.target.value = phoneNumber;
                                            setPhone(phoneNumber)
                                        }} className={`${inputField} ${errors.phone ? 'border-inputError' : 'border-inputBorder'}`}></input>
                                </div>
                            </div>
                        </div>
                        {/*----Appointment----*/}
                        <div className={`${formProgress === 4 ? '' : 'hidden'} w-[250px] Mobile-M:w-[300px]  Mobile-L:w-[350px]`}>
                            <BookingDateTime booked={booked} errors={errors} setDateTime={setDateTime} selectedDay={selectedDay} setSelectedDay={setSelectedDay} theme="large"/>
                        </div>
                        {/*----Booking Success----*/}
                        <div className={`${formProgress === 5 ? '' : 'hidden'} rounded-lg w-[90vw] Mobile-L:w-[80vw] Tablet:w-[50vw] flex flex-col justify-between items-center p-4`}>
                            <p className='text-2xl text-black my-12 text-center'>You&apos;re appointment has been scheduled, please check your{email ? phone ? ' phone or email' : ' email' : ' phone'} for our confirmation</p>
                            <p className='text-4xl text-black mb-6 text-center'>Thanks for booking with us!</p>
                        </div>
                    </div>
                    <div className={`${formProgress > 4 ? 'justify-center' : 'justify-between'} flex Mobile-L:[px-10] w-[250px] Mobile-M:w-[300px]  Mobile-L:w-[350px] Tablet:w-[80vw] Monitor:w-[50vw] mb-10`}>
                        <button type="button" className={`${formProgress > 1 && formProgress < 5 ? 'block' : 'hidden'} text-base hover:scale-110 focus:outline-none flex justify-center px-6 py-3 rounded font-bold cursor-pointer hover:bg-gray-200 bg-gray-100 text-gray-700 border duration-300 ease-in-out border-gray-600 transition`}
                            onClick={() => regressFormProgress()}>Previous</button>
                        <button type="button" className={`${formProgress > 1 && formProgress < 5 ? 'block' : 'hidden'} text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-6 py-3 rounded font-bold cursor-pointer hover:bg-progressBarComplete  bg-progressBarComplete text-white border duration-300 ease-in-out border-progressBarComplete transition`}
                            onClick={() => advanceFormProgress()}>{formProgress > 3 ? 'Book' : 'Next'}</button>
                        <button type="button" className={`${formProgress > 4 ? 'block' : 'hidden'} text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-6 py-3 rounded font-bold cursor-pointer hover:bg-progressBarComplete  bg-progressBarComplete text-white border duration-300 ease-in-out border-progressBarComplete transition`}
                            onClick={() => {
                                router.push('/')
                                setFormProgress(1)
                            }}>Return Home</button>

                    </div>
                </div>
            </form>
        </>
    )
}