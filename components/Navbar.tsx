"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      borderBottom: '1px solid #eee'
    }}>
      <Link href="/">
        <img
          src="/RS-LANKA-LOGO.png"
          alt="R.S Lanka Motors"
          style={{ height: '80px' }}
        />
      </Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
