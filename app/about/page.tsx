"use client"

import { useEffect } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      })
    }, { threshold: 0.1 })

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-brand-navy">
        {/* HERO */}
        <section className="relative pt-32 md:pt-64 pb-16 md:pb-32 overflow-hidden bg-brand-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block animate-fade-up">Our Story</span>
            <h1 className="text-4xl md:text-8xl font-black text-brand-white mb-10 tracking-tighter leading-none animate-fade-up [animation-delay:200ms]">
              A Legacy of <br /> <span className="text-brand-orange italic">Automotive Excellence</span>
            </h1>
            <p className="text-brand-silver/50 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed italic animate-fade-up [animation-delay:400ms] px-4">
              Serving the UK automotive market with passion, integrity, and an unwavering commitment to quality presentation and professional service.
            </p>
          </div>
        </section>

        {/* CONTENT 1: VISION */}
        <section className="py-24 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-10 tracking-tighter">A Vision for the <span className="text-brand-orange">Modern Showroom</span></h2>
              <div className="space-y-8 text-brand-silver/60 leading-[1.8] text-lg font-medium">
                <p>
                  At R.S Lanka Motors, we believe that acquiring a premium vehicle should be an experience as refined as the machine itself. Founded on the principles of transparency and professional excellence, we have established ourselves as a premier automotive showroom in the United Kingdom.
                </p>
                <p>
                  Our journey began with a simple observation: the automotive market needed a more dedicated, professional approach to vehicle presentation and client service. We don&apos;t just facilitate transactions; we build relationships based on trust and shared passion for automotive quality.
                </p>
              </div>
            </div>
            
            <div className="relative reveal [transition-delay:200ms]">
               <div className="absolute -inset-10 border border-brand-orange/10 -z-10 rotate-3" />
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src="/images/about-us-page-image1.jpg" 
                 className="rounded-sm shadow-2xl grayscale" 
                 alt="R.S Lanka Motors Showroom Concept" 
               />
            </div>
          </div>
        </section>

        {/* CONTENT 2: THE STANDARD */}
        <section className="py-24 md:py-48 bg-brand-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 reveal">
               <h2 className="text-3xl md:text-5xl font-bold text-brand-white mb-8 tracking-tighter">The R.S Lanka <span className="italic">Standard</span></h2>
               <p className="text-brand-silver/50 text-base md:text-lg px-4">Every vehicle that enters our showroom collection must pass a rigorous multi-stage audit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
               {[
                 { title: "Curated Sourcing", desc: "We only source vehicles with verifiable histories and impeccable maintenance records." },
                 { title: "Technical Integrity", desc: "Our technicians perform a comprehensive audit of every mechanical and electronic system." },
                 { title: "Aesthetic Perfection", desc: "Professional detailing ensures every car is presented in its absolute best condition." }
               ].map((item, i) => (
                 <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 200}ms` }}>
                    <div className="w-16 h-1 bg-brand-orange mx-auto mb-10" />
                    <h3 className="text-xl font-bold text-brand-white mb-6 tracking-tight uppercase">{item.title}</h3>
                    <p className="text-brand-silver/40 text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* STATS / MILESTONES */}
        <section className="py-24 md:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
            {[
              { label: "Years in Showroom", value: "10+" },
              { label: "Premium Deliveries", value: "5000+" },
              { label: "Client Satisfaction", value: "100%" },
              { label: "UK Coverage", value: "National" }
            ].map((stat, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="text-5xl font-black text-brand-white mb-4 italic tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-orange font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-48 bg-brand-orange relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-navy opacity-10 -skew-x-12 translate-x-1/2" />
           <div className="max-w-4xl mx-auto px-4 relative z-10 text-center reveal active">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter leading-none">Experience the <br /> Showroom Difference</h2>
              <Link 
                href="/cars"
                className="inline-block bg-brand-navy text-white px-8 md:px-16 py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-xs hover:bg-brand-blue transition-all duration-500 shadow-2xl"
              >
                View Collection
              </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
