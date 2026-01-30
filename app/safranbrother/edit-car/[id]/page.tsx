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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the vehicle details below.
          </p>
        </div>

        <form onSubmit={updateCar} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div key={k}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  placeholder={label}
                  value={form[k as keyof typeof form]}
                  onChange={(e) => update(k, e.target.value)}
                  required
                  className={inputClasses}
                />
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
