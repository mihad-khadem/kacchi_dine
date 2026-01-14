import { BadgePercent } from "lucide-react";
import React from "react";
const promoCodes = [
  { code: "KACCHI20", desc: "20% OFF on orders above 800৳" },
  { code: "DINENOW", desc: "Flat 100৳ off" },
  { code: "FAMILY10", desc: "10% OFF on combo meals" },
];

export const PromoOffers = () => {
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
          {promoCodes.map((promo, index) => (
            <div
              key={index}
              className="border border-dashed border-yellow-500 rounded-lg p-4 flex flex-col items-center text-center"
            >
              <p className="text-lg font-bold text-yellow-400">{promo.code}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {promo.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
