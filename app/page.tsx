"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { supabase as supabaseBrowser } from "@/lib/supabase"
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
  transmission: string
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
      .or("status.ilike.available,status.is.null")
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
        <section className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover scale-110 animate-fade-in"
              alt="Premium Automotive Showroom"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center py-20">
            <div className="max-w-4xl mx-auto">
              <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-8 block animate-fade-up">
                Est. 2014 • London Showroom • United Kingdom
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-brand-white leading-[0.9] mb-10 animate-fade-up [animation-delay:200ms] tracking-tighter uppercase">
                The <span className="text-brand-orange italic">Showroom</span> <br className="hidden sm:block" /> Collection
              </h1>
              <p className="text-brand-silver/50 text-base sm:text-lg md:text-2xl mb-16 leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:400ms] italic font-medium px-4">
                Experience the pinnacle of automotive excellence with our meticulously curated collection of world-class vehicles.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 animate-fade-up [animation-delay:600ms]">
                <Link
                  href="/cars"
                  className="group bg-brand-orange hover:bg-orange-600 text-white px-16 py-6 rounded-sm font-bold transition-all duration-500 text-center uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-orange-500/20 flex items-center space-x-4"
                >
                  <span>Enter Showroom</span>
                  <span className="w-8 h-px bg-white/30 group-hover:w-12 transition-all duration-500" />
                </Link>
                <Link
                  href="/about"
                  className="text-brand-silver/60 hover:text-brand-orange transition-all duration-500 text-center uppercase tracking-[0.3em] text-[10px] font-bold border-b border-brand-silver/10 hover:border-brand-orange pb-2"
                >
                  Our Vision & Heritage
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

        {/* 4. THE SHOWROOM STANDARD (From About Page Vibe) */}
        <section className="py-24 md:py-48 bg-brand-blue/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/[0.02] -skew-x-12 translate-x-1/3" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 reveal">
               <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">The Showroom Difference</span>
               <h2 className="text-4xl md:text-6xl font-bold text-brand-white mb-8 tracking-tighter">The R.S Lanka <span className="text-brand-orange italic font-black">Standard</span></h2>
               <p className="text-brand-silver/50 text-lg md:text-xl leading-relaxed italic px-4">&ldquo;Every vehicle in our collection must pass a rigorous multi-stage audit before it earns its place in our showroom.&rdquo;</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
               {[
                 { title: "Curated Sourcing", desc: "We only source vehicles with verifiable histories, low ownership, and impeccable maintenance records from trusted networks.", icon: "01" },
                 { title: "Technical Integrity", desc: "Our specialist technicians perform a comprehensive 150-point audit of every mechanical and electronic system.", icon: "02" },
                 { title: "Aesthetic Perfection", desc: "Three days of professional detailing and paint correction ensure every car is presented in its absolute best condition.", icon: "03" }
               ].map((item, i) => (
                 <div key={i} className="reveal group" style={{ transitionDelay: `${i * 200}ms` }}>
                    <div className="flex items-center space-x-6 mb-10">
                       <span className="text-4xl font-black text-brand-orange/20 group-hover:text-brand-orange transition-colors duration-700 italic">{item.icon}</span>
                       <div className="h-px flex-grow bg-brand-blue/30 group-hover:bg-brand-orange/50 transition-all duration-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-white mb-6 tracking-tight uppercase group-hover:text-brand-orange transition-colors duration-500">{item.title}</h3>
                    <p className="text-brand-silver/40 text-base leading-relaxed font-medium">{item.desc}</p>
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
