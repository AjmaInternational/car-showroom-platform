"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(pathname !== "/safranbrother/login")

  useEffect(() => {
    if (pathname === "/safranbrother/login") {
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/safranbrother/login")
      } else {
        setLoading(false)
      }
    })
  }, [router, pathname])

  if (loading && pathname !== "/safranbrother/login") {
    return <div className="p-20 text-center font-bold">Verifying Session...</div>
  }

  return <>{children}</>
}
