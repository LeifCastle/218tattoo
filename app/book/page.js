"use client"

import axios from 'axios';
import Image from "next/image"
import BookingDateTime from "../../components/bookingDateTime"
import moment from 'moment';
import { useRef, useState, useEffect } from "react"
import { useContext } from 'react';
import { GlobalStateContext } from '../utils/context.js';

export default function Book() {
    const client = axios.create({
        baseURL: "http://localhost:5000"
    });

    const { service, setService } = useContext(GlobalStateContext);

    const [dateTime, setDateTime] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [placement, setPlacement] = useState('')
    const [size, setSize] = useState('')
    const [comments, setComments] = useState('')
    const [tattooDesign, setTattooDesign] = useState('flash')

    const [errors, setErrors] = useState({ personalInfo: { name: false, email: false, phone: false } })
    const personalInfoBar = useRef(null)
    const tattooOptionsBar = useRef(null)
    const hasErrors = useRef(false)

    let newBooking = {
        dateTime: dateTime,
        name: name,
        email: email,
        phone: phone,
    }

    let inputName = "text-xl"
    let inputField = `rounded-[12px] pl-2 text-black bg-inputBg border-2 border-transparent focus:border-inputBorder focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg`

    //--Checks for any errors in booking information (missing, etc...)
    function checkForErrors() {
        hasErrors.current = false
        const newErrors = { ...errors, personalInfo: { ...errors.personalInfo } };
        for (const key in newBooking) {
            if (!newBooking[key]) {
                newErrors.personalInfo[key] = true;
                hasErrors.current = true;
            } else {
                newErrors.personalInfo[key] = false;
            }
        }
        setErrors(newErrors);
    }

    //--Updates error status on-the-fly
    useEffect(() => {
        if (hasErrors.current) {
            checkForErrors()
        }
    }, [name, email, phone])


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

    function addReferencePhoto() {
        //add photo and browse
    }

    //--Submits booking
    function handleBooking(e) {
        e.preventDefault();
        checkForErrors()
        if (!hasErrors.current) {
            client.post('/book/new', { newBooking })
                .then(response => {
                    console.log('Sucess', response)
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        }
    }

    return (
        <form onSubmit={handleBooking} className="bg-brownA bg-cover min-h-[50vh]">
            <BookingDateTime hideBar={hideBar} dateTime={dateTime} setDateTime={setDateTime} />
            {/* Personal Info Bar */}
            <div className={`${Object.values(errors.personalInfo).some(Boolean) ? 'bg-inputError' : 'bg-blueA'} flex justify-between items-center py-2 w-full`}>
                <div className="w-[50px] ml-[5vw]"></div>
                <div className="mx-4 text-3xl">Contact</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500 cursor-pointer"
                    src="/rightArrowWhite.png"
                    width={50}
                    height={50}
                    alt="NextPic"
                    onClick={(e) => hideBar(e, personalInfoBar.current)}
                />
            </div>
            <div ref={personalInfoBar} className="overflow-hidden transition-height ease-in-out duration-500 flex justify-center">
                <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                    <div className="flex gap-4 items-center">
                        <p className={`${inputName}`}>Name</p>
                        <input id="name" placeholder="Me" value={name} onChange={(e) => setName(e.target.value)} className={`${inputField} ${errors.personalInfo.name ? 'border-inputError' : 'transparent'}`}></input>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className={`${inputName}`} value={phone} onChange={(e) => setPhone(e.target.value)}>Phone</p>
                        <input id="phone" placeholder="360-663-6036" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputField}></input>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className={`${inputName}`}>Email</p>
                        <input id="email" placeholder="me@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputField}`}></input>
                    </div>
                </div>
            </div>
            {/* Tattoo Options Bar */}
            <div className="flex justify-between items-center bg-blueA py-2 w-full">
                <div className="w-[50px] ml-[5vw]"></div>
                <div className="mx-4 text-3xl">Service</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500 cursor-pointer"
                    src="/rightArrowWhite.png"
                    width={50}
                    height={50}
                    alt="NextPic"
                    onClick={(e) => hideBar(e, tattooOptionsBar.current)}
                />
            </div>
            <div ref={tattooOptionsBar} className="overflow-hidden transition-height ease-in-out duration-500 flex justify-center gap-40 my-10">
                <div className="flex flex-col basis-1/3 justify-center items-center gap-6 text-xl ">
                    <button className={`rounded-md ${service === 'tattoo' ? 'bg-blueA p-5 text-2xl' : 'bg-greyB p-3 text-xl'}`} onClick={() => setService('tattoo')}>Tattoo</button>
                    <button className={`rounded-md ${service === 'piercing' ? 'bg-blueA p-5 text-2xl' : 'bg-greyB p-3 text-xl'}`} onClick={() => setService('piercing')}>Peircing</button>
                    <button className={`rounded-md ${service === 'tooth' ? 'bg-blueA p-5 text-2xl' : 'bg-greyB p-3 text-xl'}`} onClick={() => setService('tooth')}>Tooth Gem</button>
                </div>
                {service === 'tattoo' ? ( //Tattoo 
                    <div className="basis-1/3">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Select Design</p>
                                    <select placeholder="Select" value={tattooDesign} onChange={(e) => setTattooDesign(e.target.value)} className={`${inputField} w-[238px]`}>
                                        <option value="flash">Flash Design</option>
                                        <option value="custom">Custom Design</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Placement</p>
                                    <input id="Placement" placeholder="Left shoulder" value={placement} onChange={(e) => setPlacement(e.target.value)} className={inputField}></input>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`}>Rough Size</p>
                                    <input id="Size" placeholder="3 inches" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.personalInfo.name ? 'border-inputError' : 'transparent'}`}></input>
                                </div>
                            </div>
                            {tattooDesign === "custom" ?
                                <div>
                                    <div className="flex flex-col gap-4 py-6 items-center">
                                        <p className={`${inputName}`}>Description</p>
                                        <textarea id="Comments" placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} w-[25vw] h-[10vh] w-auto`}></textarea>
                                    </div>
                                    <div className="flex flex-col gap-4 items-center">
                                        <p className={`${inputName}`}>Reference Photos</p>
                                        <div onChange={(e) => setComments(e.target.value)} className={`rounded-[12px] w-[25vw] h-[10vh] w-auto bg-greyB flex items-center justify-center relative`}>
                                            <Image className="rounded-lg hover:scale-125 transition-all ease-in-out duration-500 cursor-pointer"
                                                src="/addFile.png"
                                                width={50}
                                                height={50}
                                                alt="Add Reference Photo"
                                                onClick={() => addReferencePhoto()}
                                            />
                                            <div className="absolute bottom-0 text-black">Browse Files</div>
                                        </div>
                                    </div>
                                </div>
                                : <div>
                                    <div onChange={(e) => setComments(e.target.value)} className={`rounded-[12px] w-[25vw] h-[10vh] w-auto bg-greyB flex items-center justify-center relative`}>
                                            <Image className="rounded-lg hover:scale-125 transition-all ease-in-out duration-500 cursor-pointer"
                                                src="/addFile.png"
                                                width={50}
                                                height={50}
                                                alt="Add Reference Photo"
                                                onClick={() => addReferencePhoto()}
                                            />
                                            <div className="absolute bottom-0 text-black">Choose Flash Design</div>
                                        </div>
                                </div>
                            }
                        </div>
                    </div>
                ) : service === 'tooth' ? ( //Tooth Gem
                    <div className="basis-1/3">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Select Styles</p>
                                    <input id="Placement" placeholder="Left shoulder" value={placement} onChange={(e) => setPlacement(e.target.value)} className={inputField}></input>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`}>Gem Count</p>
                                    <input id="Size" placeholder="3 inches" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.personalInfo.name ? 'border-inputError' : 'transparent'}`}></input>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <p className={`${inputName}`}>Comments</p>
                                <textarea id="Comments" placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} w-[25vw] h-[10vh] w-auto`}></textarea>
                            </div>
                        </div>
                    </div>
                ) : ( //Pericing
                    <div className="basis-1/3">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col justify-center items-end gap-6 py-6 text-xl">
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`} value={placement} onChange={(e) => setPlacement(e.target.value)}>Select Styles</p>
                                    <input id="Placement" placeholder="Left shoulder" value={placement} onChange={(e) => setPlacement(e.target.value)} className={inputField}></input>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className={`${inputName}`}>Placement</p>
                                    <input id="Size" placeholder="3 inches" value={size} onChange={(e) => setSize(e.target.value)} className={`${inputField} ${errors.personalInfo.name ? 'border-inputError' : 'transparent'}`}></input>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <p className={`${inputName}`}>Comments</p>
                                <textarea id="Comments" placeholder="A fierce eagle..." value={comments} onChange={(e) => setComments(e.target.value)} className={`${inputField} w-[25vw] h-[10vh] w-auto`}></textarea>
                            </div>
                        </div>
                    </div>
                )}
                <div className="basis-1/3"></div>
            </div>
            {/* Finalize Booking (without payment for now) */}
            <div className="w-full flex justify-center pb-10">
                <button type="submit" className="bg-blueA rounded-md p-5 text-2xl">Book Your Appointment</button>
            </div>
            {/* <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div> */}

        </form>
    )
}