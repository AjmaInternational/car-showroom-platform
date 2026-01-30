"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function EditCarPage() {
  const router = useRouter()
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    transmission: "",
    color: "",
    price: "",
    location: "",
  })

  function update(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  useEffect(() => {
    async function loadCar() {
      const { data } = await supabaseBrowser
        .from("cars")
        .select("*")
        .eq("id", id)
        .single()

      if (!data) return

      setForm({
        title: data.title ?? "",
        brand: data.brand ?? "",
        model: data.model ?? "",
        year: data.year?.toString() ?? "",
        mileage: data.mileage?.toString() ?? "",
        fuel: data.fuel ?? "",
        transmission: data.transmission ?? "",
        color: data.color ?? "",
        price: data.price?.toString() ?? "",
        location: data.location ?? "",
      })

      setLoading(false)
    }

    loadCar()
  }, [id])

  async function updateCar(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabaseBrowser.from("cars").update({
      title: form.title,
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      mileage: Number(form.mileage),
      fuel: form.fuel,
      transmission: form.transmission,
      color: form.color,
      price: Number(form.price),
      location: form.location,
    }).eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    alert("Car updated")
    router.push("/safranbrother")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Edit Car</h1>

      <form onSubmit={updateCar}>
        {[
          ["title", "Title"],
          ["brand", "Brand"],
          ["model", "Model"],
          ["year", "Year"],
          ["mileage", "Mileage"],
          ["fuel", "Fuel"],
          ["transmission", "Transmission"],
          ["color", "Color"],
          ["price", "Price (£)"],
          ["location", "Location"],
        ].map(([k, label]) => (
          <input
            key={k}
            placeholder={label}
            value={form[k as keyof typeof form]}
            onChange={(e) => update(k, e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />
        ))}

        <button style={{ marginTop: 20, padding: 12 }}>
          Update Car
        </button>
      </form>
    </div>
  )
}
