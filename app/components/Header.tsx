"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        isScrolled ? "glass-effect py-4 shadow-2xl" : "bg-brand-navy/20 backdrop-blur-[2px] py-6 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            {/* LOGO */}
            <div className="relative h-12 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo.png" 
                alt="R.S Lanka Motors Logo" 
                className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to text if logo is missing
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-brand-orange font-black italic text-xl tracking-tighter">RS LANKA</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-brand-silver/80">
            <Link href="/" className="hover:text-brand-orange transition-colors duration-300">Home</Link>
            <Link href="/cars" className="hover:text-brand-orange transition-colors duration-300">Cars</Link>
            <Link href="/about" className="hover:text-brand-orange transition-colors duration-300">About</Link>
            <Link href="/contact" className="hover:text-brand-orange transition-colors duration-300">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/cars"
              className="hidden sm:block bg-brand-orange hover:bg-orange-600 text-white px-8 py-3 rounded-sm font-bold transition-all duration-300 shadow-lg shadow-orange-500/10 uppercase text-[10px] tracking-[0.2em]"
            >
              Inventory
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-brand-white p-2"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-brand-orange transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-full h-0.5 bg-brand-orange transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 bg-brand-orange transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-brand-navy z-[60] transition-transform duration-500 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-8 border-b border-brand-blue/30">
            <span className="text-brand-orange font-black italic tracking-tighter">RS LANKA</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-brand-white text-3xl">&times;</button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow space-y-12">
            {[
              { name: "Home", href: "/" },
              { name: "Showroom Collection", href: "/cars" },
              { name: "Our Vision", href: "/about" },
              { name: "Contact Us", href: "/contact" }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black text-brand-white hover:text-brand-orange transition-colors uppercase tracking-[0.2em]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-8">
            <Link
              href="/cars"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-brand-orange text-white text-center py-6 font-black uppercase tracking-[0.3em] text-xs"
            >
              Enter Showroom
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
