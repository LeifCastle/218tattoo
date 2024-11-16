"use client";

import { useState, useEffect, useRef } from "react";
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

  const [imageReel, setImageReel] = useState([photoList[0], photoList[1], photoList[2], photoList[3], photoList[4], photoList[5]]);
  const imageRefs = useRef([]);

  const [randomImage, setRandomImage] = useState(null);
  const lastRandomIndex = useRef(null);
  const weights = useRef(new Array(imageReel.length).fill(1));

  const pickWeightedRandomIndex = () => {
    const totalWeight = weights.current.reduce((acc, weight) => acc + weight, 0);
    const threshold = Math.random() * totalWeight;
    let runningSum = 0;

    for (let i = 0; i < weights.current.length; i++) {
      runningSum += weights.current[i];
      if (threshold <= runningSum) {
        weights.current[i] = Math.max(0.5, weights.current[i] - 0.5);
        return i;
      }
    }
    return 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex;
      do {
        randomIndex = pickWeightedRandomIndex();
      } while (randomIndex === lastRandomIndex.current);
      
      setRandomImage(randomIndex);
      lastRandomIndex.current = randomIndex;

      // Update the image reel after 750ms (animation duration)
      setTimeout(() => {
        setImageReel((prevReel) => {
          const newReel = [...prevReel];
          const availableImages = photoList.filter(photo => !prevReel.includes(photo));
          if (availableImages.length > 0) {
            newReel[randomIndex] = availableImages[Math.floor(Math.random() * availableImages.length)];
          }
          return newReel;
        });
      }, 1000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Apply animation when the `randomImage` changes
  useEffect(() => {
    if (randomImage !== null) {
      const currentImage = imageRefs.current[randomImage];
      currentImage.classList.add("animate-imageReel");

      setTimeout(() => {
        currentImage.classList.remove("animate-imageReel");
      }, 2000);
    }
  }, [randomImage]);

  return (
    <div className="flex justify-evenly items-center p-4">
      <div className="container mx-auto px-5 py-2 lg:px-32">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[0] = el)}
                alt="gallery"
                src={imageReel[0]}
                width={150}
                height={200}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[1] = el)}
                alt="gallery"
                src={imageReel[1]}
                width={150}
                height={200}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[2] = el)}
                alt="gallery"
                src={imageReel[2]}
                width={400}
                height={600}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[3] = el)}
                alt="gallery"
                src={imageReel[3]}
                width={150}
                height={200}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[4] = el)}
                alt="gallery"
                src={imageReel[4]}
                width={150}
                height={120}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <Image
                ref={(el) => (imageRefs.current[5] = el)}
                alt="gallery"
                src={imageReel[5]}
                width={400}
                height={600}
                className="h-full w-full rounded-lg object-cover object-center max-h-[50vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
