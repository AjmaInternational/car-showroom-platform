"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-effect py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            {/* LOGO ONLY - GRAPHICAL REPRESENTATION */}
            <div className="relative h-12 w-12 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full transition-transform duration-500 group-hover:rotate-12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F57C00" strokeWidth="2" strokeDasharray="10 5" />
                <path d="M30 30 L70 30 L75 50 L70 70 L30 70 Z" fill="#F57C00" />
                <path d="M40 40 L60 40 L62 50 L60 60 L40 60 Z" fill="#0B1E3B" />
                <rect x="20" y="48" width="60" height="4" fill="#E5E7EB" />
              </svg>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-brand-silver/80">
            <Link href="/" className="hover:text-brand-orange transition-colors duration-300">Home</Link>
            <Link href="/cars" className="hover:text-brand-orange transition-colors duration-300">Cars</Link>
            <Link href="/about" className="hover:text-brand-orange transition-colors duration-300">About</Link>
            <Link href="/contact" className="hover:text-brand-orange transition-colors duration-300">Contact</Link>
          </nav>

          <div className="flex items-center">
            <Link
              href="/cars"
              className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-bold transition-all duration-300 shadow-lg shadow-orange-500/10 uppercase text-[10px] tracking-[0.2em]"
            >
              Inventory
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
