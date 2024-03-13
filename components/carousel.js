"use client"

import Image from 'next/image'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Carousel({ images }) {

    const imageRoll = useRef()
    const [realRoll, setRealRoll] = useState(['/Tattoo1.png', '/Tattoo2.png', '/Tattoo3.png'])

    useEffect(() => {
        imageRoll.current = images
    }, [])

    function moveImageRoll(amount) {
        if (amount === 1) {
            imageRoll.current.push(imageRoll.current.shift())
        } else {
            imageRoll.current.unshift(imageRoll.current.pop())
        }
        setRealRoll(imageRoll.current.slice(0, 3))
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
                    <Image className="rounded-lg"
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