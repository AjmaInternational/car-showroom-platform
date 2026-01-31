"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase as supabaseBrowser } from "@/lib/supabase"

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
    condition: "Pre-owned",
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

    const { error } = await supabaseBrowser.from("cars").insert({
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

  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={() => router.push("/safranbrother")}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the details of the vehicle to list it in the showroom.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
            }
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["title", "Car Title"],
              ["brand", "Brand"],
              ["model", "Model"],
              ["year", "Year"],
              ["mileage", "Mileage"],
              ["color", "Color"],
              ["price", "Price (£)"],
              ["location", "Location"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  placeholder={label}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => updateField(key, e.target.value)}
                  required
                  className={inputClasses}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                value={form.fuel}
                onChange={(e) => updateField("fuel", e.target.value)}
                className={inputClasses}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transmission
              </label>
              <select
                value={form.transmission}
                onChange={(e) => updateField("transmission", e.target.value)}
                className={inputClasses}
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <select
                value={form.condition}
                onChange={(e) => updateField("condition", e.target.value)}
                className={inputClasses}
              >
                <option>Pre-owned</option>
                <option>New</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Description
            </label>
            <textarea
              placeholder="Tell us about the car..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className={inputClasses}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {FEATURE_OPTIONS.map((f) => (
                <label key={f} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={features.includes(f)}
                    onChange={() => toggleFeature(f)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{f}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional / custom features (optional)
              </label>
              <textarea
                placeholder="List any extra features..."
                value={form.extraFeatures}
                onChange={(e) => updateField("extraFeatures", e.target.value)}
                rows={3}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Car Images (URLs)
            </h3>
            <div className="space-y-3">
              {imageUrls.map((url, i) => (
                <input
                  key={i}
                  placeholder={`Image ${i + 1} URL`}
                  value={url}
                  onChange={(e) => updateImage(i, e.target.value)}
                  className={inputClasses}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addImageField}
              className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ➕ Add another image
            </button>
          </div>

          <div className="pt-6">
            <button
              disabled={loading}
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : "Save Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
