"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { supabaseBrowser } from "@/lib/supabaseBrowser"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CarCard from "./components/CarCard"

type Car = {
  id: string
  title: string
  brand: string
  model: string
  price: number
  year: number
  mileage: number
  color: string
  location: string
  image_urls: string[] | null
  status: string
}

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFeaturedCars = useCallback(async () => {
    const { data } = await supabaseBrowser
      .from("cars")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(3)

    setCars(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchFeaturedCars()

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [fetchFeaturedCars])

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "R.S Lanka Motors",
    "url": "https://rslankamotors.com",
    "logo": "https://rslankamotors.com/logo.png",
    "description": "Premium Automotive Showroom in the United Kingdom specializing in curated quality vehicles.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "availableLanguage": "English"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Header />

      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover scale-110 animate-fade-in"
              alt="Premium Automotive Showroom"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-xs mb-6 block animate-fade-up">
                Excellence in Presentation
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-brand-white leading-[1.1] mb-8 animate-fade-up [animation-delay:200ms]">
                A Premium <br /> <span className="text-brand-orange">Automotive</span> <br /> Showroom
              </h1>
              <p className="text-brand-silver/70 text-lg md:text-xl mb-12 leading-relaxed max-w-xl animate-fade-up [animation-delay:400ms]">
                Discover a curated collection of world-class vehicles, presented with the professional integrity and attention to detail you deserve.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-up [animation-delay:600ms]">
                <Link
                  href="/cars"
                  className="bg-brand-orange hover:bg-orange-600 text-white px-12 py-5 rounded-sm font-bold transition-all duration-500 text-center uppercase tracking-widest text-xs shadow-2xl shadow-orange-500/20"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/about"
                  className="bg-white/5 backdrop-blur-md border border-white/10 text-brand-silver hover:bg-white/10 px-12 py-5 rounded-sm font-bold transition-all duration-500 text-center uppercase tracking-widest text-xs"
                >
                  Our Vision
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-transparent" />
          </div>
        </section>

        {/* 2. SHOWROOM IDENTITY SECTION */}
        <section className="py-32 bg-brand-navy relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="reveal">
                <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">The Showroom Standard</span>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-8 tracking-tighter leading-tight">
                  Redefining the <span className="italic">Automotive Experience</span>
                </h2>
                <div className="space-y-6 text-brand-silver/60 leading-relaxed text-lg">
                  <p>
                    R.S Lanka Motors stands as a beacon of professional automotive presentation in the UK. We don&apos;t just sell vehicles; we curate an experience built on trust, transparency, and the highest standards of quality.
                  </p>
                  <p>
                    Our showroom environment reflects our commitment to excellence, providing a calm and professional space for you to discover your next vehicle.
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-brand-orange mb-1">100%</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-silver/40">Verified Quality</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-brand-orange mb-1">Premium</div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-silver/40">Vehicle Selection</div>
                  </div>
                </div>
              </div>
              <div className="relative reveal [transition-delay:200ms]">
                <div className="absolute -inset-4 border border-brand-orange/20 rounded-sm translate-x-8 translate-y-8 -z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000"
                  className="rounded-sm shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Professional Showroom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED VEHICLES */}
        <section className="py-32 bg-brand-blue/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
              <div>
                <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Selected for You</span>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-white tracking-tighter">Showroom Collection</h2>
              </div>
              <Link href="/cars" className="group flex items-center space-x-4 text-brand-silver font-bold text-xs uppercase tracking-[0.2em] hover:text-brand-orange transition-colors">
                <span>View Full Inventory</span>
                <div className="w-12 h-px bg-brand-silver group-hover:bg-brand-orange transition-all group-hover:w-16" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-brand-navy h-[500px] animate-pulse rounded-sm" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {cars.map((car, idx) => (
                  <div key={car.id} className={`reveal`} style={{ transitionDelay: `${idx * 200}ms` }}>
                    <CarCard car={car} />
                  </div>
                ))}
                {cars.length === 0 && (
                  <div className="col-span-full py-20 text-center reveal">
                    <p className="text-brand-silver/40 italic">Our latest collection is currently being prepared for presentation.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 4. SHOWROOM EXPERIENCE */}
        <section className="py-32 bg-brand-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24 reveal">
              <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Difference in Detail</span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-8 tracking-tighter">The Showroom Experience</h2>
              <p className="text-brand-silver/60 text-lg leading-relaxed">
                Experience a level of service and presentation that goes beyond the standard. At R.S Lanka Motors, every detail is managed to ensure your complete satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  title: "Professional Presentation",
                  desc: "Each vehicle is presented in immaculate condition, reflecting its true quality and our showroom standards.",
                  icon: "01"
                },
                {
                  title: "Technical Excellence",
                  desc: "Comprehensive multi-point inspections and history checks are standard for every vehicle in our collection.",
                  icon: "02"
                },
                {
                  title: "Personal Consultation",
                  desc: "Our experienced consultants provide professional, pressure-free guidance tailored to your requirements.",
                  icon: "03"
                }
              ].map((item, idx) => (
                <div key={idx} className="group reveal" style={{ transitionDelay: `${idx * 200}ms` }}>
                  <div className="text-5xl font-black text-brand-white/5 mb-8 group-hover:text-brand-orange/20 transition-colors duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-white mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-brand-silver/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. VEHICLE SELECTION PROCESS */}
        <section className="py-32 bg-brand-blue relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1542362567-b055002b9134?auto=format&fit=crop&q=80&w=1000"
                  className="rounded-sm shadow-2xl grayscale"
                  alt="Vehicle Inspection"
                />
              </div>
              <div className="order-1 lg:order-2 reveal [transition-delay:200ms]">
                <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Path to Perfection</span>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-12 tracking-tighter">Our Selection Process</h2>

                <div className="space-y-12">
                  {[
                    { step: "01", title: "Global Sourcing", desc: "We identify and source vehicles that meet our strict criteria for quality and history." },
                    { step: "02", title: "Rigorous Inspection", desc: "A comprehensive technical audit ensures every mechanical and aesthetic aspect is perfect." },
                    { step: "03", title: "Showroom Preparation", desc: "Vehicles undergo a professional detailing process to meet showroom presentation standards." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex space-x-8">
                      <div className="text-brand-orange font-black text-xl italic tracking-tighter">{item.step}</div>
                      <div>
                        <h4 className="text-brand-white font-bold mb-2 tracking-tight">{item.title}</h4>
                        <p className="text-brand-silver/50 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AUTOMOTIVE SEO CONTENT */}
        <section className="py-32 bg-brand-navy">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
            <h2 className="text-2xl font-bold text-brand-white mb-12 tracking-tight italic uppercase tracking-[0.2em]">The Premier Car Showroom in the UK</h2>
            <div className="prose prose-invert max-w-none text-brand-silver/40 text-sm leading-loose">
              <p className="mb-8">
                R.S Lanka Motors is recognized as a leading automotive showroom for those seeking quality cars in the UK.
                Our commitment to professional excellence and premium vehicle selection makes us the trusted choice for
                discerning buyers. Whether you are searching for a high-performance vehicle or a luxury daily driver,
                our showroom collection offers a curated selection of the finest vehicles available.
              </p>
              <p>
                Experience the R.S Lanka Motors difference today. Visit our showroom or browse our available vehicles
                online to discover why we are the preferred automotive showroom in the United Kingdom. We pride
                ourselves on our transparent approach and dedicated service, ensuring your vehicle selection process
                is as seamless and professional as the cars we present.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
