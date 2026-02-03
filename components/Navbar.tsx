"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-[#001f3f] border-b border-[#ff851b]/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
      <Link href="/" className="flex items-center">
        <img
          src="/RS-LANKA-LOGO.png"
          alt="R.S Lanka Motors"
          className="h-16 md:h-20 w-auto"
        />
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-white hover:text-[#ff851b] font-medium transition-colors">
          Home
        </Link>
        <Link href="/" className="text-white hover:text-[#ff851b] font-medium transition-colors">
          Collection
        </Link>
        <Link href="/contact" className="text-white hover:text-[#ff851b] font-medium transition-colors">
          Contact
        </Link>
        <Link
          href="/contact"
          className="bg-[#ff851b] text-[#001f3f] px-6 py-2 rounded-lg font-bold hover:bg-[#e67616] transition-colors"
        >
          Book Now
        </Link>
      </div>

      <div className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </nav>
  )
}
