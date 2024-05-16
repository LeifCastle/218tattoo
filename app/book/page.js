"use client"

import axios from 'axios';
import Image from "next/image"
import BookingDateTime from "../../components/bookingDateTime"
import moment from 'moment';
import { useRef, useState, useEffect } from "react"

export default function Book() {
    const client = axios.create({
        baseURL: "http://localhost:5000"
    });

    const [dateTime, setDateTime] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [errors, setErrors] = useState({ personalInfo: { name: false, email: false, phone: false, age: false } })
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
    }, [name, email, phone, age])


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
                <div className="mx-4 text-3xl">Personal Info</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500 cursor-pointer"
                    src="/rightArrowWhite.png"
                    width={50}
                    height={50}
                    alt="NextPic"
                    onClick={(e) => hideBar(e, personalInfoBar.current)}
                />
            </div>
            <div ref={personalInfoBar} className="overflow-hidden transition-height ease-in-out duration-500">
                <div className="flex justify-center items-center gap-20">
                    <div className="flex flex-col">
                        <div className="flex gap-4 pt-6 items-center justify-center">
                            <p className={inputName}>Name</p>
                            <input id="name" placeholder="Me" value={name} onChange={(e) => setName(e.target.value)} className={`${inputField} ${errors.personalInfo.name ? 'border-inputError' : 'transparent'}`}></input>
                        </div>
                        <div className="flex gap-4 py-6 items-center justify-center">
                            <p className={inputName}>Email</p>
                            <input id="email" placeholder="me@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputField}></input>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 pt-6 items-center justify-center">
                            <p className={inputName} value={phone} onChange={(e) => setPhone(e.target.value)}>Phone</p>
                            <input id="phone" placeholder="360-663-6036" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputField}></input>
                        </div>
                        <div className="flex gap-4 py-6 items-center justify-left">
                            <p className={inputName}>I am 18+</p>
                            <input id="age" placeholder="360-663-6036" type="checkbox" className={inputField}></input>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tattoo Options Bar */}
            <div className="flex justify-between items-center bg-blueA py-2 w-full">
                <div className="w-[50px] ml-[5vw]"></div>
                <div className="mx-4 text-3xl">Flash Design</div>
                <div className="mx-4 text-3xl">Custom Design</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500 cursor-pointer"
                    src="/rightArrowWhite.png"
                    width={50}
                    height={50}
                    alt="NextPic"
                    onClick={(e) => hideBar(e, tattooOptionsBar.current)}
                />
            </div>
            <div ref={tattooOptionsBar} className="overflow-hidden transition-height ease-in-out duration-500">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-4 pt-6 items-center justify-center">
                        <p className={inputName}>Name</p>
                        <input placeholder="Me" className={inputField}></input>
                    </div>
                    <div className="flex gap-4 py-6 items-center justify-center">
                        <p className={inputName}>Email</p>
                        <input placeholder="me@gmail.com" className={inputField}></input>
                    </div>
                </div>
            </div>
            {/* Finalize Booking (without payment for now) */}
            <div className="w-full flex justify-center pb-10">
                <button type="submit" className="bg-blueA rounded-md p-3">Book Your Appointment</button>
            </div>
            {/* <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div> */}

        </form>
    )
}