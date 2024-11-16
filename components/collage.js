/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";

export default function Collage() {
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

  const [imageReel, setImageReel] = useState([
    photoList[0],
    photoList[1],
    photoList[2],
    photoList[3],
    photoList[4],
    photoList[5],
  ]);

  const [randomImage, setRandomImage] = useState(null);
  const lastRandomIndex = useRef(null); //prevents the same image slot from being changed twice in a row even if randomly selected
  const weights = useRef(new Array(imageReel.length).fill(1)); // Initialize weights

  // Weighted random selection function
  const pickWeightedRandomIndex = () => {
    const totalWeight = weights.current.reduce((acc, weight) => acc + weight, 0);
    const threshold = Math.random() * totalWeight;

    let runningSum = 0;
    for (let i = 0; i < weights.current.length; i++) {
      runningSum += weights.current[i];
      if (threshold <= runningSum) {
        // Reduce weight to avoid immediate reselection
        weights.current[i] = Math.max(0.5, weights.current[i] - 0.5); 
        return i;
      }
    }
    return 0; // Fallback
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex;
      // Ensure the new index is not the same as the last one
      do {
        randomIndex = pickWeightedRandomIndex();
      } while (randomIndex === lastRandomIndex.current);
      setRandomImage(randomIndex);
      lastRandomIndex.current = randomIndex;

      setTimeout(() => {
        setImageReel((prevReel) => {
          const newReel = [...prevReel];
          // Filter the photoList to exclude already visible images
          const availableImages = photoList.filter(
            (photo) => !prevReel.includes(photo)
          );

          // Pick a random image from the filtered list
          if (availableImages.length > 0) {
            newReel[randomIndex] =
              availableImages[
                Math.floor(Math.random() * availableImages.length)
              ];
          } 
          return newReel;
        });

        // Reset fadingImage after fade-in
        setTimeout(() => setRandomImage(null), 600);
      }, 750);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-evenly items-center p-4">
      <div className="container mx-auto px-5 py-2 lg:px-32">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[0]}
                width={150}
                height={200}
                loading="eager"
                className={`${
                  randomImage === 0 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[1]}
                width={150}
                height={200}
                loading="eager"
                className={`${
                  randomImage === 1 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[2]}
                width={400}
                height={600}
                loading="eager"
                className={`${
                  randomImage === 2 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[3]}
                width={150}
                height={200}
                loading="eager"
                className={`${
                  randomImage === 3 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[4]}
                width={150}
                height={120}
                loading="eager"
                className={`${
                  randomImage === 4 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                alt="gallery"
                src={imageReel[5]}
                width={400}
                height={600}
                loading="eager"
                className={`${
                  randomImage === 5 ? "animate-imageReel" : ""
                } h-full w-full rounded-lg object-cover object-center max-h-[50vh]`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
