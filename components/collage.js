/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";

export default function Collage() {
  const [Image1, setImage1] = useState();
  const [Image2, setImage2] = useState();
  const [Image3, setImage3] = useState();
  const [Image4, setImage4] = useState();
  const [Image5, setImage5] = useState();
  const [Image6, setImage6] = useState();

  const galleryStarted = useRef(false);

  const photoList = [
    "/Tattoo1.png",
    "/Tattoo2.png",
    "/Tattoo3.png",
    "/Tattoo4.png",
    "/Tattoo5.png",
    "/Tattoo6.png",
    "/Tattoo7.png",
    "/Tattoo8.png",
    "/Tattoo9.png",
    "/Tattoo10.png",
  ];

  function fadeImage(imageSlot, interval) {
    imageSlot(photoList[Math.floor(Math.random() * photoList.length)]);
    setTimeout(() => {
      imageSlot(photoList[Math.floor(Math.random() * photoList.length)]);
      setInterval(() => {
        imageSlot(photoList[Math.floor(Math.random() * photoList.length)]);
      }, interval);
    }, interval / 2);
  }

  useEffect(() => {
    if (!galleryStarted.current) {
      galleryStarted.current = true;
      fadeImage(setImage1, 10000);
      fadeImage(setImage2, 30000);
      fadeImage(setImage3, 20000);
      fadeImage(setImage4, 40000);
      fadeImage(setImage5, 60000);
      fadeImage(setImage6, 50000);
    }
  }, []);

  return (
    <div className="flex justify-evenly items-center p-4">
      <div className="container mx-auto px-5 py-2 lg:px-32">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image1}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image1" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image2}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image2" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image3}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image3" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image4}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image4" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image5}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image5" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={Image6}
                width={100}
                height={100}
                className={`${
                  galleryStarted.current ? "animate-image6" : "hidden"
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
