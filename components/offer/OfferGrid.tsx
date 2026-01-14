"use client";

import AppCard from "@/components/ui/AppCard";
import { HeadingFont } from "../ui/headingFont";

const offers = [
  {
    id: 1,
    title: "Buy 1 Get 1 Kacchi",
    desc: "Order any large Kacchi Biryani and get another one absolutely free.",
    image: "/kacchi_logo.jpeg",
    tag: "TRENDING",
  },
  {
    id: 2,
    title: "20% Off on First Order",
    desc: "New customer? Enjoy 20% discount on your first Kacchi Dine order.",
    image: "/kacchi_logo.jpeg",
    tag: "NEW USER",
  },
  {
    id: 3,
    title: "Family Combo @ 999৳",
    desc: "4 Kacchi, 2 Borhani & Salad – perfect for family dinners.",
    image: "/kacchi_logo.jpeg",
    tag: "BEST DEAL",
  },
  {
    id: 4,
    title: "Late Night Special",
    desc: "Flat 15% off from 10 PM – 12 AM.",
    image: "/kacchi_logo.jpeg",
    tag: "LIMITED",
  },
];

export default function OffersGrid() {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-10">
        <HeadingFont text="Exclusive Offers Just for You" />
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Save more, eat better. Grab our trending deals before they’re gone.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <AppCard
            key={offer.id}
            title={offer.title}
            description={offer.desc}
            image={offer.image}
            badge={offer.tag}
            footer={
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg text-sm font-semibold">
                Order Now
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}
