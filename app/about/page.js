import Image from 'next/image'

export default function About() {
    return (
        <div className="text-black bg-pageGrey w-[100vw]">
            <div className="flex w-full">
                <div className='basis-[20%] p-4'>
                    <Image className="rounded w-full h-auto object-cover"
                        src="/About2.png"
                        width={300}
                        height={300}
                        alt="Tattoo"
                    />
                </div>
                <div className='basis-[60%] px-8 pt-4 flex justify-evenly'>
                    <div className="flex flex-col pt-4 flex-grow gap-4">
                        <div>
                            <p className='text-2xl'>Hours</p>
                            <p className='pl-4 text-lg'>Weekends only - Saturday and Sunday 9 am to 5 pm</p>
                        </div>
                        <div>
                            <p className='text-2xl'>Location</p>
                            <p className='pl-4 text-lg'>Located inside of the Lynden Beauty Lounge: 1905 Front St, Lynden, WA 98264, United States</p>
                        </div>
                        <div>
                            <p className='text-2xl'>Pricing</p>
                            <p className='pl-4 text-lg'>Exact pricing will be determined during your consulation, please use the following prices as a general guideline</p>
                            <p className='pl-7 text-md'> Tattoos -  $65 and up depending on the size</p>
                            <p className='pl-7 text-md'> Piercings - $30 (jewelry included)</p>
                            <p className='pl-7 text-md'> Tooth Gems - $25 per gem.</p>
                        </div>
                        <div>
                            <p className='text-2xl'>Deposits</p>
                            <p className='pl-4 text-lg'>
                                The deposit will go towards the final price of your service, this is usually determined during the consultation.
                                Please ensure your contact information is correct as we will be reaching out to you for your consultation.
                            </p>
                        </div>
                        <p className='text-2xl'>Here at 218 Tattoo we want to treat you to the best possible experience on your journey of body art.
                            Your safety is our highest priority and we pride ourselves on the high standards of precaution and sterility we take with every client.
                            We strive to offer great work at an exceptional value and we are committed to providing you with the best possible service including aftercare products and instructions.
                        </p>
                    </div>
                </div>
                <div className='basis-[20%]'></div>
            </div>
        </div>
    )
}
