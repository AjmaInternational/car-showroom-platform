"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase as supabaseBrowser } from "@/lib/supabase"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CarCard from "../components/CarCard"

interface Car {
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

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [filterBrand, setFilterBrand] = useState("")
  const [filterPrice, setFilterPrice] = useState("")
  const [filterYear, setFilterYear] = useState("")

  const fetchCars = useCallback(async () => {
    setLoading(true)
    let query = supabaseBrowser
      .from("cars")
      .select("*")
      .or('status.eq.available,status.is.null')
      .order("created_at", { ascending: false })

    if (filterBrand) {
      query = query.ilike("brand", `%${filterBrand}%`)
    }

    if (filterPrice) {
      query = query.lte("price", parseInt(filterPrice))
    }

    if (filterYear) {
      query = query.gte("year", parseInt(filterYear))
    }

    const { data, error } = await query
    if (error) {
      console.error("Supabase Error (Inventory):", error)
    }
    setCars(data || [])
    setLoading(false)
  }, [filterBrand, filterPrice, filterYear])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchCars()

    // Reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      })
    }, { threshold: 0.1 })

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [fetchCars])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-brand-navy pb-32">
        {/* HERO / HEADER */}
        <section className="relative pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/20 -skew-y-3 origin-right translate-y-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block animate-fade-up">Available Inventory</span>
            <h1 className="text-4xl md:text-7xl font-black text-brand-white mb-8 tracking-tighter leading-none animate-fade-up [animation-delay:200ms]">
              Showroom <span className="text-brand-orange italic">Collection</span>
            </h1>
            <p className="text-brand-silver/50 max-w-2xl text-lg leading-relaxed animate-fade-up [animation-delay:400ms]">
              Explore our meticulously curated collection of world-class vehicles. Every car in our showroom represents our commitment to automotive excellence.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="md:sticky md:top-[80px] z-40 glass-effect border-y border-brand-blue/50 py-8 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.3em] font-black">Search Brand</label>
                <input
                  type="text"
                  placeholder="e.g. BMW, Audi"
                  className="w-full bg-brand-navy/50 border border-brand-blue/50 rounded-sm px-4 py-3 text-xs text-brand-silver focus:border-brand-orange outline-none transition-all duration-500 placeholder:text-brand-silver/20"
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.3em] font-black">Maximum Price</label>
                <select
                  className="w-full bg-brand-navy/50 border border-brand-blue/50 rounded-sm px-4 py-3 text-xs text-brand-silver focus:border-brand-orange outline-none transition-all duration-500 appearance-none"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="20000">Up to £20,000</option>
                  <option value="40000">Up to £40,000</option>
                  <option value="60000">Up to £60,000</option>
                  <option value="100000">Up to £100,000</option>
                  <option value="200000">Up to £200,000</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.3em] font-black">Minimum Year</label>
                <select
                  className="w-full bg-brand-navy/50 border border-brand-blue/50 rounded-sm px-4 py-3 text-xs text-brand-silver focus:border-brand-orange outline-none transition-all duration-500 appearance-none"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">Any Year</option>
                  <option value="2024">2024 & Newer</option>
                  <option value="2022">2022 & Newer</option>
                  <option value="2020">2020 & Newer</option>
                  <option value="2018">2018 & Newer</option>
                </select>
              </div>

              <button
                onClick={() => { setFilterBrand(""); setFilterPrice(""); setFilterYear(""); }}
                className="bg-brand-blue/30 hover:bg-brand-blue/50 text-brand-silver text-[10px] uppercase tracking-[0.3em] font-bold py-3.5 px-6 rounded-sm transition-all duration-500 border border-brand-blue/50"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-brand-blue/20 h-[500px] animate-pulse rounded-sm" />
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-12 reveal">
                <p className="text-brand-silver/40 text-[10px] uppercase tracking-[0.2em]">Showing <span className="text-brand-silver font-bold">{cars.length}</span> Premium Vehicles</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {cars.map((car, idx) => (
                  <div key={car.id} className="reveal" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                    <CarCard car={car} />
                  </div>
                ))}
                {cars.length === 0 && (
                  <div className="col-span-full py-48 text-center reveal border border-dashed border-brand-blue/30 rounded-lg">
                    <p className="text-brand-silver/30 text-lg italic tracking-tighter">No vehicles currently match your refined criteria.</p>
                    <button
                      onClick={() => { setFilterBrand(""); setFilterPrice(""); setFilterYear(""); }}
                      className="mt-6 text-brand-orange text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                      View Full Showroom
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
