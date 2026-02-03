"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace("/safranbrother/login")
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#001f3f',
        color: 'white'
      }}>
        <p>Checking authentication...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>
      <header style={{ padding: '20px', background: '#001f3f', color: 'white' }}>
        <h2>Admin Portal</h2>
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  )
}
