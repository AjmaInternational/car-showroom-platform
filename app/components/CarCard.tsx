import Link from "next/link"

type CarCardProps = {
  car: {
    id: string
    title: string
    brand: string
    model: string
    price: number
    year: number
    mileage: number
    image_urls: string[] | null
    status: string
    location: string
  }
}

export default function CarCard({ car }: CarCardProps) {
  const mainImage = car.image_urls?.[0] || "/placeholder-car.jpg"

  return (
    <div className="group relative bg-brand-navy border border-brand-blue/30 rounded-sm overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(245,124,0,0.1)] hover:-translate-y-2">
      <Link href={`/cars/${car.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={`${car.year} ${car.brand} ${car.model}`}
            className="object-cover w-full h-full transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute top-6 left-6 z-20">
            <span className="bg-brand-orange/90 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-sm">
              {car.status === 'available' ? 'In Showroom' : car.status}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
             <span className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em]">{car.brand}</span>
             <span className="text-brand-silver font-black text-xl italic tracking-tighter group-hover:text-brand-orange transition-colors duration-500">
               £{(car.price ?? 0).toLocaleString()}
             </span>
          </div>
          <h3 className="text-brand-white font-bold text-2xl tracking-tight leading-none group-hover:tracking-wide transition-all duration-500">
            {car.model}
          </h3>
          <p className="text-brand-silver/30 text-[10px] mt-2 uppercase tracking-widest font-medium">Showroom Collection • {car.year}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 py-6 border-t border-brand-blue/30">
          <div className="space-y-1">
            <span className="text-brand-silver/30 block uppercase tracking-[0.2em] text-[8px] font-bold">Mileage</span>
            <span className="text-brand-silver text-xs font-bold tracking-tight">{(car.mileage ?? 0).toLocaleString()} miles</span>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-brand-silver/30 block uppercase tracking-[0.2em] text-[8px] font-bold">Transmission</span>
            <span className="text-brand-silver text-xs font-bold tracking-tight">Automatic</span>
          </div>
        </div>

        <Link 
          href={`/cars/${car.id}`}
          className="mt-4 block w-full text-center border border-brand-silver/10 text-brand-silver hover:bg-brand-orange hover:border-brand-orange hover:text-white py-4 rounded-sm font-bold text-[10px] transition-all duration-500 uppercase tracking-[0.3em]"
        >
          View Presentation
        </Link>
      </div>
    </div>
  )
}
