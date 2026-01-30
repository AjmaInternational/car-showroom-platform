"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function Dashboard() {
  const router = useRouter()
  const [cars, setCars] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any

  const loadCars = useCallback(async () => {
    const { data } = await supabaseBrowser
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false })

    setCars(data || [])
  }, [])

  useEffect(() => {
    void loadCars() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadCars])

  async function deleteCar(id: string) {
    const ok = confirm("⚠️ Permanently delete this car? This cannot be undone.")
    if (!ok) return

    await supabaseBrowser.from("cars").delete().eq("id", id)
    loadCars()
  }

  async function markSold(id: string) {
    const choice = window.prompt(
      "1 = Mark as SOLD (keep)\n2 = Mark SOLD + delete now\nCancel = abort"
    )

    if (choice === "1") {
      await supabaseBrowser.from("cars").update({ status: "sold" }).eq("id", id)
    }

    if (choice === "2") {
      const ok = confirm("Delete this car now?")
      if (!ok) return
      await supabaseBrowser.from("cars").delete().eq("id", id)
    }

    loadCars()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => router.push("/safranbrother/add-car")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            + Add New Car
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {car.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      £{car.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          car.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {car.status !== "sold" && (
                        <>
                          <button
                            onClick={() =>
                              router.push(`/safranbrother/edit-car/${car.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => markSold(car.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Sold
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      No cars found. Add some to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
