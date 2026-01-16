"use client";

import Image from "next/image";
import Link from "next/link";
import { HeadingFont } from "../ui/headingFont";
import { useMenuItems } from "@/redux/hooks";

export default function PopularFoods() {
  const menuItems = useMenuItems();

  // Get top 4 popular items (slice to show 4 items)
  const popularFoods = menuItems.slice(0, 4);
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
        {popularFoods.map((food) => (
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
                Popular
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>

              <p className="text-yellow-500 font-bold text-xl mt-2">
                ৳
                {food.prices?.one ||
                  food.prices?.three ||
                  food.prices?.five ||
                  0}
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
