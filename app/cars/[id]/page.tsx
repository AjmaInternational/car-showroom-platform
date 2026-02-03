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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>

  if (error || !car) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Car Not Found</h1>
        <Link href="/">Back to Showroom</Link>
      </div>
    )
  }

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${car.brand} ${car.model}.`)
  const whatsappUrl = `https://wa.me/447385934662?text=${whatsappMessage}`

  return (
    <div style={{ padding: 40 }}>
      <Link href="/">← Back</Link>

      <h1>{car.brand} {car.model}</h1>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>£{car.price?.toLocaleString()}</p>

      {car.image_urls?.map((url, i) => (
        <img key={i} src={url} width={400} style={{ display: 'block', marginTop: 20 }} alt="" />
      ))}

      <div style={{ marginTop: 20 }}>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Mileage:</strong> {car.mileage?.toLocaleString()} miles</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Fuel:</strong> {car.fuel}</p>
        <p><strong>Location:</strong> {car.location}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Description</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{car.description}</p>
      </div>

      {car.features && car.features.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Features</h3>
          <ul>
            {car.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <a
          href={whatsappUrl}
          style={{
            background: '#25D366',
            color: 'white',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginRight: '10px'
          }}
        >
          Enquire via WhatsApp
        </a>
        <a
          href={whatsappUrl}
          style={{
            border: '2px solid #000',
            color: '#000',
            padding: '13px 30px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          Book Now
        </a>
      </div>
    </div>
  )
}
