"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react";
import { usePathname } from 'next/navigation'

export default function Navbar() {

    //--State Variables
    const [scrolled, setScrolled] = useState()
    const [mobileNav, setMobileNav] = useState(false)

    //--Page Links
    let links = [{ name: "Home", href: '/' }, { name: "Book", href: '/book' }, { name: "About", href: '/about' }, { name: "Shop", href: '/shop' }]

    //--CSS Variables
    let activeNavLinkDefault = "underline text-navLinkActiveSize text-navLinkActiveColorDefault hover:text-navLinkHoverColorDefault pb-[3px]"
    let inactiveNavLinkDefault = "text-navLinkInactiveSize text-navLinkInactiveColorDefault hover:text-navLinkHoverColorDefault"
    let activeNavLinkContrast = "underline text-navLinkActiveSize text-navLinkActiveColorContrast hover:text-navLinkHoverColorContrast pb-[3px]"
    let inactiveNavLinkContrast = "text-navLinkInactiveSize text-navLinkInactiveColorContrast hover:text-navLinkHoverColorContrast"

    let DOMloaded = false;
    let pathname = usePathname()

    const handleScroll = useCallback(() => {
        window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    }, [])

    useEffect(() => {
        DOMloaded = true;
        if (pathname === '/') {
            setScrolled(false)
            window.addEventListener('scroll', handleScroll);
        }
        else if (pathname !== '/admin') {
            window.removeEventListener('scroll', handleScroll);
            setScrolled(true)
        }
        setMobileNav(false);
    }, [pathname]);

    if (pathname !== '/admin') {
        return (<>
            <nav id='Navbar' className={`${scrolled || pathname !== '/' || mobileNav ? "bg-NavbarBackground" : "transparent"} z-[2] w-full min-h-[92px] sticky top-0 flex justify-center items-center text-black font-[425] transition-all duration-[400ms] ease-in-out`}>
                <div className={`flex w-full ${mobileNav ? 'flex-col' : ''}`}>
                    <div className="flex grow justify-center items-center Tablet:grow-0 Tablet:justify-start Tablet:pl-10 min-h-[92px]">
                        <Link href="/"><h1 className={`${scrolled || mobileNav || pathname !== '/' ? "text-black" : "text-white"} text-3xl`}>218 Tattoo</h1></Link>
                    </div>
                    <div className={`${mobileNav ? 'w-full h-[2px] bg-blackA' : 'hidden'}`}></div>
                    <div className={`justify-center items-center grow ${mobileNav ? "flex flex-col" : "hidden Tablet:flex font-heading text-center items-center justify-center underline-offset-[8px] decoration-navLinkHoverColor"}`}>
                        {links.map(link => {
                            return (
                                <Link key={link} className={`${(scrolled || mobileNav) ? pathname === link.href ? activeNavLinkContrast : inactiveNavLinkContrast : pathname === link.href ? activeNavLinkDefault : inactiveNavLinkDefault} 
                            grow-1 basis-0 min-w-[105px] px-[1px] navLink px-5 text-navLinkActiveSize`} href={link.href}>{link.name}</Link>
                            )
                        })}
                    </div>
                </div>
                    <div className="h-[92px] self-start flex justify-center items-center pr-10 Tablet:justify-end Tablet:pr-10">
                        <div className="Tablet:hidden " onClick={() => setMobileNav(!mobileNav)}>
                            <div className={`${mobileNav ? "rotate-[-45deg] translate-y-[2.5px]" : ""} w-[30px] h-[5px] rounded-full ${scrolled || mobileNav ? 'bg-blackA' : 'bg-white'} transition-translate duration-[400ms] ease-in-out`}></div>
                            <div className={`${mobileNav ? "hidden" : "w-[30px] h-[5px] rounded-full my-1"} ${scrolled || mobileNav? 'bg-blackA' : 'bg-white'}`}></div>
                            <div className={`${mobileNav ? "rotate-[45deg] translate-y-[-2.5px]" : ""} w-[30px] h-[5px] rounded-full  ${scrolled || mobileNav ? 'bg-blackA' : 'bg-white'} transition-translate duration-[400ms] ease-in-out`}></div>
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