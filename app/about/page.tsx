import Header from "../components/Header"
import Footer from "../components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | R.S Lanka Motors - Trusted UK Car Dealer",
  description: "Learn more about R.S Lanka Motors, your trusted partner for premium used and brand new cars in the UK. Experience, reliability, and quality guaranteed.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-brand-navy">
        {/* HERO */}
        <section className="bg-brand-blue py-24 border-b border-brand-navy/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-silver mb-6 tracking-tighter">
              A Legacy of <span className="text-brand-orange">Automotive Excellence</span>
            </h1>
            <p className="text-brand-grey max-w-3xl mx-auto text-lg leading-relaxed">
              Serving the UK automotive market with passion, integrity, and an unwavering commitment to quality.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-sm md:text-base leading-relaxed">
            <div className="space-y-6 text-brand-grey">
              <h2 className="text-3xl font-bold text-brand-silver tracking-tight">Trusted UK Dealership</h2>
              <p>
                At R.S Lanka Motors, we believe that buying a car should be an experience marked by trust and transparency. Based in the United Kingdom, we have built our reputation on providing high-quality used and brand new vehicles to discerning buyers across the country.
              </p>
              <p>
                Our team of automotive experts hand-selects every vehicle in our inventory. Each car undergoes a rigorous inspection process to ensure it meets our high standards for safety, performance, and aesthetic appeal.
              </p>
              <div className="pt-4">
                 <div className="bg-brand-blue p-6 rounded-xl border-l-4 border-brand-orange italic">
                   &quot;Our mission is simple: to provide UK car buyers with the most reliable and premium automotive experience in the market.&quot;
                 </div>
              </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-brand-orange blur-3xl opacity-10 rounded-full" />
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                 src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000"
                 className="relative z-10 rounded-2xl shadow-2xl border border-brand-blue grayscale"
                 alt="R.S Lanka Motors Office UK"
               />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-brand-blue py-20 border-y border-brand-navy/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Years Experience", value: "10+" },
                { label: "Cars Sold", value: "5000+" },
                { label: "Happy Customers", value: "100%" },
                { label: "UK Locations", value: "Multiple" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-brand-orange mb-2">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-brand-grey font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
