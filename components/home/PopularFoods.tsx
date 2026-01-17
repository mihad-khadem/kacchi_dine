"use client";

import Image from "next/image";
import Link from "next/link";
import { HeadingFont } from "../ui/headingFont";
import { useMenuItems } from "@/redux/hooks";
import { getDisplayPrice } from "@/lib/helpers/helper";

export default function PopularFoods() {
  const menuItems = useMenuItems();

  // Get top 4 popular items (slice to show 4 items)
  const popularFoods = menuItems.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <HeadingFont text="Popular Foods" />
        <Link
          href="/menu"
          className="text-yellow-500 font-semibold hover:underline"
        >
          View Full Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-yellow-100"
          >
            <div className="relative h-44 sm:h-48 lg:h-44">
              <Image
                src={food.image}
                alt={food.name}
                fill
                className="object-cover"
              />

              <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold shadow">
                Popular
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {food.name}
              </h3>

              <p className="text-yellow-500 font-bold text-xl mt-2">
                ৳{getDisplayPrice(food.prices)}
              </p>

              <Link
                href={`/menu/${food.slug}`}
                className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition shadow"
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
