import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-brand-blue pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <img 
                src="/images/logo.png" 
                alt="R.S Lanka Motors Logo" 
                className="h-20 md:h-24 w-auto mb-4 object-contain" 
              />
              <div className="flex items-center space-x-3">
                <span className="text-xl font-black tracking-tighter italic text-brand-silver">
                  R.S LANKA <span className="text-brand-orange">MOTORS</span>
                </span>
              </div>
            </Link>
            <p className="text-brand-grey text-sm leading-relaxed mb-8 max-w-xs">
              A premium automotive showroom experience in the UK. Dedicated to presenting the finest selection of quality vehicles with professional service.
            </p>
          </div>

          <div>
            <h4 className="text-brand-silver font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-brand-grey">
              <li><Link href="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link href="/cars" className="hover:text-brand-orange transition-colors">Showroom Collection</Link></li>
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">Our Vision</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-silver font-bold uppercase tracking-widest text-xs mb-8">Showroom Hours</h4>
            <ul className="space-y-4 text-sm text-brand-grey">
              <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-brand-silver">09:00 - 18:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span className="text-brand-silver">10:00 - 16:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span className="text-brand-silver">By Appointment</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-silver font-bold uppercase tracking-widest text-xs mb-8">Contact Info</h4>
            <ul className="space-y-4 text-sm text-brand-grey">
              <li className="flex items-start space-x-3">
                <span className="text-brand-orange">L:</span>
                <span className="text-brand-silver">United Kingdom</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-brand-orange">E:</span>
                <a href="mailto:info@rslankamotors.com" className="text-brand-silver hover:text-brand-orange transition-colors">info@rslankamotors.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-brand-orange">W:</span>
                <span className="text-brand-silver font-bold">+44 790 314 1787</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-blue flex flex-col md:row justify-between items-center gap-6">
          <p className="text-brand-grey text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} R.S Lanka Motors. All Rights Reserved. Premium Automotive Showroom UK.
          </p>
          <div className="flex space-x-6 text-[10px] uppercase tracking-[0.2em] text-brand-grey">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
