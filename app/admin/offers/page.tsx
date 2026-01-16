// app/admin/offers/page.tsx
"use client";

import React, { useState } from "react";
import { useOffers } from "@/redux/hooks";
import { StatCardCompo } from "@/components/admin/StatCardCompo";

export default function AdminOffersPage() {
  const offers = useOffers();

  const [filterActive, setFilterActive] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const filteredOffers =
    filterActive === "All"
      ? offers
      : filterActive === "Active"
      ? offers.filter((o) => o.active)
      : offers.filter((o) => !o.active);

  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.active).length;

  const avgDiscount =
    offers.length > 0
      ? Math.round(
          offers.reduce((sum, o) => sum + o.discountPercent, 0) / offers.length
        )
      : 0;

  const totalRedemptions = offers.reduce(
    (sum, o) => sum + (o.currentUses ?? 0),
    0
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Offers & Coupons 🎁
          </h1>
          <p className="text-gray-600">
            Manage promotional offers and discount codes
          </p>
        </div>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition w-full md:w-auto">
          + Create Offer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCardCompo
          title="Total Offers"
          value={totalOffers}
          color="yellow"
        />
        <StatCardCompo
          title="Active Offers"
          value={activeOffers}
          color="green"
        />
        <StatCardCompo
          title="Avg Discount"
          value={`${avgDiscount}%`}
          color="blue"
        />
        <StatCardCompo
          title="Total Redemptions"
          value={totalRedemptions}
          color="purple"
        />
      </div>

      {/* Offers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex gap-4">
          {["All", "Active", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setFilterActive(status as "All" | "Active" | "Inactive")
              }
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterActive === status
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {filteredOffers.length ? (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className={`border rounded-lg p-6 ${
                  offer.active
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {offer.code}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      offer.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {offer.active ? "🟢 Active" : "🔴 Inactive"}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{offer.description}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>
                    💰{" "}
                    {offer.discountFixed
                      ? `৳${offer.discountFixed} OFF`
                      : `${offer.discountPercent}% OFF`}
                  </p>
                  <p>📦 Min Order: ৳{offer.minOrder ?? 0}</p>
                  <p>🔢 Used: {offer.currentUses ?? 0} times</p>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No offers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
