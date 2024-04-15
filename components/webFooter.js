"use client"

import { usePathname } from 'next/navigation'

export default function WebFooter() {
    const pathname = usePathname()

    if (pathname != "/admin") {
        return (
            <div className="bg-blackA flex flex-col items-center justify-center py-10 px-7 gap-10">
                <div className="flex gap-7 Tablet:gap-20 text-center">
                    <div className="flex-col">
                        <p className="text-2xl pb-2">Location</p>
                        <p className="text-md">Located inside of the Lynden Beauty Lounge <br></br> 1905 Front St, Lynden, WA</p>
                        <p className="pt-2">Get Directions</p>
                    </div>
                    <div className="flex-col">
                        <p className="text-2xl pb-2">Hours</p>
                        <p className="pb-2 text-md">Saturday 8am - 6pm</p>
                        <p>Sunday 10am - 5pm</p>
                    </div>
                </div>
                <p>© 218 Tattoo Co. By Bailey Mae</p>
            </div>
        );
    }
}