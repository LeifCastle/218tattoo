"use client"

import BookingDateTime from "../../components/bookingDateTime"

export default function Book() {

    function hideBar(arrow, bar) {
        if(bar.style.height === "0px"){
            bar.style.height = "500px"
            arrow.currentTarget.style.transform = "rotate(-90deg)";
        } else{
            bar.style.height = `${bar.scrollHeight}px`
            const _forceReflow = bar.scrollHeight
            bar.style.height = "0px"
            arrow.currentTarget.style.transform = "rotate(90deg)";
        }
    }

    return (
        <div className="bg-brownA bg-cover">
            <BookingDateTime hideBar={hideBar}/>
            <div className="flex justify-center bg-blueA py-2 w-full">
                    <div className="mx-4 text-3xl">Personal Info</div>
                </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex gap-4 py-6 items-center justify-center">
                    <p>Your Name</p>
                    <input placeholder="Me" className=""></input>
                </div>
                <div className="flex gap-4 py-6 items-center justify-center">
                    <p>Your Email</p>
                    <input placeholder="me@gmail.com" className="rounded-[12px] pl-2 text-black bg-inputBg border-2 border-transparent focus:border-inputBorder focus:outline-none hover:bg-inputHoverBg"></input>
                </div>
            </div>
            <p>Book</p>
            <button>See Bookings</button>
            <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div>
            <div className="h-[40vh]"></div>
        </div>
    )
}