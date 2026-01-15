"use client";

import { HeadingFont } from "../ui/headingFont";
import { useActiveOffers } from "@/redux/hooks";
import Link from "next/link";

export default function OffersGrid() {
  const offers = useActiveOffers();

  return (
    <div className="py-8">
      <div className="mb-10">
        <HeadingFont text="Exclusive Offers Just for You" />
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Save more, eat better. Grab our trending deals before they’re gone.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-yellow-100"
          >
            <div className="relative h-40 bg-yellow-100 flex items-center justify-center">
              <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                {offer.tag}
              </span>
              <span className="text-4xl font-bold text-yellow-600">
                {offer.discountPercent || offer.discountFixed}
                {offer.discountPercent ? "%" : "৳"}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

              {offer.minOrder && (
                <p className="text-xs text-gray-500 mb-3">
                  Min order: ৳{offer.minOrder}
                </p>
              )}

              <Link
                href="/menu"
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg text-sm font-semibold transition text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
