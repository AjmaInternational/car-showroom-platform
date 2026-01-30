"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function Dashboard() {
  const router = useRouter()
  const [cars, setCars] = useState<any[]>([])

  async function loadCars() {
    const { data } = await supabaseBrowser
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false })

    setCars(data || [])
  }

  useEffect(() => {
    loadCars()
  }, [])

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
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>

      <button onClick={() => router.push("/safranbrother/add-car")}>
        + Add New Car
      </button>

      <table style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.title}</td>
              <td>{car.brand}</td>
              <td>£{car.price}</td>
              <td>{car.status}</td>
              <td>
                {car.status !== "sold" && (
                  <>
                    <button
                      onClick={() =>
                        router.push(`/safranbrother/edit-car/${car.id}`)
                      }
                    >
                      Edit
                    </button>{" "}
                    <button onClick={() => markSold(car.id)}>Sold</button>{" "}
                  </>
                )}
                <button onClick={() => deleteCar(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
