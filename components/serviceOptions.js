
"use client"

import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation';

export default function ServiceOptions({ setService, setFormProgress }) {

    const router = useRouter()
    const currentPath = usePathname();

    function chooseService(service) {
        setService(service)
        setFormProgress(2)
        if (currentPath === process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000') {
            router.push('/book')
        }
    }


    return (
        <div className="relative text-black flex items-center justify-center gap-8 Tablet:gap-14 mt-5 Tablet:mt-10 flex flex-col Tablet:flex-row mx-5 Mobile-M:mx-10">
            <div
                onClick={() => chooseService('piercing')}
                className="group hover:cursor-pointer relative flex flex-row Tablet:flex-col rounded-lg text-center text-xl group ">
                    <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg Tablet:group-hover:opacity-[30%] Tablet:duration-500"
                        src="/EarPiercingCover.jpg"
                        width={350}
                        height={400}
                        alt="Tattoo"
                    />
                <div className="basis-1/2 z-[1] flex items-center justify-center hover:cursor-pointer w-full rounded-br-lg rounded-tr-lg Tablet:rounded-tr-none Tablet:rounded-bl-lg bg-white Tablet:mt-[-10%] Tablet:group-hover:mt-[-17%] Tablet:group-hover:pb-[7%] Tablet:duration-500">
                    <div className="hover:cursor-pointer flex flex-col justify-center items-center Tablet:py-6 px-2 text-base Mobile-M:text-xl">
                        <p className="hover:cursor-pointer font-bold">Ear Piercing</p>
                        <p className="hover:cursor-pointer">$15 Depoist</p>
                    </div>
                </div>
            </div>
            <div
                onClick={() => chooseService('tattoo')}
                className="Tablet:scale-[1.1] group hover:cursor-pointer relative flex flex-row Tablet:flex-col rounded-lg text-center text-xl group ">
                    <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg Tablet:group-hover:opacity-[30%] Tablet:duration-500"
                        src="/TattooSessionCover.jpg"
                        width={350}
                        height={400}
                        alt="Tattoo"
                    />
                <div className="basis-1/2 z-[1] flex items-center justify-center hover:cursor-pointer w-full rounded-br-lg rounded-tr-lg Tablet:rounded-tr-none Tablet:rounded-bl-lg bg-white Tablet:mt-[-10%] Tablet:group-hover:mt-[-17%] Tablet:group-hover:pb-[7%] Tablet:duration-500">
                    <div className="hover:cursor-pointer flex flex-col justify-center items-center Tablet:py-6 px-2 text-base Mobile-M:text-xl">
                        <p className="hover:cursor-pointer font-bold">Tattoo</p>
                        <p className="hover:cursor-pointer">$25 Depoist</p>
                    </div>
                </div>
            </div>
            <div
                onClick={() => chooseService('tooth')}
                className="group hover:cursor-pointer relative flex flex-row Tablet:flex-col rounded-lg text-center text-xl group ">
                    <Image className="basis-1/2 rounded-tl-lg rounded-bl-lg Tablet:rounded-bl-none Tablet:rounded-tr-lg Tablet:group-hover:opacity-[30%] Tablet:duration-500"
                        src="/ToothGemCover.jpg"
                        width={350}
                        height={400}
                        alt="Tattoo"
                    />
                <div className="basis-1/2 z-[1] flex items-center justify-center hover:cursor-pointer w-full rounded-br-lg rounded-tr-lg Tablet:rounded-tr-none Tablet:rounded-bl-lg bg-white Tablet:mt-[-10%] Tablet:group-hover:mt-[-17%] Tablet:group-hover:pb-[7%] Tablet:duration-500">
                    <div className="hover:cursor-pointer flex flex-col justify-center items-center Tablet:py-6 px-2 text-base Mobile-M:text-xl">
                        <p className="hover:cursor-pointer font-bold">Tooth Gem</p>
                        <p className="hover:cursor-pointer">$15 Depoist</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

