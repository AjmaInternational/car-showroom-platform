"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CarCard from "./components/CarCard"

type Car = {
  id: string
  title: string
  brand: string
  model: string
  price: number
  year: number
  mileage: number
  color: string
  location: string
  image_urls: string[] | null
  status: string
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFeaturedCars = useCallback(async () => {
    const { data } = await supabaseBrowser
      .from("cars")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(6)

    setCars(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    void fetchFeaturedCars() // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchFeaturedCars])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[80vh] flex items-center overflow-hidden bg-brand-navy">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover grayscale"
              alt="Premium Cars UK"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
              <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                Excellence on Wheels
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-brand-silver leading-tight mb-6">
                Premium Cars <br /> <span className="text-brand-orange">Sale in the UK</span>
              </h1>
              <p className="text-brand-grey text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-medium">
                Trusted UK Car Dealer – Quality Used or Brand New Vehicles. Experience the ultimate in automotive luxury.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/cars"
                  className="bg-brand-orange hover:bg-orange-600 text-white px-10 py-4 rounded font-bold transition-all text-center uppercase tracking-widest shadow-xl shadow-orange-500/10"
                >
                  View Collection
                </Link>
                <Link
                  href="/contact"
                  className="bg-brand-blue/50 backdrop-blur-md border border-brand-silver/20 text-brand-silver hover:bg-brand-blue px-10 py-4 rounded font-bold transition-all text-center uppercase tracking-widest"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED CARS */}
        <section className="py-24 bg-brand-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-silver mb-2 tracking-tighter">Featured Inventory</h2>
                <div className="h-1 w-20 bg-brand-orange" />
              </div>
              <Link href="/cars" className="text-brand-orange font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">
                View All Inventory →
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-brand-blue h-96 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
                {cars.length === 0 && (
                  <p className="text-brand-grey py-20 text-center col-span-full italic">New arrivals coming soon. Check back shortly.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-brand-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-navy skew-x-[-20deg] translate-x-1/2 opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-silver mb-4 tracking-tighter">Why Choose R.S Lanka Motors</h2>
              <p className="text-brand-grey max-w-2xl mx-auto">Providing UK car buyers with transparency, quality, and exceptional service.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { title: "Quality Guaranteed", desc: "Every vehicle in our showroom undergoes a rigorous multi-point inspection." },
                { title: "Transparent Pricing", desc: "No hidden fees. We provide clear, market-competitive pricing on all UK cars." },
                { title: "Expert Support", desc: "Our experienced team is here to help you find the perfect car for your lifestyle." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-brand-navy/40 border border-brand-silver/5 hover:border-brand-orange/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-brand-silver mb-4">{item.title}</h3>
                  <p className="text-brand-grey text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
