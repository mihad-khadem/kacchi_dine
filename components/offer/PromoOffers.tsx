"use client";
import { BadgePercent, Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { useActiveOffers } from "@/redux/hooks";

export const PromoOffers = () => {
  const offers = useActiveOffers();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow">
        <div className="flex items-center gap-2 mb-4">
          <BadgePercent className="text-yellow-400" />
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Promo Codes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              onClick={() => handleCopy(offer.code)}
              className="border border-dashed border-yellow-500 rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-yellow-50 dark:hover:bg-neutral-700 transition"
            >
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-yellow-400">
                  {offer.code}
                </p>

                {copied === offer.code ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-yellow-400 opacity-70" />
                )}
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {offer.discountPercent
                  ? `${offer.discountPercent}% OFF`
                  : `${offer.discountFixed}৳ OFF`}
              </p>
              {offer.minOrder && (
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Min ৳{offer.minOrder}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
