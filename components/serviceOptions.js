
import Image from "next/image"
import { useEffect } from 'react'

export default function ServiceOptions({setService, setFormProgress}) {

    function chooseService(service) {
        setService(service)
        setFormProgress('serviceDetails')
    }

    return (
        <div className="relative bg-brownA text-black py-10">
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
                    <button href="/book" onClick={() => chooseService('tattoo')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
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
                    <button href="/book" onClick={() => chooseService('piercing')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
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
                    <button href="/book" onClick={() => chooseService('tooth')} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] invisible group-hover:visible bg-blueA text-white p-5 rounded-lg">Book Now</button>
                </div>
            </div>
        </div >
    )
}