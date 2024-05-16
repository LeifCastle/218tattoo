"use client"

import Image from 'next/image.js';
import Carousel from '../components/carousel.js'
import {useRef} from 'react'

export default function Home() {

  const scrollRef = useRef(null)
  let favoriteImages = ['/Tattoo1.png', '/Tattoo2.png', '/Tattoo3.png', '/Tattoo4.png', '/Tattoo5.png', '/Tattoo6.png', '/Tattoo7.png']

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
        <div className="mt-[52px] Tablet:mt-[-92px] text-center text-white flex flex-col items-center">
          <p className="Tablet:hidden text-[1.75rem]">Lynden Tattoo Shop</p>
          <p className="Tablet:hidden text-[1.3rem] mb-5">Weekend Bookings</p>
          <p className="hidden Tablet:block text-[3rem] Tablet:text-[5rem] font-title font-[1000]">218 Tattoo Shop</p>
          <p className="hidden Tablet:block text-[1.5rem]">Weekend Bookings - Lynden, WA</p>
          <p className="hidden Tablet:block mt-10 text-[1.3rem] Tablet:text-[1.75rem]">218 Tattoo Company is a safe and inclusive space for all art lovers.</p>
          <p className="mt-10 Tablet:mt-2 text-[1.3rem] Tablet:text-[1.75rem]">Clean and professional, our artist is looking forward to bringing your next design to life.</p>
          <Image className="opacity-[80%] hover:opacity-[100%] animate-arrowAnimate mt-[25vh] hover:cursor-pointer"
            src="/downArrow.png"
            width={150}
            height={150}
            alt="Down Arrow"
            onClick={handlePageScroll}
          />
        </div>
      </div>
      <div className="relative bg-brownA text-black py-10">
        <div className="flex items-center justify-center absolute top-0 left-0 h-[60px] w-full Tablet:w-[40vw] bg-blueA Tablet:rounded-br-md mr-10">
          <p className="text-[1.8rem] text-white">What We Offer</p>
        </div>
        <div className="flex items-center justify-center gap-10 Tablet:mt-10">
          <div className="relative flex flex-col bg-[#CCCCCC] rounded-lg text-center gap-4 text-xl pb-4 group">
            <Image className="rounded-tl-lg rounded-tr-lg group-hover:opacity-[30%]"
              src="/TattooSessionCover.jpg"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <p className="font-bold group-hover:opacity-[30%]">Tattoo Sessions</p>
            <p className="group-hover:opacity-[30%]">$25 Depoist</p>
            <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
          </div>
          <div className="relative flex flex-col bg-[#CCCCCC] rounded-lg text-center gap-4 text-xl pb-4 group">
            <Image className="rounded-tl-lg rounded-tr-lg group-hover:opacity-[30%]"
              src="/EarPiercingCover.jpg"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <p className="font-bold group-hover:opacity-[30%]">Ear Piercing</p>
            <p className="group-hover:opacity-[30%]">$15 Depoist</p>
            <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
          </div>
          <div className="relative flex flex-col bg-[#CCCCCC] rounded-lg text-center gap-4 text-xl pb-4 group">
            <Image className="rounded-tl-lg rounded-tr-lg group-hover:opacity-[30%]"
              src="/ToothGemCover.jpg"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <p className="font-bold group-hover:opacity-[30%]">Tooth Gems</p>
            <p className="group-hover:opacity-[30%]">$10 Depoist</p>
            <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-brownA text-black pb-10">
        <div className="self-start flex items-center justify-center h-[60px] w-full Tablet:w-[40vw] bg-blueA Tablet:rounded-tr-md Tablet:rounded-br-md">
          <p className="text-[1.8rem] text-white">Customer Favorites</p>
        </div>
        <div className="mt-10">
          <Carousel images={favoriteImages} />
        </div>
      </div>
    </>
  );
}
