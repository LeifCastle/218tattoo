"use client"

import Link from "next/link"
import { useState, useEffect } from "react";

export default function Navbar() {

    // Determines if component is mounted (DOM is loaded) before using query selectors
    let DOMloaded = false
    useEffect(() => {
        DOMloaded = true;
    })

    // Sets page tab style concurrent to which page the user is on
    function setActivePage(page, e) {
        if (DOMloaded) {
            document.querySelectorAll('.navLink').forEach(navLink => {
                navLink.classList.remove("text-navLinkActiveSize")
                navLink.classList.remove("text-navLinkActiveColor")
                navLink.classList.add("text-navLinkInactiveSize")
                navLink.classList.add("text-navLinkInactiveColor")
            })
            document.querySelector(`#${page}`).classList.remove("text-navLinkInactiveSize")
            document.querySelector(`#${page}`).classList.remove("text-navLinkInactiveColor")
            document.querySelector(`#${page}`).classList.add("text-navLinkActiveSize");
            document.querySelector(`#${page}`).classList.add("text-navLinkActiveColor");
        }
    }

    return (
        <nav className="w-full h-[20vh] Tablet:h-[10vh] bg-gray-500 flex justify-center items-center">
            <div className="grow flex justify-center Tablet:justify-start Tablet:pl-10">
                <h1>218 Tattoo</h1>
            </div>
            <div className="hidden Tablet:flex justify-center text-[1.25rem] font-heading">
                <Link id="home" className="navLink px-5 text-navLinkActiveSize text-navLinkActiveColor" href="/" onClick={() => setActivePage("home")}>Home</Link>
                <Link id="tattoos" className="navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor" href="/tattoos" onClick={() => setActivePage("tattoos")}>Tattoos</Link>
                <Link id="book" className="navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor" href="/book" onClick={() => setActivePage("book")}>Book</Link>
                <Link id="about" className="navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor" href="/about" onClick={() => setActivePage("about")}>About</Link>
                <Link id="shop" className="navLink px-5 text-navLinkInactiveSize text-navLinkInactiveColor" href="/shop" onClick={() => setActivePage("shop")}>Shop</Link>
            </div>
            <div className="grow flex justify-center Tablet:justify-end Tablet:pr-10">
                <div className="Tablet:hidden">hamburger</div>
                <div className="hidden Tablet:flex">social media</div>
            </div>
        </nav>
    )
}