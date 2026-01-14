"use client";
import { BadgePercent, Copy, Check } from "lucide-react";
import React, { useState } from "react";

const promoCodes = [
  { code: "KACCHI20", desc: "20% OFF on orders above 800৳" },
  { code: "DINENOW", desc: "Flat 100৳ off" },
  { code: "FAMILY10", desc: "10% OFF on combo meals" },
];

export const PromoOffers = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = async (code: any) => {
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
          {promoCodes.map((promo, index) => (
            <div
              key={index}
              onClick={() => handleCopy(promo.code)}
              className="border border-dashed border-yellow-500 rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-yellow-50 dark:hover:bg-neutral-700 transition"
            >
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-yellow-400">
                  {promo.code}
                </p>

                {copied === promo.code ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-yellow-400 opacity-70" />
                )}
              </div>

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
