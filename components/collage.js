"use client"

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';

export default function Collage({ images }) {

    const imageRoll = useRef()
    const [realRoll, setRealRoll] = useState(['/Tattoo1.png', '/Tattoo2.png', '/Tattoo3.png'])
    const imageRollSize = useRef(1)

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    useEffect(() => {
        imageRoll.current = images
        window.addEventListener("resize", debounce(handleResize, 250))
        handleResize()
    }, [])

    function handleResize() {
        const mediaQueryTablet = window.matchMedia('(min-width: 768px)').matches
        const mediaQueryLaptop = window.matchMedia('(min-width: 1024px)').matches
        mediaQueryTablet ? mediaQueryLaptop ? imageRollSize.current = 3 : imageRollSize.current = 2 : imageRollSize.current = 1
        setRealRoll(imageRoll.current.slice(0, imageRollSize.current))
    }

    function moveImageRoll(amount) {
        if (amount === 1) {
            imageRoll.current.push(imageRoll.current.shift())
        } else {
            imageRoll.current.unshift(imageRoll.current.pop())
        }
        setRealRoll(imageRoll.current.slice(0, imageRollSize.current))
    }

    return (
        <div className="flex justify-evenly items-center p-4">
            <div className="container mx-auto px-5 py-2 lg:px-32">
                <div className="-m-1 flex flex-wrap md:-m-2">
                    <div className="flex w-1/2 flex-wrap">
                        <div className="w-1/2 p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo1.png" />
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo2.png" />
                        </div>
                        <div className="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo3.png" />
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-wrap">
                        <div className="w-full p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo4.png" />
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo5.png" />
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <img
                                alt="gallery"
                                className="block h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
                                src="/Tattoo6.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}