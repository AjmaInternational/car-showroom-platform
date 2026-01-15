import { supabase } from "../lib/supabase"

export default async function Home() {
  const { data: cars } = await supabase.from("cars").select("*")

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        Car Showroom
      </h1>

      <div style={{ marginTop: 30 }}>
        {cars?.map(car => (
          <div key={car.id} style={{ marginBottom: 40 }}>
            <img src={car.image_url} width="300" />
            <h2>{car.title}</h2>
            <p>Price: ${car.price}</p>
            <p>{car.year} • {car.mileage} km</p>
          </div>
        ))}
      </div>
    </div>
  )
}
