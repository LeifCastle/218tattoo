import Image from 'next/image.js';
import Carousel from '../components/carousel.js'

export default function Home() {

  let favoriteImages = ['/Tattoo1.png', '/Tattoo2.png', '/Tattoo3.png', '/Tattoo4.png', '/Tattoo5.png', '/Tattoo6.png', '/Tattoo7.png']

  return (
    <>
      <div className="bg-homePage bg-cover h-[93vh] -translate-y-[92px] pt-[10vh] mb-[-10vh] flex-col items-center">
        <p className="pt-[20vh] text-[1.3rem] text-center">Tattoo and piercing passionate since 2020, specializing in American Traditional and Script. <br></br>
          218 Tattoo Company is LGBTQIA+, BIPOC, disability and ally friendly. All bodies are welcome!
          Racism, homophobia, transphobia, ableism and hate in all forms will not be tolerated. <br></br>
          Our goal is to create a safe and inclusive space for all art lovers.
        </p>
        <p className="mt-10 text-[2rem] text-center">Tattoo Shop</p>
      </div>
      <div className="relative bg-brownA text-black py-10">
        <div className="flex items-center justify-center absolute top-[-30px] left-0 h-[60px] w-full Tablet:w-[40vw] bg-blueA rounded-tr-md rounded-br-md mr-10">
          <p className="text-[1.8rem] text-white">What We Offer</p>
        </div>
        <div className="flex items-center justify-center gap-10 mt-10">
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
        <div className="self-start flex items-center justify-center h-[60px] w-full Tablet:w-[40vw] bg-blueA rounded-tr-md rounded-br-md">
          <p className="text-[1.8rem] text-white">Customer Favorites</p>
        </div>
        <div className="mt-10">
          <Carousel images={favoriteImages} />
        </div>
      </div>
    </>
  );
}
