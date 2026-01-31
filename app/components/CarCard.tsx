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
    <div className="group bg-brand-blue rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-brand-navy/20">
      <Link href={`/cars/${car.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-navy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={`${car.year} ${car.brand} ${car.model} UK`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              {car.status}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="bg-brand-navy/80 backdrop-blur-md text-brand-silver text-lg font-bold px-3 py-1 rounded border border-brand-blue">
              £{car.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-brand-silver font-bold text-lg leading-tight group-hover:text-brand-orange transition-colors">
              {car.brand} {car.model}
            </h3>
            <p className="text-brand-grey text-xs mt-1 uppercase tracking-wider">{car.year} • {car.location}</p>
          </div>
        </div>

        <p className="text-brand-grey text-sm line-clamp-1 mb-4">
          {car.title}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-navy/30">
          <div className="text-xs">
            <span className="text-brand-grey block uppercase tracking-tighter mb-1">Mileage</span>
            <span className="text-brand-silver font-medium">{car.mileage.toLocaleString()} miles</span>
          </div>
          <div className="text-xs text-right">
            <span className="text-brand-grey block uppercase tracking-tighter mb-1">Transmission</span>
            <span className="text-brand-silver font-medium">Automatic</span>
          </div>
        </div>

        <Link
          href={`/cars/${car.id}`}
          className="mt-6 block w-full text-center border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white py-3 rounded font-bold text-sm transition-all uppercase tracking-widest"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
