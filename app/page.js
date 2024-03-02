import Image from 'next/image'
//import Tattoo1 from '../public/Tattoo1'

export default function Home() {
  return (
    <>
      <main className="bg-white">
        <div className="bg-homePage bg-cover h-[93vh] -translate-y-[10vh] pt-[10vh] mb-[-10vh] flex-col items-center">
          <p className="pt-[20vh] text-[1.3rem] text-center">Tattoo and piercing passionate since 2020, specializing in American Traditional and Script. <br></br>
            218 Tattoo Company is LGBTQIA+, BIPOC, disability and ally friendly. All bodies are welcome!
            Racism, homophobia, transphobia, ableism and hate in all forms will not be tolerated. <br></br>
            Our goal is to create a safe and inclusive space for all art lovers.
          </p>
          <p className="mt-10 text-[2rem] text-center">Tattoo Shop</p>
        </div>
        <div className="relative bg-[#998c7e] text-black pb-10">
          <div className="flex items-center justify-center absolute top-[-30px] left-0 h-[60px] w-full Tablet:w-[40vw] bg-[#184d54] rounded-tr-md rounded-br-md">
            <p className="text-[1.8rem] text-white">Customer Favorites</p>
          </div>
          <div className="pt-[90px] flex justify-evenly">
            <Image className="rounded-lg"
              src="/Tattoo1.png"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <Image className="rounded-lg"
              src="/Tattoo2.png"
              width={350}
              height={400}
              alt="Tattoo"
            />
            <Image className="rounded-lg"
              src="/Tattoo3.png"
              width={350}
              height={400}
              alt="Tattoo"
            />

          </div>
        </div>
      </main>
    </>
  );
}
