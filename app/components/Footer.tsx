import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-brand-blue border-t border-brand-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-bold tracking-tighter text-brand-silver">
            R.S LANKA <span className="text-brand-orange">MOTORS</span>
          </Link>
          <p className="text-brand-grey text-sm leading-relaxed">
            Premium used and brand new vehicles in the UK. Trusted dealership with a focus on quality and transparency.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-brand-silver uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-brand-grey text-sm">
            <li><Link href="/" className="hover:text-brand-orange">Home</Link></li>
            <li><Link href="/cars" className="hover:text-brand-orange">Inventory</Link></li>
            <li><Link href="/about" className="hover:text-brand-orange">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-brand-silver uppercase tracking-widest text-sm">Customer Support</h4>
          <ul className="space-y-4 text-brand-grey text-sm">
            <li><Link href="/contact" className="hover:text-brand-orange">WhatsApp Support</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange">Book a Test Drive</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange">Financing Options</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-brand-silver uppercase tracking-widest text-sm">Contact Us</h4>
          <p className="text-brand-grey text-sm">United Kingdom</p>
          <p className="text-brand-grey text-sm mt-2 font-bold text-brand-silver italic">Quality you can trust.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-brand-navy/30 text-center">
        <p className="text-brand-grey text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} R.S Lanka Motors. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
