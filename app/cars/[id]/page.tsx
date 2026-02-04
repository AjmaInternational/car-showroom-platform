import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Metadata } from "next"
import { supabase as supabaseBrowser } from "@/lib/supabase"
import { getPublicImage } from "@/lib/getPublicImage"

/* =========================
   METADATA
========================= */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {

  const { id } = await params

  const { data: car } = await supabaseBrowser
    .from("cars")
    .select("brand, model, year")
    .eq("id", id)
    .single()

  if (!car) {
    return { title: "Vehicle Not Found | R.S Lanka Motors" }
  }

  return {
    title: `${car.year} ${car.brand} ${car.model} | R.S Lanka Motors`,
    description: `Explore the ${car.year} ${car.brand} ${car.model} available at R.S Lanka Motors.`
  }
}

/* =========================
   PAGE
========================= */
export default async function CarDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: car } = await supabaseBrowser
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()

  if (!car) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-brand-navy flex items-center justify-center">
          <p className="text-brand-silver/40 italic">
            Vehicle not found in our collection.
          </p>
        </main>
        <Footer />
      </div>
    )
  }

const images = (car.image_urls || []).map((p: string) =>
  getPublicImage(p)
)


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-brand-navy pb-32">

        {/* HERO */}
        <section className="pt-32 md:pt-48 pb-16 max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-7xl font-black text-brand-white">
            {car.brand} <span className="text-brand-orange italic">{car.model}</span>
          </h1>
          <p className="text-brand-silver/40 uppercase tracking-widest text-xs mt-4">
            {car.year} • {car.location}
          </p>
        </section>

        {/* IMAGE */}
<section className="max-w-7xl mx-auto px-4 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
  {images.length > 0 ? (
    images.map((img: string, i: number) => (
      <img
        key={i}
        src={img}
        alt={`${car.brand} ${car.model} ${i + 1}`}
        className="w-full rounded-sm object-cover"
      />
    ))
  ) : (
    <img
      src="/images/chevroletcar.jpg"
      className="w-full rounded-sm object-cover"
    />
  )}
</section>


        {/* CONTENT */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-brand-orange uppercase tracking-[0.3em] text-xs mb-6">
                Vehicle Description
              </h2>
              <p className="text-brand-silver/70 leading-relaxed italic whitespace-pre-line">
                {car.description || "Contact us for full vehicle details."}
              </p>
            </div>

            {car.features?.length > 0 && (
              <div>
                <h2 className="text-brand-orange uppercase tracking-[0.3em] text-xs mb-6">
                  Features
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features.map((f: string, i: number) => (
                    <li key={i} className="text-brand-silver">• {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-brand-blue/30 p-10 border border-brand-blue/40 rounded-sm space-y-6">

            <div className="flex justify-between">
              <span className="text-brand-silver/40 text-xs">Mileage</span>
              <span className="text-brand-white font-bold">
                {(car.mileage ?? 0).toLocaleString()} miles
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-brand-silver/40 text-xs">Transmission</span>
              <span className="text-brand-white font-bold">
                {car.transmission || "Automatic"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-brand-silver/40 text-xs">Fuel</span>
              <span className="text-brand-white font-bold">
                {car.fuel || "—"}
              </span>
            </div>

            <div className="border-t border-brand-blue/40 pt-6">
              <a
                href={`https://wa.me/447903141787?text=${encodeURIComponent(
                  `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model}.`
                )}`}
                className="block w-full bg-brand-orange text-white py-4 text-center font-bold uppercase text-xs tracking-[0.3em] rounded-sm"
              >
                Enquire / Book Now
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
