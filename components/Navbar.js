"use client"

import Link from "next/link"
import { useRef, useEffect, useCallback } from "react";
import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function Navbar() {

    let vart
    let DOMloaded = false; // Determines if component is mounted (DOM is loaded) before using query selectors

    let pathname = usePathname()
    const handleScroll = useCallback(() => {
        window.scrollY > 0 ? document.querySelector('#Navbar').setAttribute('data-navbartheme', 'scrolled') : document.querySelector('#Navbar').setAttribute('data-navbartheme', 'default');
    }, [])

    useEffect(() => {
        DOMloaded = true;
        let page = "home"
        pathname === '/' ? page = ['/', 'h', 'o', 'm', 'e'] : page = pathname.split('')
        page.shift()
        setActivePage(page.join(''))

        if (pathname === '/') {
            document.querySelector('#Navbar').setAttribute('data-navbartheme', 'default')
            window.addEventListener('scroll', handleScroll);
        }
        else if(pathname !== '/admin'){
            window.removeEventListener('scroll', handleScroll);
            document.querySelector('#Navbar').setAttribute('data-navbartheme', 'scrolled')
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

    return (<>
        <nav id='Navbar' data-navbartheme={vart} className="z-[2] w-full h-[20vh] Tablet:min-h-[60px] Tablet:h-[10vh] bg-NavbarBackground sticky top-0 flex justify-center items-center text-black font-[425] transition-all duration-[400ms] ease-in-out">
            <div className="grow flex justify-center Tablet:justify-start Tablet:pl-10">
                <h1>218 Tattoo</h1>
            </div>
            <div className="hidden Tablet:flex font-heading text-center items-center justify-center underline-offset-[8px] decoration-navLinkHoverColor">
                <Link id="home" className="grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkActiveSize text-navLinkActiveColor" href="/" onClick={() => setActivePage("home")}>Home</Link>
                <Link id="tattoos" className="grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor hover:text-navLinkHoverColor" href="/tattoos" onClick={() => setActivePage("tattoos")}>Tattoos</Link>
                <Link id="book" className="grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor hover:text-navLinkHoverColor" href="/book" onClick={() => setActivePage("book")}>Book</Link>
                <Link id="about" className="grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor hover:text-navLinkHoverColor" href="/about" onClick={() => setActivePage("about")}>About</Link>
                <Link id="shop" className="grow-1 basis-0 overflow-hidden min-w-[105px] px-[1px] navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor hover:text-navLinkHoverColor" href="/shop" onClick={() => setActivePage("shop")}>Shop</Link>
            </div>
            <div className="grow flex justify-center Tablet:justify-end Tablet:pr-10">
                <div className="Tablet:hidden">hamburger</div>
                <div className="hidden Tablet:flex">social media</div>
            </div>
        </nav>
        <Script
            id="show-banner"
            dangerouslySetInnerHTML={{
                __html: `  
                let vart;
                let pathname = window.location.pathname;
                pathname === '/' ? vart = "default" : vart = "scrolled"
                console.log(vart)
                `
            }}
        />
    </>
    )
}