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

    function moveImageRoll(direction) {
        if(direction === 1){
            imageRoll.current.push(imageRoll.current.shift())
        } else {
            imageRoll.current.unshift(imageRoll.current.pop())
        }
        setRealRoll(imageRoll.current.slice(0,3))
    }

    return (
        <div className="pt-[90px] flex justify-evenly items-center">
            <div onClick={() => moveImageRoll(-1)}>back</div>
            {realRoll.map((image) => (
                <Image className="rounded-lg"
                    src={image}
                    width={350}
                    height={400}
                    alt="Tattoo"
                    key={image}
                />
            ))}
            <div onClick={() => moveImageRoll(1)}>forward</div>
        </div>
    )
}