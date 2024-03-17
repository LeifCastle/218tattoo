"use client"

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';

export default function Carousel({ images }) {

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
        <div className="flex justify-evenly items-center border-[3px] border-[#184d54] rounded-md p-4">
            <Image className="rounded-lg"
                src="/leftArrow.png"
                width={50}
                height={50}
                alt="NextPic"
                onClick={() => moveImageRoll(-1)}
            />
            <div className="flex gap-5 px-5">
                {realRoll.map((image) => (
                    <Image className="rounded-lg Tablet:w-[250px] Monitor:w-[350px]"
                        src={image}
                        width={350}
                        height={400}
                        alt="Tattoo"
                        key={image}
                    />
                ))}
            </div>
            <Image className="rounded-lg"
                src="/rightArrow.png"
                width={50}
                height={50}
                alt="NextPic"
                onClick={() => moveImageRoll(1)}
            />
        </div>
    )
}