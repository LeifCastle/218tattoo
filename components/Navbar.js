"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react";
import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function Navbar() {
    const [scrolled, setScrolled] = useState()

    //--CSS Variables
    let navLinkDefault = "grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkActiveSize text-navLinkActiveColor"

    let DOMloaded = false; // Determines if component is mounted (DOM is loaded) before using query selectors
    let pathname = usePathname()

    const handleScroll = useCallback(() => {
        window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    }, [])

    useEffect(() => { //Eliminate this clunkiness
        DOMloaded = true;
        let page = "home"
        pathname === '/' ? page = ['/', 'h', 'o', 'm', 'e'] : page = pathname.split('')
        page.shift()
        setActivePage(page.join(''))
        if (pathname === '/') {
            setScrolled(false)
            document.querySelector('#Navbar').setAttribute('data-navbartheme', 'default') //remove and use scrolled state to apply these styles
            window.addEventListener('scroll', handleScroll);
        }
        else if (pathname !== '/admin') {
            window.removeEventListener('scroll', handleScroll);
            document.querySelector('#Navbar').setAttribute('data-navbartheme', "true")
            setScrolled(true)
        }
    }, [pathname]);

    // Sets page tab style concurrent to which page the user is on
    function setActivePage(page) {
        if (DOMloaded && pathname !== "/admin") {
            document.querySelectorAll('.navLink').forEach(navLink => {
                navLink.classList.remove("underline");
                navLink.classList.remove("text-navLinkActiveSize")
                navLink.classList.remove("text-navLinkActiveColor")
                navLink.classList.add("text-navLinkInactiveSize")
                navLink.classList.add("text-navLinkInactiveColor")
                navLink.classList.add("hover:text-navLinkHoverColor")
                navLink.classList.remove("pb-[3px]");
            })
            document.querySelector(`#${page}`).classList.remove("hover:text-navLinkHoverColor")
            document.querySelector(`#${page}`).classList.remove("text-navLinkInactiveSize")
            document.querySelector(`#${page}`).classList.remove("text-navLinkInactiveColor")
            document.querySelector(`#${page}`).classList.add("text-navLinkActiveSize");
            document.querySelector(`#${page}`).classList.add("text-navLinkActiveColor");
            document.querySelector(`#${page}`).classList.add("underline");
            document.querySelector(`#${page}`).classList.add("pb-[3px]");
        }
    }

    if (pathname !== '/admin') {
        return (<>
            <nav id='Navbar' data-navbartheme={scrolled} className={`${scrolled || pathname !== '/' ? "bg-NavbarBackground" : "transparent"} z-[2] w-full min-h-[92px] sticky top-0 flex justify-center items-center text-black font-[425] transition-all duration-[400ms] ease-in-out`}>
                <div className="grow flex justify-center Tablet:justify-start Tablet:pl-10">
                    <Link href="/"><h1 className={`${scrolled || pathname !== '/' ? "text-black" : "text-white"} text-3xl`}>218 Tattoo</h1></Link>
                </div>
                <div className="hidden Tablet:flex font-heading text-center items-center justify-center underline-offset-[8px] decoration-navLinkHoverColor">
                    <Link id="home" className={navLinkDefault} href="/" onClick={() => setActivePage("home")}>Home</Link>
                    <Link id="tattoos" className={`${navLinkDefault} hover:text-navLinkHoverColor`} href="/tattoos" onClick={() => setActivePage("tattoos")}>Tattoos</Link>
                    <Link id="book" className={`${navLinkDefault} hover:text-navLinkHoverColor`} href="/book" onClick={() => setActivePage("book")}>Book</Link>
                    <Link id="about" className={`${navLinkDefault} hover:text-navLinkHoverColor`} href="/about" onClick={() => setActivePage("about")}>About</Link>
                    <Link id="shop" className={`${navLinkDefault} hover:text-navLinkHoverColor`} href="/shop" onClick={() => setActivePage("shop")}>Shop</Link>
                </div>
                <div className="grow flex justify-center Tablet:justify-end Tablet:pr-10">
                    <div className="Tablet:hidden">
                        <div className="w-[30px] h-[5px] rounded-full bg-white"></div>
                        <div className="w-[30px] h-[5px] rounded-full bg-white my-1"></div>
                        <div className="w-[30px] h-[5px] rounded-full bg-white"></div>
                    </div>
                    <div className="hidden Tablet:flex items-center justify-center gap-5 Tablet:mr-10">
                        <Link href="https://www.facebook.com/two.eighteen.tattoo.company" legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className={`${scrolled || pathname !== '/' ? "" : "hidden"} hover:scale-[115%] duration-300 ease-in-out`}>
                                <Image
                                    src="/blackFacebookIcon.png"
                                    width={37}
                                    height={37}
                                    alt="Facebook"
                                />
                            </a>
                        </Link>
                        <Link href="https://www.instagram.com/218_tattoo/" legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className={`${scrolled || pathname !== '/' ? "" : "hidden"} hover:scale-[115%] duration-300 ease-in-out`}>
                                <Image
                                    src="/blackInstagramIcon.png"
                                    width={37}
                                    height={37}
                                    alt="Instagram"
                                />
                            </a>
                        </Link>
                        <Link href="https://www.facebook.com/two.eighteen.tattoo.company" legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className={`${scrolled || pathname !== '/' ? "hidden" : ""} hover:scale-[115%] duration-300 ease-in-out`}>
                                <Image
                                    src="/whiteFacebookIcon.png"
                                    width={37}
                                    height={37}
                                    alt="Facebook"
                                />
                            </a>
                        </Link>
                        <Link href="https://www.instagram.com/218_tattoo/" legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className={`${scrolled || pathname !== '/' ? "hidden" : ""} hover:scale-[115%] duration-300 ease-in-out`}>
                                <Image
                                    src="/whiteInstagramIcon.png"
                                    width={37}
                                    height={37}
                                    alt="Instagram"
                                />
                            </a>
                        </Link>
                    </div>
                </div >
            </nav >
        </>
        )
    }
}