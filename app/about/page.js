import Image from 'next/image'

export default function About() {
    return (
        <main className="text-black">
            <div className="flex justify-evenly bg-greyB">
                <Image className="rounded-lg"
                    src="/About2.png"
                    width={300}
                    height={300}
                    alt="Tattoo"
                />
                <div className="flex flex-col justify-evenly items-center">
                    <p>Hours</p>
                    <p>We&apos;re open Saturday and Sunday 9 AM - 8 PM</p>
                    <p>Location</p>
                    <p>Located inside of the Lynden Beauty Lounge: 1905 Front St, Lynden, WA 98264, United States</p>
                    <p>Pricing</p>
                    <p>Tattoos start at $65, piercings start at $30 including jewelry, and tooth gems start at $25 per gem.</p>
                </div>
            </div>
            <div className="flex justify-evenly bg-slate-200">
                <p>Hours</p>
                <p>
                    The deposit will go towards the final price of your service, this is usually determined during the consultation.
                    Please ensure your contact information is correct as we will be reaching out to you to for your consultation.
                    We practice the highest standards of safety and sterility. We will ensure your utmost care in the shop and provide you with the best aftercare products and instructions, all to ensure the very best end result.
                    We strive to offer great work at an exceptional value. </p>
                <Image className="rounded-lg"
                    src="/About1.png"
                    width={300}
                    height={300}
                    alt="Tattoo"
                />
            </div>
        </main>

    )
}