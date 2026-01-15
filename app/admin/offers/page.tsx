// app/admin/offers/page.tsx

"use client";

import React, { useState } from "react";
import { useOffers } from "@/redux/hooks";

export default function AdminOffersPage() {
  const offers = useOffers();
  const [filterActive, setFilterActive] = useState("All");

  // Filter offers
  const filteredOffers =
    filterActive === "All"
      ? offers
      : filterActive === "Active"
      ? offers.filter((o) => o.active)
      : offers.filter((o) => !o.active);

  // Calculate metrics
  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.active).length;
  const avgDiscount =
    offers.length > 0
      ? Math.round(
          offers.reduce((sum, o) => sum + (o.discountPercentage || 0), 0) /
            offers.length
        )
      : 0;
  const totalRedemptions = offers.reduce(
    (sum, o) => sum + (o.redeemCount || 0),
    0
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Offers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalOffers}</p>
          <p className="text-xs text-gray-500 mt-2">All promotions</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Active Offers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2\">
            {activeOffers}
          </p>
          <p className="text-xs text-gray-500 mt-2\">Currently running</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">Avg Discount</p>
          <p className="text-3xl font-bold text-gray-800 mt-2\">
            {avgDiscount}%
          </p>
          <p className="text-xs text-gray-500 mt-2\">Average reduction</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
          <p className="text-gray-600 text-sm font-medium">Total Redemptions</p>
          <p className="text-3xl font-bold text-gray-800 mt-2\">
            {totalRedemptions}
          </p>
          <p className="text-xs text-gray-500 mt-2\">Times used</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            {["All", "Active", "Inactive"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterActive(status)}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className={`border rounded-lg p-6 ${
                  offer.active
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
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
                    {offer.discountPercentage
                      ? `${offer.discountPercentage}% OFF`
                      : `Rs. ${offer.fixedDiscount}`}
                  </p>
                  <p>📦 Min Order: Rs. {offer.minOrderValue}</p>
                  <p>🔢 Used: {offer.redeemCount || 0} times</p>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition text-sm">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No offers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
