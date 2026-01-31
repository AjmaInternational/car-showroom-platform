import { supabaseBrowser } from "@/lib/supabaseBrowser"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: car } = await supabaseBrowser
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!car) return { title: "Car Not Found | R.S Lanka Motors" }

  return {
    title: `${car.year} ${car.brand} ${car.model} for Sale in the UK | R.S Lanka Motors`,
    description: `Buy this ${car.year} ${car.brand} ${car.model} in ${car.location}. Premium used car UK. Price: £${car.price.toLocaleString()}.`,
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { data: car } = await supabaseBrowser
    .from("cars")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!car) {
    return <div>Car not found</div>
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${car.year} ${car.brand} ${car.model}`,
    "brand": car.brand,
    "model": car.model,
    "productionDate": car.year,
    "vehicleIdentificationNumber": car.id,
    "offers": {
      "@type": "Offer",
      "price": car.price,
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock"
    },
    "image": car.image_urls?.[0]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-grow bg-brand-navy pb-24">
        {/* IMAGE GALLERY */}
        <section className="bg-brand-blue py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-brand-navy border border-brand-silver/10 shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car.image_urls?.[0] || "/placeholder-car.jpg"}
                      className="w-full h-full object-cover"
                      alt={`${car.brand} ${car.model} UK`}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {car.image_urls?.slice(1, 5).map((url: string, idx: number) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-brand-navy border border-brand-silver/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all cursor-pointer" alt="Interior/Exterior UK" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">{car.status} • {car.condition}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-silver mt-2 tracking-tighter">
                      {car.year} {car.brand} {car.model}
                    </h1>
                    <p className="text-brand-grey mt-2 text-lg uppercase tracking-widest">{car.location}, UK</p>
                  </div>

                  <div className="bg-brand-navy/50 backdrop-blur-md p-8 rounded-2xl border border-brand-silver/5 mb-8 shadow-xl">
                    <span className="text-brand-grey text-sm uppercase tracking-widest block mb-2 font-medium">Retail Price</span>
                    <span className="text-5xl font-bold text-brand-orange tracking-tighter italic">£{car.price.toLocaleString()}</span>
                    <div className="h-[1px] bg-brand-silver/10 my-6" />
                    <div className="flex space-x-4 text-xs uppercase tracking-[0.2em] font-bold text-brand-grey">
                      <span>Verified History</span>
                      <span className="text-brand-orange">•</span>
                      <span>Warranty Available</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={`https://wa.me/?text=Hi, I am interested in the ${car.year} ${car.brand} ${car.model} listed on R.S Lanka Motors.`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-green-500/20 uppercase text-xs tracking-widest"
                    >
                      WhatsApp Us
                    </a>
                    <button className="flex-1 bg-brand-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/20 uppercase text-xs tracking-widest">
                      Call Now
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* SPECS & FEATURES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-brand-silver mb-6 border-b border-brand-blue pb-4 tracking-tight">Vehicle Description</h2>
                <p className="text-brand-grey leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {car.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-brand-silver mb-6 border-b border-brand-blue pb-4 tracking-tight">Key Features</h2>
                <div className="grid grid-cols-2 gap-y-4">
                  {car.features?.map((f: string, i: number) => (
                    <div key={i} className="flex items-center space-x-3 text-brand-silver text-sm">
                      <span className="text-brand-orange">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                  {car.extra_features && (
                    <div className="col-span-full mt-4 text-brand-grey text-sm italic italic">
                       {car.extra_features}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="bg-brand-blue p-8 rounded-2xl border border-brand-navy/50 shadow-xl">
                 <h3 className="text-lg font-bold text-brand-silver mb-8 uppercase tracking-widest border-b border-brand-navy pb-4">Technical Details</h3>
                 <div className="space-y-6">
                    {[
                      { label: "Mileage", value: `${car.mileage.toLocaleString()} miles` },
                      { label: "Fuel Type", value: car.fuel },
                      { label: "Transmission", value: car.transmission },
                      { label: "Color", value: car.color },
                      { label: "Year", value: car.year },
                      { label: "Location", value: car.location }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-brand-grey font-medium uppercase tracking-tighter text-[10px]">{item.label}</span>
                        <span className="text-brand-silver font-bold italic">{item.value}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-lg border-t border-brand-blue p-4 flex space-x-4 shadow-2xl">
          <a
            href={`https://wa.me/?text=Interested in ${car.brand} ${car.model}`}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold text-center text-xs uppercase tracking-widest"
          >
            WhatsApp
          </a>
          <button className="flex-1 bg-brand-orange text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest">
            Call
          </button>
      </div>

      <Footer />
    </div>
  )
}
