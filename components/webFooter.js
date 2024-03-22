"use client"

import { usePathname } from 'next/navigation'

export default function WebFooter() {
    const pathname = usePathname()

    if (pathname != "/admin") {
        return (
            <div className="bg-blackA flex flex-col items-center justify-center py-10 gap-10">
                <div className="flex gap-20">
                    <div className="flex-col">
                        <p className="text-2xl text-center pb-2">Location</p>
                        <p>Located inside of the Lynden Beauty Lounge</p>
                        <p>1905 Front St, Lynden, WA 98264, United States</p>
                        <p>Get Directions</p>
                    </div>
                    <div className="flex-col">
                        <p className="text-2xl text-center pb-2">Hours</p>
                        <p>Saturday 8am - 6pm</p>
                        <p>Sunday 10am - 5pm</p>
                    </div>
                </div>
                <p>© 218 Tattoo Co. By Bailey Mae</p>
            </div>
        );
    }
}