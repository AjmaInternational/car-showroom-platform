"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

interface CarForm {
  title: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  color: string;
  price: string;
  location: string;
}

export default function EditCarPage() {
  const router = useRouter()
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<CarForm>({
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

  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""])

  function update(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function updateImage(index: number, value: string) {
    const copy = [...imageUrls]
    copy[index] = value
    setImageUrls(copy)
  }

  function addImageField() {
    setImageUrls((prev) => [...prev, ""])
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

      if (data.image_urls && Array.isArray(data.image_urls)) {
        setImageUrls(data.image_urls.length > 0 ? data.image_urls : ["", "", ""])
      }

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
      image_urls: imageUrls.filter(Boolean),
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
            value={form[k as keyof CarForm]}
            onChange={(e) => update(k, e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />
        ))}

        <h3 style={{ marginTop: 20 }}>Car Images (URLs)</h3>
        {imageUrls.map((url, i) => (
          <input
            key={i}
            placeholder={`Image ${i + 1} URL`}
            value={url}
            onChange={(e) => updateImage(i, e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />
        ))}

        <button
          type="button"
          onClick={addImageField}
          style={{ marginTop: 10 }}
        >
          + Add another image
        </button>

        <button style={{ marginTop: 20, padding: 12, display: "block" }}>
          Update Car
        </button>
      </form>
    </div>
  )
}
