import Header from "../components/Header"
import Footer from "../components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | R.S Lanka Motors - UK Car Dealership",
  description: "Get in touch with R.S Lanka Motors for any inquiries regarding used or brand new cars in the UK. Contact us via phone, WhatsApp, or our contact form.",
}

export default function ContactPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "R.S Lanka Motors",
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "UK"
    },
    "url": "https://rslankamotors.com"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Header />

      <main className="flex-grow bg-brand-navy">
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-silver tracking-tighter mb-6">
              Contact <span className="text-brand-orange">R.S Lanka Motors</span>
            </h1>
            <p className="text-brand-grey max-w-2xl mx-auto italic">
              Our team is ready to assist you with your next car purchase. Reach out to us for any questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-8">
              <div className="bg-brand-blue p-8 rounded-2xl border border-brand-silver/5 shadow-xl">
                 <h3 className="text-brand-silver font-bold uppercase tracking-widest text-sm mb-6 border-b border-brand-navy pb-4">Contact Details</h3>
                 <div className="space-y-6">
                   <div>
                     <span className="text-brand-grey text-[10px] uppercase tracking-widest block mb-1">WhatsApp</span>
                     <a href="#" className="text-brand-silver font-bold text-lg hover:text-brand-orange transition-colors italic tracking-tighter">Click to Chat</a>
                   </div>
                   <div>
                     <span className="text-brand-grey text-[10px] uppercase tracking-widest block mb-1">Email</span>
                     <p className="text-brand-silver font-bold text-lg italic tracking-tighter">info@rslankamotors.com</p>
                   </div>
                   <div>
                     <span className="text-brand-grey text-[10px] uppercase tracking-widest block mb-1">Location</span>
                     <p className="text-brand-silver font-bold italic tracking-tighter">United Kingdom</p>
                   </div>
                 </div>
              </div>

              <div className="bg-brand-orange/10 p-8 rounded-2xl border border-brand-orange/20 shadow-xl">
                 <h3 className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">Opening Hours</h3>
                 <div className="space-y-3 text-brand-silver text-sm font-medium italic tracking-tighter">
                    <p className="flex justify-between"><span>Mon - Fri:</span> <span>09:00 - 18:00</span></p>
                    <p className="flex justify-between"><span>Saturday:</span> <span>10:00 - 16:00</span></p>
                    <p className="flex justify-between text-brand-grey"><span>Sunday:</span> <span>By Appointment</span></p>
                 </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-brand-blue p-8 md:p-12 rounded-2xl border border-brand-silver/5 shadow-xl">
               <h3 className="text-brand-silver font-bold uppercase tracking-widest text-sm mb-8 border-b border-brand-navy pb-4 italic tracking-tighter">Send us a message</h3>
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-brand-grey text-[10px] uppercase tracking-widest font-bold">Your Name</label>
                     <input type="text" className="w-full bg-brand-navy border border-brand-silver/10 rounded-lg px-4 py-3 text-brand-silver outline-none focus:border-brand-orange transition-all" placeholder="John Doe" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-brand-grey text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                     <input type="email" className="w-full bg-brand-navy border border-brand-silver/10 rounded-lg px-4 py-3 text-brand-silver outline-none focus:border-brand-orange transition-all" placeholder="john@example.com" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-brand-grey text-[10px] uppercase tracking-widest font-bold">Subject</label>
                   <input type="text" className="w-full bg-brand-navy border border-brand-silver/10 rounded-lg px-4 py-3 text-brand-silver outline-none focus:border-brand-orange transition-all" placeholder="Inquiry about BMW 3 Series" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-brand-grey text-[10px] uppercase tracking-widest font-bold">Message</label>
                   <textarea rows={5} className="w-full bg-brand-navy border border-brand-silver/10 rounded-lg px-4 py-3 text-brand-silver outline-none focus:border-brand-orange transition-all resize-none" placeholder="How can we help you?"></textarea>
                 </div>
                 <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 uppercase text-xs tracking-[0.3em]">
                   Send Message
                 </button>
               </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
