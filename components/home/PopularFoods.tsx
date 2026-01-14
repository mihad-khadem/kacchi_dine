import Image from "next/image";
import Link from "next/link";
import { HeadingFont } from "../ui/headingFont";

const foods = [
  {
    id: 1,
    name: "Classic Kacchi Biryani",
    price: 450,
    image: "/kacchi_logo.jpeg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Beef Kacchi",
    price: 520,
    image: "/kacchi_logo.jpeg",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Chicken Kacchi",
    price: 400,
    image: "/kacchi_logo.jpeg",
    tag: "Trending",
  },
  {
    id: 4,
    name: "Borhani",
    price: 120,
    image: "/kacchi_logo.jpeg",
    tag: "Must Try",
  },
];

export default function PopularFoods() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <HeadingFont text="Popular Foods" />
        <Link
          href="/menu"
          className="text-yellow-500 font-semibold hover:underline"
        >
          View Full Menu
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-yellow-100"
          >
            <div className="relative h-44">
              <Image
                src={food.image}
                alt={food.name}
                fill
                className="object-cover"
              />

              <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold shadow">
                {food.tag}
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>

              <p className="text-yellow-500 font-bold text-xl mt-2">
                ৳{food.price}
              </p>

              <Link
                href={`/order?item=${food.id}`}
                className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition shadow"
              >
                Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
