"use client"

import { useEffect, useState, use } from "react"
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
  fuel: string
  transmission: string
  condition: string
  color: string
  location: string
  description: string
  features: string[] | null
  extra_features: string | null
  image_urls: string[] | null
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        setCar(data)
        if (data.image_urls?.[0]) {
          setActiveImage(data.image_urls[0])
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001f3f] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ff851b]"></div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-[#001f3f] text-white p-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Car Not Found</h1>
        <p className="text-gray-400 mb-8">{error || "The car you are looking for does not exist or has been sold."}</p>
        <Link href="/" className="bg-[#ff851b] text-[#001f3f] px-6 py-2 rounded font-bold">
          Back to Showroom
        </Link>
      </div>
    )
  }

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} (£${car.price?.toLocaleString()}). Is it still available?`)
  const whatsappUrl = `https://wa.me/447385934662?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-[#001f3f] text-white pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link href="/" className="text-[#ff851b] hover:underline mb-6 inline-block">
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
          <div>
            <div className="aspect-video bg-[#003366] rounded-xl overflow-hidden mb-4 border border-[#003366]">
              {activeImage ? (
                <img src={activeImage} alt={car.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 italic">No Image</div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {car.image_urls?.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(url)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === url ? 'border-[#ff851b]' : 'border-transparent hover:border-gray-500'}`}
                >
                  <img src={url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="text-[#ff851b] font-bold text-lg mb-1">{car.year} • {car.condition?.toUpperCase() ?? 'PRE-OWNED'}</div>
              <h1 className="text-4xl font-extrabold mb-2">{car.brand} {car.model}</h1>
              <p className="text-2xl font-bold text-[#ff851b]">£{car.price?.toLocaleString() ?? 'Price on Application'}</p>
              <p className="text-gray-400 mt-2">{car.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-[#003366] mb-8">
              {[
                ["Mileage", `${car.mileage?.toLocaleString() ?? 0} miles`],
                ["Transmission", car.transmission ?? "Automatic"],
                ["Fuel Type", car.fuel ?? "Petrol"],
                ["Color", car.color ?? "Standard"],
                ["Location", car.location ?? "London"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-gray-400 text-sm">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-center py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Enquire Now via WhatsApp
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border-2 border-[#ff851b] text-[#ff851b] hover:bg-[#ff851b] hover:text-[#001f3f] text-center py-4 rounded-xl font-bold text-lg transition-all"
              >
                Book a Viewing
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b border-[#ff851b] pb-2 inline-block">Description</h2>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {car.description || "No description provided for this vehicle."}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-[#ff851b] pb-2 inline-block">Key Features</h2>
            <ul className="grid grid-cols-1 gap-2 mt-2">
              {car.features && car.features.length > 0 ? (
                car.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#ff851b] mr-2">✓</span>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No specific features listed.</li>
              )}
              {car.extra_features && (
                <li className="mt-4 pt-4 border-t border-[#003366] text-sm text-gray-400">
                  <div className="font-bold text-white mb-1">Additional:</div>
                  {car.extra_features}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
