"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

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
    const { data, error } = await supabaseBrowser
      .from("cars")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setCars(data || [])
    }

    setLoading(false)
  }

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>

  if (error)
    return (
      <div style={{ padding: 40 }}>
        <h2>Error</h2>
        <pre>{error}</pre>
      </div>
    )

  return (
    <div style={{ padding: 40 }}>
      <h1>Car Showroom</h1>

      {cars.length === 0 && <p>No cars available</p>}

      {cars.map((car) => (
        <div
          key={car.id}
          style={{
            border: "1px solid #ccc",
            padding: 20,
            marginTop: 20,
          }}
        >
          {car.image_urls?.[0] && (
            <img src={car.image_urls[0]} width={300} />
          )}

          <h2>
            {car.brand} {car.model}
          </h2>

          <p>{car.title}</p>
          <p>£{car.price}</p>
          <p>
            {car.year} • {car.mileage} miles
          </p>
          <p>
            {car.color} • {car.location}
          </p>
        </div>
      ))}
    </div>
  )
}
