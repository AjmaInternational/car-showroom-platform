"use client"

import { useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function ContactPage() {
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
        <section className="relative pt-64 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block animate-fade-up">Get In Touch</span>
            <h1 className="text-5xl md:text-8xl font-black text-brand-white tracking-tighter leading-none mb-10 animate-fade-up [animation-delay:200ms]">
              Connect with <br /> <span className="text-brand-orange italic">Our Consultants</span>
            </h1>
            <p className="text-brand-silver/50 max-w-2xl text-xl italic animate-fade-up [animation-delay:400ms]">
              Our professional team is available to assist you with inquiries, appointments, and personal vehicle consultations.
            </p>
          </div>
        </section>

        {/* CONTACT GRID */}
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-1 space-y-16 reveal">
              <div>
                <h3 className="text-brand-orange font-bold uppercase tracking-[0.3em] text-[10px] mb-8 border-b border-brand-blue/50 pb-4">Contact Channels</h3>
                <div className="space-y-12">
                   <div className="group">
                     <span className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] block mb-2 font-black">Direct WhatsApp</span>
                     <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold text-2xl group-hover:text-brand-orange transition-colors duration-500 italic tracking-tighter">Instant Consultation</a>
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

            <div className="lg:col-span-2 reveal [transition-delay:200ms]">
               <div className="bg-brand-blue/10 p-12 md:p-16 rounded-sm border border-brand-blue/30 relative">
                  <div className="absolute top-0 right-0 p-8">
                     <span className="text-brand-orange font-black text-6xl opacity-5 italic select-none">RS</span>
                  </div>
                  <h3 className="text-brand-white font-bold uppercase tracking-[0.3em] text-[10px] mb-12 border-b border-brand-blue/50 pb-4">Secure Message</h3>
                  <form className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black">Full Name</label>
                        <input type="text" className="w-full bg-brand-navy border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10" placeholder="e.g. Alexander Smith" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black">Electronic Mail</label>
                        <input type="email" className="w-full bg-brand-navy border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10" placeholder="e.g. alex@company.com" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black">Vehicle of Interest (Optional)</label>
                      <input type="text" className="w-full bg-brand-navy border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 placeholder:text-brand-silver/10" placeholder="e.g. Range Rover Autobiography" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-brand-silver/30 text-[8px] uppercase tracking-[0.4em] font-black">Message Content</label>
                      <textarea rows={6} className="w-full bg-brand-navy border-b border-brand-blue/50 rounded-none px-0 py-4 text-brand-silver outline-none focus:border-brand-orange transition-all duration-500 resize-none placeholder:text-brand-silver/10" placeholder="How can our consultants assist you today?"></textarea>
                    </div>
                    <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-black py-6 rounded-sm transition-all duration-500 shadow-2xl shadow-orange-500/20 uppercase text-[10px] tracking-[0.4em]">
                      Send Secure Message
                    </button>
                  </form>
               </div>
            </div>
          </div>
        </section>

        {/* MAP PLACEHOLDER */}
        <section className="py-32 reveal">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-[500px] bg-brand-blue/20 rounded-sm border border-brand-blue/50 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-[2s] opacity-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="Map Area" />
                 </div>
                 <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-full border border-brand-orange flex items-center justify-center mb-8 mx-auto animate-pulse">
                       <div className="w-4 h-4 rounded-full bg-brand-orange" />
                    </div>
                    <h4 className="text-brand-white font-bold text-2xl tracking-tighter mb-4">Visit Our Showroom</h4>
                    <p className="text-brand-silver/40 text-[10px] uppercase tracking-[0.4em] font-black">United Kingdom • By Appointment Only</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
