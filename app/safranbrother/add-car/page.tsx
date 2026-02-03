"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AddCarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "Petrol",
    transmission: "Automatic",
    condition: "Used",
    color: "",
    price: "",
    location: "",
    description: "",
    extraFeatures: "",
  })

  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""])
  const [features, setFeatures] = useState<string[]>([])

  const FEATURE_OPTIONS = [
    "Air Conditioning",
    "Bluetooth",
    "Reverse Camera",
    "Alloy Wheels",
    "Leather Seats",
  ]

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    )
  }

  function updateImage(index: number, value: string) {
    const copy = [...imageUrls]
    copy[index] = value
    setImageUrls(copy)
  }

  function addImageField() {
    setImageUrls((prev) => [...prev, ""])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from("cars").insert({
      title: form.title,
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      mileage: Number(form.mileage),
      fuel: form.fuel,
      transmission: form.transmission,
      condition: form.condition.toLowerCase(),
      color: form.color,
      price: Number(form.price),
      location: form.location,
      description: form.description,
      features,
      extra_features: form.extraFeatures || null,
      image_urls: imageUrls.filter(Boolean),
      status: "available",
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Car added successfully")
    router.push("/safranbrother")
  }

  return (
    <div style={{ padding: 40, maxWidth: 720 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        Add New Car
      </h1>

      <form onSubmit={handleSubmit}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }}>
        
        {[
          ["title", "Car Title"],
          ["brand", "Brand"],
          ["model", "Model"],
          ["year", "Year"],
          ["mileage", "Mileage"],
          ["color", "Color"],
          ["price", "Price (£)"],
          ["location", "Location (e.g. Kingston, London)"],
        ].map(([key, label]) => (
          <input
            key={key}
            placeholder={label}
            value={(form as Record<string, string>)[key]}
            onChange={(e) => updateField(key, e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />
        ))}

        <select
          value={form.fuel}
          onChange={(e) => updateField("fuel", e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Hybrid</option>
          <option>Electric</option>
        </select>

        <select
          value={form.transmission}
          onChange={(e) => updateField("transmission", e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        >
          <option>Automatic</option>
          <option>Manual</option>
        </select>

        <select
          value={form.condition}
          onChange={(e) => updateField("condition", e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        >
          <option>Used</option>
          <option>New</option>
        </select>

        <textarea
          placeholder="Car description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          style={{ width: "100%", marginTop: 10 }}
        />

        <h3 style={{ marginTop: 20 }}>Features</h3>
        {FEATURE_OPTIONS.map((f) => (
          <label key={f} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={features.includes(f)}
              onChange={() => toggleFeature(f)}
            />{" "}
            {f}
          </label>
        ))}

        <textarea
          placeholder="Additional / custom features (optional)"
          value={form.extraFeatures}
          onChange={(e) => updateField("extraFeatures", e.target.value)}
          rows={3}
          style={{ width: "100%", marginTop: 10 }}
        />

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
          ➕ Add another image
        </button>

        <button
          disabled={loading}
          style={{ marginTop: 20, padding: 12 }}
        >
          {loading ? "Saving..." : "Save Car"}
        </button>
      </form>
    </div>
  )
}
