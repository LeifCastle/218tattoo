"use client"

import Image from 'next/image.js';
import Collage from '../components/collage.js'
import Link from 'next/link'
import { useRef } from 'react'
import { useContext } from 'react';
import { GlobalStateContext } from './utils/context.js';
import ServiceOptions from "../components/serviceOptions"

export default function Home() {

  const { service, setService } = useContext(GlobalStateContext);
  const { formProgress, setFormProgress } = useContext(GlobalStateContext);

  const scrollRef = useRef(null)
  let favoriteImages = ['/Tattoo1.png', '/Tattoo2.png', '/Tattoo3.png', '/Tattoo4.png', '/Tattoo5.png', '/Tattoo6.png',]

  function handlePageScroll() {
    window.scrollTo({
      top: scrollRef.current.clientHeight - 92,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <div ref={scrollRef} className="bg-homePage bg-cover h-[60vh] Tablet:h-[100vh] -translate-y-[92px] mb-[-92px] flex flex-col items-center justify-center relative 
      px-10 Tablet:px-0
      before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.4)] before:z-[-1]">
        <div className="mt-[52px] Tablet:mt-[-92px] text-center text-white flex flex-col items-center justify-center">
          <p className="Tablet:hidden text-[1.75rem]">Lynden Tattoo Shop</p>
          <p className="Tablet:hidden text-[1.3rem] mb-5">Weekend Bookings</p>
          <p className="hidden Tablet:block text-[3rem] Tablet:text-[5rem] font-title font-[1000]">218 Tattoo Shop</p>
          <p className="hidden Tablet:block text-[1.5rem]">Weekend Bookings - Lynden, WA</p>
          <p className="hidden Tablet:block mt-10 text-[1.3rem] Tablet:text-[1.75rem]">218 Tattoo Company is a safe and inclusive space for all art lovers.</p>
          <p className="mt-10 Tablet:mt-2 text-[1.3rem] Tablet:text-[1.75rem]">Clean and professional, our artist is looking forward to bringing your next design to life.</p>
          <div className="h-[5vh] Tablet:h-[20vh]"></div>
        </div>
        <Image className="hidden Tablet:block opacity-[55%] hover:opacity-[100%] animate-arrowAnimate absolute bottom-0 mb-[7vh] hover:cursor-pointer transition-opacity duration-1000"
          src="/downArrow.png"
          width={100}
          height={100}
          alt="Down Arrow"
          onClick={handlePageScroll}
        />
      </div>
      <div className='bg-pageGrey'>
        <div className="relative bg text-black pt-10">
          <p className="w-full text-center text-3xl Mobile-L:text-4xl Tablet:text-5xl Laptop:text-6xl text-black/80 px-4 pb-5 Tablet:pb-10">Book An Appointment</p>
          <ServiceOptions setService={setService} setFormProgress={setFormProgress} />
        </div >
        <div className='w-full flex justify-center mt-4'><div className='w-[70vw] Tablet:w-[50vw] Monitor:w-[45vw] h-[3px] bg-black my-10 Tablet:my-20'></div></div>
        <div className="flex flex-col items-center justify-center text-black pb-10">
          <div className="">
            <Collage images={favoriteImages} />
          </div>
        </div>
      </div>
    </>
  );
}
