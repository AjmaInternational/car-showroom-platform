import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-navy/90 backdrop-blur-md border-b border-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-brand-silver">
              R.S LANKA <span className="text-brand-orange">MOTORS</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <Link href="/cars" className="hover:text-brand-orange transition-colors">Cars</Link>
            <Link href="/about" className="hover:text-brand-orange transition-colors">About</Link>
            <Link href="/contact" className="hover:text-brand-orange transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/cars"
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold transition-all shadow-lg hover:shadow-orange-500/20"
            >
              Inventory
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
