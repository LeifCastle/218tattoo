"use client"

import Image from 'next/image.js';
import Carousel from '../components/carousel.js'
import Link from 'next/link'
import { useRef } from 'react'
import { useContext } from 'react';
import { GlobalStateContext } from './utils/context.js';

export default function Home() {

  const { service, setService } = useContext(GlobalStateContext);

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
      before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.5)] before:z-[-1]">
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
      <div className="relative bg-brownA text-black py-10">
        <div className="flex items-center justify-center absolute top-0 left-0 h-[60px] w-full Tablet:w-[25vw] bg-blueA Tablet:rounded-br-md mr-10">
          <p className="text-[1.8rem] text-white">What We Offer</p>
        </div>
        <div className="flex items-center justify-center gap-10 mt-10 flex flex-col Tablet:flex-row mx-10">
          <div className="min-w-[160px] relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
              <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
                src="/TattooSessionCover.jpg"
                width={350}
                height={400}
                alt="Tattoo"
              />
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <p className="font-bold group-hover:opacity-[30%] duration-500 ">Tattoo Sessions</p>
              <p className="group-hover:opacity-[30%] duration-500 ">$25 Depoist</p>
            </div>
            <Link href="/book" onClick={() => setService('tattoo')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</Link>
          </div>
          <div className="relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
            <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
              src="/EarPiercingCover.jpg"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <p className="font-bold group-hover:opacity-[30%] duration-500 ">Ear Piercing</p>
              <p className="group-hover:opacity-[30%] duration-500 ">$15 Depoist</p>
            </div>
            <Link href="/book" onClick={() => setService('piercing')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</Link>
          </div>
          <div className="relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
            <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
              src="/ToothGemCover.jpg"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <p className="font-bold group-hover:opacity-[30%] duration-500 ">Tooth Gems</p>
              <p className="group-hover:opacity-[30%] duration-500 ">$10 Depoist</p>
            </div>
            <Link href="/book" onClick={() => setService('tooth')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</Link>
          </div>
        </div>
      </div >
      <div className="flex flex-col items-center justify-center bg-brownA text-black pb-10">
        <div className="self-start flex items-center justify-center h-[60px] w-full Tablet:w-[25vw] bg-blueA Tablet:rounded-tr-md Tablet:rounded-br-md">
          <p className="text-[1.8rem] text-white">Customer Favorites</p>
        </div>
        <div className="mt-10">
          <Carousel images={favoriteImages} />
        </div>
      </div>
    </>
  );
}
