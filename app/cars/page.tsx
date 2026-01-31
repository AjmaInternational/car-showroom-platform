"use client"

import { useEffect, useState, useCallback } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CarCard from "../components/CarCard"

export default function CarsPage() {
  const [cars, setCars] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true)
  const [filterBrand, setFilterBrand] = useState("")
  const [filterPrice, setFilterPrice] = useState("")

  const fetchCars = useCallback(async () => {
    setLoading(true)
    let query = supabaseBrowser
      .from("cars")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false })

    if (filterBrand) {
      query = query.ilike("brand", `%${filterBrand}%`)
    }

    if (filterPrice) {
      query = query.lte("price", parseInt(filterPrice))
    }

    const { data } = await query
    setCars(data || [])
    setLoading(false)
  }, [filterBrand, filterPrice])

  useEffect(() => {
    void fetchCars() // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchCars])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-brand-navy pb-24">
        <section className="bg-brand-blue py-16 border-b border-brand-navy/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-silver mb-4 tracking-tighter">
              Used Cars for Sale in the <span className="text-brand-orange">UK</span>
            </h1>
            <p className="text-brand-grey max-w-2xl">
              Browse our exclusive collection of quality used and brand new vehicles. Trusted car dealer UK.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="sticky top-20 z-40 bg-brand-navy/80 backdrop-blur-xl border-b border-brand-blue py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              <input
                type="text"
                placeholder="Search Brand (e.g. BMW)"
                className="bg-brand-blue border border-brand-silver/10 rounded px-4 py-2 text-sm text-brand-silver focus:border-brand-orange outline-none transition-all w-full md:w-64"
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
              />
              <select
                className="bg-brand-blue border border-brand-silver/10 rounded px-4 py-2 text-sm text-brand-silver focus:border-brand-orange outline-none transition-all w-full md:w-48"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
              >
                <option value="">Max Price (Any)</option>
                <option value="10000">Up to £10,000</option>
                <option value="20000">Up to £20,000</option>
                <option value="30000">Up to £30,000</option>
                <option value="50000">Up to £50,000</option>
                <option value="100000">Up to £100,000</option>
              </select>

              <button
                onClick={() => { setFilterBrand(""); setFilterPrice(""); }}
                className="text-brand-grey text-xs hover:text-brand-orange uppercase tracking-widest font-bold ml-auto"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-brand-blue h-96 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
              {cars.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <p className="text-brand-grey text-lg italic">No cars found matching your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
