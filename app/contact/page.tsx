"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const vehicle = formData.get("vehicle") as string
    const message = formData.get("message") as string

    const mailtoLink = `mailto:owner@rslankamotors.com?subject=New Inquiry: ${encodeURIComponent(vehicle || "General")}&body=${encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nVehicle: ${vehicle}\n\nMessage:\n${message}`
    )}`

    window.location.href = mailtoLink
    setSubmitted(true)
  }

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
        <section className="relative pt-32 md:pt-64 pb-16 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block animate-fade-up">Get In Touch</span>
            <h1 className="text-4xl md:text-8xl font-black text-brand-white tracking-tighter leading-none mb-10 animate-fade-up [animation-delay:200ms]">
              Connect with <br /> <span className="text-brand-orange italic">Our Consultants</span>
            </h1>
            <p className="text-brand-silver/50 max-w-2xl text-lg md:text-xl italic animate-fade-up [animation-delay:400ms]">
              Our professional team is available to assist you with inquiries, appointments, and personal vehicle consultations.
            </p>
          </div>
        </section>

        {/* CONTACT GRID */}
        <section className="py-16 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24 items-start">
            <div className="lg:col-span-1 space-y-16 reveal">
              <div>
                <h3 className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-8 border-b border-brand-blue/50 pb-4">Contact Channels</h3>
                <div className="space-y-12">
                   <div className="group">
                     <span className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] block mb-2 font-black">Direct WhatsApp</span>
                     <a href="https://wa.me/447385934662" target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold text-2xl group-hover:text-brand-orange transition-colors duration-500 italic tracking-tighter">Instant Consultation</a>
                   </div>
                   <div className="group">
                     <span className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] block mb-2 font-black">Email Correspondence</span>
                     <p className="text-brand-white font-bold text-2xl group-hover:text-brand-orange transition-colors duration-500 italic tracking-tighter">info@rslankamotors.com</p>
                   </div>
                   <div className="group">
                     <span className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] block mb-2 font-black">Showroom Location</span>
                     <p className="text-brand-white font-bold text-2xl italic tracking-tighter">United Kingdom</p>
                   </div>
                </div>
              </div>

              <div className="p-10 bg-brand-blue/20 border border-brand-blue/50 rounded-sm">
                 <h3 className="text-brand-white font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Showroom Hours</h3>
                 <div className="space-y-4 text-xs font-bold italic tracking-tight text-brand-silver/60">
                    <p className="flex justify-between border-b border-brand-blue/30 pb-4"><span>Mon - Fri</span> <span className="text-brand-silver">09:00 - 18:00</span></p>
                    <p className="flex justify-between border-b border-brand-blue/30 pb-4"><span>Saturday</span> <span className="text-brand-silver">10:00 - 16:00</span></p>
                    <p className="flex justify-between text-brand-silver/20"><span>Sunday</span> <span>By Appointment</span></p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-2 reveal [transition-delay:200ms] active">
               <div className="glass-effect p-8 md:p-16 rounded-sm border border-brand-blue/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                     <span className="text-brand-orange font-black text-6xl opacity-5 italic select-none">RS</span>
                  </div>

                  {submitted ? (
                    <div className="py-24 text-center animate-fade-in">
                      <div className="w-20 h-20 rounded-full bg-brand-orange/20 flex items-center justify-center mx-auto mb-10">
                         <div className="w-10 h-10 rounded-full bg-brand-orange animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-black text-brand-white mb-6 italic tracking-tighter">Message Received</h3>
                      <p className="text-brand-silver/50 text-sm uppercase tracking-[0.2em] max-w-xs mx-auto leading-loose">
                        A showroom consultant will contact you via electronic mail within 24 business hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-12 text-brand-orange text-[10px] font-black uppercase tracking-[0.4em] hover:underline"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-brand-white font-bold uppercase tracking-[0.3em] text-[10px] mb-12 border-b border-brand-blue/50 pb-4">Secure Inquiry Portal</h3>
                      <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-3 group">
                            <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black group-focus-within:text-brand-orange transition-colors">Full Name</label>
                            <input name="fullName" required type="text" className="w-full bg-transparent border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10 font-medium" placeholder="Alexander Smith" />
                          </div>
                          <div className="space-y-3 group">
                            <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black group-focus-within:text-brand-orange transition-colors">Electronic Mail</label>
                            <input name="email" required type="email" className="w-full bg-transparent border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10 font-medium" placeholder="alex@company.com" />
                          </div>
                        </div>
                        <div className="space-y-3 group">
                          <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black group-focus-within:text-brand-orange transition-colors">Vehicle of Interest (Optional)</label>
                          <input name="vehicle" type="text" className="w-full bg-transparent border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10 font-medium" placeholder="Range Rover Autobiography" />
                        </div>
                        <div className="space-y-3 group">
                          <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black group-focus-within:text-brand-orange transition-colors">Message Content</label>
                          <textarea name="message" required rows={5} className="w-full bg-transparent border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 resize-none placeholder:text-brand-silver/10 font-medium" placeholder="How can our consultants assist you today?"></textarea>
                        </div>
                        <button
                          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-black py-6 rounded-sm transition-all duration-500 shadow-2xl shadow-orange-500/20 uppercase text-[10px] tracking-[0.4em]"
                        >
                          Send Secure Message
                        </button>
                      </form>
                    </>
                  )}
               </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="py-32 reveal">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <a
                href="https://www.google.com/maps/place/15-17+Cumberland+St,+London+W1H+7AL,+UK"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-[500px] bg-brand-blue/20 rounded-sm border border-brand-blue/50 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
              >
                 <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-[2s] opacity-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/map.jpeg" className="w-full h-full object-cover" alt="Map Area" />
                 </div>
                 <div className="relative z-10 text-center px-4">
                    <div className="w-20 h-20 rounded-full border border-brand-orange flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500">
                       <div className="w-4 h-4 rounded-full bg-brand-orange animate-pulse" />
                    </div>
                    <h4 className="text-brand-white font-bold text-2xl tracking-tighter mb-4 uppercase tracking-[0.1em]">Visit Our Showroom</h4>
                    <p className="text-brand-silver font-bold text-sm mb-2">15-17 Cumberland St, London W1H 7AL, UK</p>
                    <p className="text-brand-orange text-[10px] uppercase tracking-[0.4em] font-black">Open in Google Maps • By Appointment Only</p>
                 </div>
              </a>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
