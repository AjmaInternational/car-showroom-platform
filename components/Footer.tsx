"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#001f3f] border-t border-[#ff851b]/20 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/">
            <img
              src="/RS-LANKA-LOGO.png"
              alt="R.S Lanka Motors"
              className="h-16 md:h-20 w-auto mb-6"
            />
          </Link>
          <p className="text-gray-400 max-w-sm">
            R.S Lanka Motors provides a curated collection of premium pre-owned vehicles.
            Experience excellence in every drive.
          </p>
        </div>

        <div>
          <h3 className="text-[#ff851b] font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Showroom</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/safranbrother" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#ff851b] font-bold text-lg mb-6">Contact Info</h3>
          <ul className="space-y-4 text-gray-400">
            <li>Kingston, London</li>
            <li>+44 7385 934662</li>
            <li>info@rslankamotors.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} R.S Lanka Motors. All rights reserved.</p>
      </div>
    </footer>
  )
}
