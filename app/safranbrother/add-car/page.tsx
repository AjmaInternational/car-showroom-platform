"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase as supabaseBrowser } from "@/lib/supabase"

export default function AddCarPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
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
  })

  const [features, setFeatures] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const FEATURES = [
    "Air Conditioning",
    "Reverse Camera",
    "Leather Seats",
    "Bluetooth",
    "Alloy Wheels",
  ]

  function updateField(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function toggleFeature(f: string) {
    setFeatures((p) =>
      p.includes(f) ? p.filter((x) => x !== f) : [...p, f]
    )
  }

  function handleFiles(files: FileList | null) {
    if (!files) return
    setImageFiles((p) => [...p, ...Array.from(files)])
  }

  function removeImage(i: number) {
    setImageFiles((p) => p.filter((_, idx) => idx !== i))
  }

  async function uploadImages(): Promise<string[]> {
    const urls: string[] = []

    for (const file of imageFiles) {
      const ext = file.name.split(".").pop()
      const name = `${crypto.randomUUID()}.${ext}`
      const path = `cars/${name}`

      const { error } = await supabaseBrowser.storage
        .from("images")
        .upload(path, file)

      if (error) throw error

      const { data } = supabaseBrowser.storage
        .from("images")
        .getPublicUrl(path)

      urls.push(data.publicUrl)
    }

    return urls
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const image_urls = await uploadImages()

      const { error } = await supabaseBrowser.from("cars").insert({
        ...form,
        year: Number(form.year),
        mileage: Number(form.mileage),
        price: Number(form.price),
        condition: form.condition.toLowerCase(),
        features,
        image_urls,
        status: "available",
      })

      if (error) throw error
      router.push("/safranbrother")
    } catch (err: any) {
      alert(err.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  const input =
    "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"

  const label = "text-sm font-medium text-gray-900"

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => router.push("/safranbrother")}
        className="text-sm text-indigo-600 hover:underline mb-4"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow p-8 text-gray-900">
        <h1 className="text-2xl font-bold mb-1">Add New Car</h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter the details of the vehicle to list it in the showroom.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            ].map(([k, l]) => (
              <div key={k}>
                <label className={label}>{l}</label>
                <input
                  className={input}
                  value={form[k as keyof typeof form]}
                  onChange={(e) => updateField(k, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={label}>Fuel Type</label>
              <select
                className={input}
                value={form.fuel}
                onChange={(e) => updateField("fuel", e.target.value)}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
            </div>

            <div>
              <label className={label}>Transmission</label>
              <select
                className={input}
                value={form.transmission}
                onChange={(e) =>
                  updateField("transmission", e.target.value)
                }
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            <div>
              <label className={label}>Condition</label>
              <select
                className={input}
                value={form.condition}
                onChange={(e) => updateField("condition", e.target.value)}
              >
                <option>Used</option>
                <option>New</option>
              </select>
            </div>
          </div>

          <div>
            <label className={label}>Car Description</label>
            <textarea
              rows={4}
              className={input}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div>
            <p className="font-medium mb-2">Features</p>
            <div className="grid grid-cols-2 gap-2">
              {FEATURES.map((f) => (
                <label key={f} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={features.includes(f)}
                    onChange={() => toggleFeature(f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Car Images</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {imageFiles.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-32 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-32 border-2 border-dashed rounded flex items-center justify-center text-sm text-gray-600"
              >
                + Add Images
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Car"}
          </button>
        </form>
      </div>
    </div>
  )
}
