import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Metadata } from "next"
import FloatingWhatsApp from "./components/FloatingWhatsApp"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "R.S Lanka Motors | Premium Automotive Showroom UK",
  description: "Experience excellence at R.S Lanka Motors, the UK's premier automotive showroom. Discover our curated collection of quality vehicles and experience professional showroom service.",
  keywords: ["car showroom UK", "premium vehicles UK", "automotive showroom", "quality cars UK", "R.S Lanka Motors"],
  openGraph: {
    title: "R.S Lanka Motors | Premium Automotive Showroom UK",
    description: "Experience excellence at R.S Lanka Motors. Discover our curated collection of quality vehicles.",
    type: "website",
    locale: "en_GB",
    url: "https://rslankamotors.com",
    siteName: "R.S Lanka Motors",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.S Lanka Motors | Premium Automotive Showroom UK",
    description: "Experience excellence at R.S Lanka Motors. Discover our curated collection of quality vehicles.",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased bg-brand-navy text-brand-silver font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
