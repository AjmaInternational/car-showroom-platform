import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "R.S Lanka Motors | Premium Used Cars UK",
  description: "Trusted UK Car Dealer – Quality Used or Brand New Vehicles. Premium Cars for Sale in the UK.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-brand-navy text-brand-silver">
        {children}
      </body>
    </html>
  )
}
