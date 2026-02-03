"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  async function fetchCars() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .or('status.ilike.available,status.is.null')
        .order("created_at", { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setCars(data || [])
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#001f3f] text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-[#001f3f] to-[#003366]">
        <h1 className="text-5xl font-bold mb-4 text-[#ff851b]">Premium Car Collection</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore our curated selection of professional automotive presentations.
        </p>
      </section>

      {/* Car Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-8 border-b border-[#ff851b] pb-2 inline-block">
          Available Collection
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-[#003366] rounded-lg h-[400px]"></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 bg-red-900/20 border border-red-500 rounded-lg text-red-500">
            <h3 className="text-xl font-bold mb-2">Error loading cars</h3>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {cars.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">No cars currently available in the showroom.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                  <Link
                    key={car.id}
                    href={`/cars/${car.id}`}
                    className="group bg-[#003366] rounded-xl overflow-hidden border border-transparent hover:border-[#ff851b] transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-800">
                      {car.image_urls?.[0] ? (
                        <img
                          src={car.image_urls[0]}
                          alt={`${car.brand} ${car.model}`}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 italic">
                          No Image Available
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-[#ff851b] text-[#001f3f] font-bold px-3 py-1 rounded-full text-sm">
                        £{car.price?.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-sm text-[#ff851b] font-medium mb-1">{car.year} • {car.brand}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#ff851b] transition-colors">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-1">{car.title}</p>

                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
                        <div className="flex items-center">
                          <span className="mr-2">📍</span> {car.location}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">🛣️</span> {car.mileage?.toLocaleString()} miles
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
