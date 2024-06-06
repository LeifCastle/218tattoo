import axios from "axios"
import moment from 'moment';
import { useState, useEffect, useRef } from "react"

export default function Designs(props) {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    const [designs, setDesigns] = useState([])
    const designRef = useRef([])
    const [query, setQuery] = useState('')

    let imageCounter = 0; //Prevents key errors if duplicates are found
    //localStorage.clear()
    useEffect(() => {
        let folder = props.designType
        if ((localStorage.getItem(folder) === null) || (parseInt(JSON.parse(localStorage.getItem(folder)).created) < parseInt(moment().format('HHMMDDYY')))) {
            console.log('Creating Folder: ', folder)
            client.get(`/book/designs/${folder}`, {
                headers: {
                    'Test-Header': 'test-value'
                }
            })
                .then(response => {
                    setDesigns(response.data)
                    designRef.current = designs
                    localStorage.setItem(folder, JSON.stringify({ data: response.data, created: moment().format('HHMMDDYY') }))
                    console.log('Created: ', JSON.parse(localStorage.getItem(folder)))
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        } else {
            console.log('Accessing: ', folder)
            console.log('Found: ', JSON.parse(localStorage.getItem(folder)))
            setDesigns(JSON.parse(localStorage.getItem(folder)).data)
            designRef.current = designs
        }
    }, [props.visibility, props.designType])

    function updateQuery(e) {
        let newQuery = e.target.value
        setQuery(newQuery)
        if (newQuery !== '') {
            let matchingDesigns = designRef.current.filter(design => {
                return design.tags.some(tag => {
                    let partialTag = tag.slice(0, newQuery.length)
                    return partialTag.toLowerCase() === newQuery.toLowerCase()
                })
            })
            setDesigns(matchingDesigns)
        } else {
            setDesigns(designRef.current);
        }
    }

    useEffect(() => {
        if(!props.visibility){
            setQuery('')
        }
    }, [props.visibility])


    return (
        <>
            <div className={`${props.visibility === true ? 'block' : 'hidden'} fixed top-0 left-0 opacity-[40%] w-[100vw] h-[100vh] bg-black`} onClick={() => {props.setVisibility(false)}}></div>
            <div className={`${props.visibility === true ? 'block' : 'hidden'} bg-greyB z-2 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] Tablet:w-[60vw] h-[75vh] Tablet:h-[75vh] overflow-y-scroll rounded-lg`}>
                <div className="flex items-center bg-white h-[60px] top-[-1px] sticky z-[4]">
                    <div className="flex Tablet:basis-1/3"></div>
                    <div className="flex justify-center basis-1/3 pl-3 Tablet:pl-5">
                        <p className="pr-3 Tablet:pr-5 text-lg Tablet:text-xl pt-1 text-black">Search:</p>
                        <input placeholder="eagle" value={query} onChange={(e) => updateQuery(e)} className="Mobile-S:max-w-[125px] Mobile-M:max-w-[175px] Mobile-L:max-w-fit text-lg Tablet:text-xl pl-1 pt-1 text-black bg-inputBorder border-gray-400 border-b-2 focus:border-inputBorder focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg"></input>
                    </div>
                    <div className="flex basis-1/3 overflow-x-clip">
                        <div className="grow"></div>
                        <div className="w-[50px] h-[60px] hover:scale-[1.25] duration-500" onClick={() => props.setVisibility(false)}>
                            <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[17px] rotate-45 bg-blackA rounded w-[5px] h-[30px]"></div>
                            <div className="absolute top-0 right-0 translate-x-[-30px] translate-y-[17px] rotate-[-45deg] bg-blackA rounded w-[5px] h-[30px]"></div>
                        </div>
                    </div>
                </div>
                <div className="pt-[55px] flex flex-wrap gap-6 items-center justify-center">
                    {designs.map(design => {
                        imageCounter++
                        return (
                            <img className="rounded-lg hover:scale-[1.075] transition-all ease-in-out duration-500 cursor-pointer w-[42%] Tablet:w-[30%] h-[25%]"
                                onClick={
                                    () => {
                                        props.setDesign(design.url)
                                        props.setVisibility(false)
                                    }}
                                key={imageCounter}
                                src={design.url}
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