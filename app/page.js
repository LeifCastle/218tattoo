import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="h-10vh md:h-20vh bg-transparent">
        <Link href="/">Home</Link>
        <Link href="/tattoos">Tattoos</Link>
        <Link href="/book">Book</Link>
        <Link href="/about">About</Link>
        <Link href="/shop">Shop</Link>
      </nav>
    </main>
  );
}
