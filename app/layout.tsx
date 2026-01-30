"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import "./globals.css"

export default function SafranLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/safranbrother/login")
      }
    })
  }, [router])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
