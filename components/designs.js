import axios from "axios"
import { useState, useEffect, useRef } from "react"

export default function Designs(props) {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    const [designs, setDesigns] = useState([])
    const hasFetched = useRef(false)

    let imageCounter = 0; //Prevents key errors if duplicates are found

    useEffect(() => {
        if (!hasFetched.current) {
            client.get(`/book/designs`, {
                headers: {
                    'Test-Header': 'test-value'
                }
            })
                .then(response => {
                    setDesigns(response.data)
                    console.log(response.data)
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
            hasFetched.current = true;
        }
    }, [])

    return (
        <div className="bg-greyB opacity-100 rounded-lg">
            <div className="absolute top-0 right-0 w-[50px] h-[50px] hover:scale-[1.25] duration-500" onClick={() => props.setDesignsWidget(false)}>
                <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[15px] rotate-45 bg-blackA rounded w-[5px] h-[30px]"></div>
                <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[15px] rotate-[-45deg] bg-blackA rounded w-[5px] h-[30px]"></div>
            </div>
            <div className="py-[30px] flex flex-wrap gap-6 items-center justify-center overflow-y-auto">
                {designs.map(design => {
                    imageCounter++
                    return (
                        <img className="rounded-lg hover:scale-[1.075] transition-all ease-in-out duration-500 cursor-pointer w-[25%] h-[25%]"
                            onClick={
                                () => {
                                    props.setDesign(design)
                                    props.setDesignsWidget(false)
                                }}
                            key={imageCounter}
                            src={design}
                            width={50}
                            height={50}
                            alt="Tattoo Design"
                        />
                    )
                })}
            </div>
        </div>
    )
}