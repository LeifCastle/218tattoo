"use client"

import Image from "next/image"
import BookingDateTime from "../../components/bookingDateTime"
import { useRef } from "react"

export default function Book() {

    const personalInfoBar = useRef(null)
    const tattooOptionsBar = useRef(null)

    let inputName = "text-xl"
    let inputField = "rounded-[12px] pl-2 text-black bg-inputBg border-2 border-transparent focus:border-inputBorder focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg"

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

    return (
        <div className="bg-brownA bg-cover min-h-[50vh]">
            <BookingDateTime hideBar={hideBar} />
            {/* Personal Info Bar */}
            <div className="flex justify-between items-center bg-blueA py-2 w-full">
                <div className="w-[50px] ml-[5vw]"></div>
                <div className="mx-4 text-3xl">Personal Info</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500"
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
                            <input placeholder="Me" className={inputField}></input>
                        </div>
                        <div className="flex gap-4 py-6 items-center justify-center">
                            <p className={inputName}>Email</p>
                            <input placeholder="me@gmail.com" className={inputField}></input>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-4 pt-6 items-center justify-center">
                            <p className={inputName}>Phone</p>
                            <input placeholder="360-663-6036" className={inputField}></input>
                        </div>
                        <div className="flex gap-4 py-6 items-center justify-left">
                            <p className={inputName}>I am 18+</p>
                            <input placeholder="360-663-6036" type="checkbox" className={inputField}></input>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tattoo Options Bar */}
            <div className="flex justify-between items-center bg-blueA py-2 w-full">
                <div className="w-[50px] ml-[5vw]"></div>
                <div className="mx-4 text-3xl">Flash Design</div>
                <div className="mx-4 text-3xl">Custom Design</div>
                <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500"
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
            <p>Book</p>
            <button>See Bookings</button>
            <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div>

        </div>
    )
}