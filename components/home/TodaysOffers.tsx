import Image from "next/image";
import Link from "next/link";
import { HeadingFont } from "../ui/headingFont";

const offers = [
  {
    id: 1,
    title: "Kacchi Biryani Combo",
    description: "Buy 2 Kacchi & get Borhani free",
    price: 850,
    oldPrice: 1000,
    image: "/kacchi_logo.jpeg",
    tag: "20% OFF",
  },
  {
    id: 2,
    title: "Family Feast",
    description: "4 Plates Kacchi + Drinks",
    price: 1650,
    oldPrice: 2000,
    image: "/kacchi_logo.jpeg",
    tag: "Hot Deal",
  },
  {
    id: 3,
    title: "Chicken Kacchi",
    description: "Limited time special",
    price: 350,
    oldPrice: 450,
    image: "/kacchi_logo.jpeg",
    tag: "Limited",
  },
];

export default function TodaysOffers() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <HeadingFont text=" Today’s Offers" animated />
        <Link
          href="/offers"
          className="text-yellow-500 font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-yellow-100"
          >
            <div className="relative h-52">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover"
              />

              {/* Offer Tag */}
              <span className="absolute top-3 left-3 bg-yellow-400 text-black text-sm px-3 py-1 rounded-full font-semibold shadow">
                {offer.tag}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
              <p className="text-gray-600 mt-1">{offer.description}</p>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-bold text-yellow-500">
                  ৳{offer.price}
                </span>
                <span className="text-gray-400 line-through">
                  ৳{offer.oldPrice}
                </span>
              </div>

              <Link
                href={`/order?offer=${offer.id}`}
                className="block text-center mt-5 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold transition shadow"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
