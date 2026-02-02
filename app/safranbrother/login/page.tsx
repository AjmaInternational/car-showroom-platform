"use client"

import { useState } from "react"
import { supabase as supabaseBrowser } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // HARD reload — required
    window.location.replace("/safranbrother")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-blue/10 -skew-y-12 origin-top-right translate-y-[-50%]" />

      <div className="max-w-md w-full space-y-12 p-12 glass-effect border border-brand-blue/30 rounded-sm relative z-10">
        <div className="text-center">
          <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Internal Access</span>
          <h2 className="text-4xl font-black text-brand-white tracking-tighter italic">
            Showroom <span className="text-brand-orange">Portal</span>
          </h2>
          <p className="mt-4 text-brand-silver/40 text-xs uppercase tracking-widest">
            Enter your credentials to manage collection
          </p>
        </div>

        <form className="mt-12 space-y-8" onSubmit={login}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-[0.3em] font-black text-brand-silver/30 ml-1">Email Identifier</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full bg-brand-navy/50 border border-brand-blue/50 rounded-sm px-4 py-4 text-sm text-brand-silver focus:border-brand-orange outline-none transition-all duration-500 placeholder:text-brand-silver/10"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-[0.3em] font-black text-brand-silver/30 ml-1">Security Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-brand-navy/50 border border-brand-blue/50 rounded-sm px-4 py-4 text-sm text-brand-silver focus:border-brand-orange outline-none transition-all duration-500 placeholder:text-brand-silver/10"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-orange-600 text-white py-5 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 shadow-xl shadow-orange-500/10 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Authorize Entry"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
              <p className="text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}
        </form>

        <div className="pt-8 border-t border-brand-blue/20 text-center">
           <p className="text-[8px] text-brand-silver/20 uppercase tracking-[0.2em]">R.S Lanka Motors Showroom Management System</p>
        </div>
      </div>
    </div>
  )
}
