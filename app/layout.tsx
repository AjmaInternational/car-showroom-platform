"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        // Only redirect if we're under /safranbrother and NOT on the login page
        const path = window.location.pathname
        if (path.startsWith("/safranbrother") && path !== "/safranbrother/login") {
            router.replace("/safranbrother/login")
        }
      }
    })
  }, [router])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
