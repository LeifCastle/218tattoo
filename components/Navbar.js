import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="w-full h-[20vh] Tablet:h-[12vh] bg-gray-500 flex justify-center items-center">
            <div className="grow flex justify-center Tablet:justify-start Tablet:pl-10">
                <h1>218 Tattoo</h1>
            </div>
            <div className="hidden Tablet:flex justify-center" >
                <Link className="px-5" href="/">Home</Link>
                <Link className="px-5" href="/tattoos">Tattoos</Link>
                <Link className="px-5" href="/book">Book</Link>
                <Link className="px-5" href="/about">About</Link>
                <Link className="px-5" href="/shop">Shop</Link>
            </div>
            <div className="grow flex justify-center Tablet:justify-end Tablet:pr-10">
                <div className="Tablet:hidden">hamburger</div>
                <div className="hidden Tablet:flex">social media</div>
            </div>
        </nav>
    )
}