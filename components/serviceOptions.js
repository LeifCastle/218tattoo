
import Image from "next/image"
import { useEffect } from 'react'

export default function ServiceOptions({ setService, setFormProgress }) {

    function chooseService(service) {
        setService(service)
        setFormProgress(2)
    }

    return (
        <div className="relative bg-white text-black flex items-center justify-center gap-10 mt-10 flex flex-col Tablet:flex-row mx-10">
            <div
                onClick={() => chooseService('piercing')}
                className="group hover:cursor-pointer relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group h-[320px] w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
                <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
                    src="/EarPiercingCover.jpg"
                    width={350}
                    height={400}
                    alt="Tattoo"
                />
                <div className="hover:cursor-pointer absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg bg-[#CCCCCC] flex flex-col justify-center items-center h-[33%] group-hover:h-[40%] duration-500">
                    <p className="hover:cursor-pointer font-bold">Ear Piercing</p>
                    <p className="hover:cursor-pointer">$15 Depoist</p>
                </div>
            </div>
            <div
                onClick={() => chooseService('piercing')}
                className="group hover:cursor-pointer relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group h-[320px] w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
                <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
                    src="/TattooSessionCover.jpg"
                    width={350}
                    height={400}
                    alt="Tattoo"
                />
                <div className="hover:cursor-pointer absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg bg-[#CCCCCC] flex flex-col justify-center items-center h-[33%] group-hover:h-[40%] duration-500">
                    <p className="hover:cursor-pointer font-bold">Tattoo Session</p>
                    <p className="hover:cursor-pointer">$25 Depoist</p>
                </div>
            </div>
            <div
                onClick={() => chooseService('piercing')}
                className="group hover:cursor-pointer relative flex flex-row Tablet:flex-col bg-[#CCCCCC] rounded-lg text-center Tablet:gap-4 text-xl Tablet:pb-4 group h-[320px] w-[80vw] Tablet:w-auto Tablet:max-w-[350px]">
                <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg group-hover:opacity-[30%] duration-500"
                    src="/ToothGemCover.jpg"
                    width={350}
                    height={400}
                    alt="Tattoo"
                />
                <div className="hover:cursor-pointer absolute bottom-0 left-0 w-full rounded-bl-lg rounded-br-lg bg-[#CCCCCC] flex flex-col justify-center items-center h-[33%] group-hover:h-[40%] duration-500">
                    <p className="hover:cursor-pointer font-bold">Tooth Gem</p>
                    <p className="hover:cursor-pointer">$15 Depoist</p>
                </div>
            </div>
        </div>
    )
}

