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
            client.get(`/book/designs/${props.designType}`, {
                headers: {
                    'Test-Header': 'test-value'
                }
            })
                .then(response => {
                    setDesigns(response.data)
                    //console.log(response.data)
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
            hasFetched.current = true;
        }
    }, [])

    return (
        <>
            <div className={`${props.visibility === true ? 'block' : 'hidden'} fixed top-0 left-0 opacity-[40%] w-[100vw] h-[100vh] bg-black`} onClick={() => props.setVisibility(false)}></div>
            <div className={`${props.visibility === true ? 'block' : 'hidden'} bg-greyB z-2 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40vw] h-[60vh] overflow-y-scroll rounded-lg`}>
                <div className="absolute top-0 right-0 w-[50px] h-[50px] hover:scale-[1.25] duration-500" onClick={() => props.setVisibility(false)}>
                    <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[15px] rotate-45 bg-blackA rounded w-[5px] h-[30px]"></div>
                    <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[15px] rotate-[-45deg] bg-blackA rounded w-[5px] h-[30px]"></div>
                </div>
                <div className="py-[30px] flex flex-wrap gap-6 items-center justify-center">
                    {designs.map(design => {
                        imageCounter++
                        return (
                            <img className="rounded-lg hover:scale-[1.075] transition-all ease-in-out duration-500 cursor-pointer w-[25%] h-[25%]"
                                onClick={
                                    () => {
                                        props.setDesign(design)
                                        props.setVisibility(false)
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
        </>
    )
}