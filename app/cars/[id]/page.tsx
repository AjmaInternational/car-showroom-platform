import { supabase as supabaseBrowser } from "@/lib/supabase"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const { data: car } = await supabaseBrowser
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()

  if (!car) return { title: "Vehicle Not Found | R.S Lanka Motors" }

  return {
    title: `${car.year} ${car.brand} ${car.model} | Showroom Collection | R.S Lanka Motors`,
    description: `Discover this meticulously presented ${car.year} ${car.brand} ${car.model}. Available now at R.S Lanka Motors showroom.`,
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
          <p className="text-brand-silver/40 italic">Vehicle not found in our current collection.</p>
        </main>
        <Footer />
      </div>
    )
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

      <main className="flex-grow bg-brand-navy pb-32">
        {/* TOP SECTION: HERO & TITLE */}
        <section className="relative pt-32 md:pt-48 pb-10 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/10 skew-y-3 origin-left translate-y-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
              <div className="animate-fade-up">
                <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Showroom Collection</span>
                <h1 className="text-4xl md:text-7xl font-black text-brand-white tracking-tighter leading-none mb-4">
                  {car.brand} <span className="text-brand-orange italic">{car.model}</span>
                </h1>
                <p className="text-brand-silver/40 text-[10px] md:text-sm uppercase tracking-[0.3em] font-medium">{car.year} • {car.location}</p>
              </div>
              <div className="animate-fade-up [animation-delay:200ms] md:text-right">
                <span className="text-brand-silver/30 text-[10px] uppercase tracking-[0.3em] font-black block mb-2">Refined Price</span>
                <span className="text-3xl md:text-5xl font-black text-brand-white italic tracking-tighter">£{(car.price ?? 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 aspect-[16/9] overflow-hidden rounded-sm bg-brand-blue/20 animate-fade-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={car.image_urls?.[0] || "/placeholder-car.jpg"}
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                alt={`${car.brand} ${car.model} Presentation`}
              />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
              {car.image_urls?.slice(1, 3).map((url: string, idx: number) => (
                <div key={idx} className="aspect-[4/3] rounded-sm overflow-hidden bg-brand-blue/20 animate-fade-in" style={{ animationDelay: `${(idx + 1) * 200}ms` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" alt="Exterior Details" />
                </div>
              ))}
              {(!car.image_urls || car.image_urls.length < 3) && (
                <div className="aspect-[4/3] rounded-sm bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                  <span className="text-brand-silver/10 font-black text-4xl italic">RS</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-20">
              <div className="reveal">
                <h2 className="text-sm font-black text-brand-orange uppercase tracking-[0.4em] mb-10 pb-4 border-b border-brand-blue/50">Presentation Details</h2>
                <p className="text-brand-silver/70 leading-[2] text-lg whitespace-pre-line font-medium italic">
                  &ldquo;{car.description}&rdquo;
                </p>
              </div>

              {car.features && car.features.length > 0 && (
                <div className="reveal">
                  <h2 className="text-sm font-black text-brand-orange uppercase tracking-[0.4em] mb-10 pb-4 border-b border-brand-blue/50">Curated Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {car.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center space-x-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover:scale-150 transition-transform duration-300" />
                        <span className="text-brand-silver font-bold tracking-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-12">
              <div className="bg-brand-blue/30 p-10 rounded-sm border border-brand-blue/50 reveal">
                <h3 className="text-[10px] font-black text-brand-white uppercase tracking-[0.4em] mb-10 border-b border-brand-blue/50 pb-4">Technical Specs</h3>
                <div className="space-y-8">
                  {[
                    { label: "Mileage", value: `${(car.mileage ?? 0).toLocaleString()} miles` },
                    { label: "Fuel Type", value: car.fuel },
                    { label: "Transmission", value: car.transmission },
                    { label: "Exterior Color", value: car.color },
                    { label: "Year of Production", value: car.year },
                    { label: "Showroom Location", value: car.location }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-end group">
                      <span className="text-brand-silver/30 font-black uppercase tracking-[0.2em] text-[8px] mb-1 group-hover:text-brand-orange transition-colors">{item.label}</span>
                      <span className="text-brand-silver font-bold italic tracking-tight group-hover:text-brand-white transition-colors">{item.value || "Contact for Info"}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-16 space-y-4">
                  <a
                    href={`https://wa.me/?text=Hi, I am interested in the ${car.year} ${car.brand} ${car.model} at R.S Lanka Motors.`}
                    className="block w-full bg-brand-orange hover:bg-orange-600 text-white py-5 rounded-sm font-bold text-center transition-all duration-500 uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-orange-500/20"
                  >
                    Inquire via WhatsApp
                  </a>
                  <button className="block w-full bg-brand-white hover:bg-brand-silver text-brand-navy py-5 rounded-sm font-bold transition-all duration-500 uppercase text-[10px] tracking-[0.3em]">
                    Contact Consultant
                  </button>
                </div>
              </div>

              <div className="p-10 border border-brand-blue/30 rounded-sm reveal">
                <h4 className="text-brand-white font-bold mb-4 tracking-tight">Viewing Information</h4>
                <p className="text-brand-silver/40 text-xs leading-relaxed mb-6">
                  Our showroom operates by appointment to ensure each client receives a personal and professional experience.
                </p>
                <div className="flex items-center space-x-3 text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">
                  <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  <span>Appointments Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-brand-blue/50 p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] flex space-x-4">
          <a
            href={`https://wa.me/?text=Interested in ${car.brand} ${car.model}`}
            className="flex-1 bg-brand-orange text-white py-4 rounded-sm font-bold text-center text-[10px] uppercase tracking-[0.3em]"
          >
            WhatsApp
          </a>
          <button className="flex-1 bg-brand-white text-brand-navy py-4 rounded-sm font-bold text-[10px] uppercase tracking-[0.3em]">
            Call Now
          </button>
      </div>

      <Footer />
    </div>
  )
}
