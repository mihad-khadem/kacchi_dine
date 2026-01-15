// app/admin/foods/page.tsx

"use client";

import React, { useState } from "react";
import { useMenuItems } from "@/redux/hooks";
import Link from "next/link";

export default function AdminFoodsPage() {
  const menuItems = useMenuItems();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get price
  const getPrice = (item: any) => {
    if (typeof item.prices === "number") return item.prices;
    if (typeof item.prices === "object") return item.prices?.one || 0;
    return 0;
  };

  // Calculate metrics
  const totalItems = menuItems.length;
  const categories = [...new Set(menuItems.map((item) => item.category))];
  const avgPrice =
    menuItems.length > 0
      ? Math.round(
          menuItems.reduce((sum, item) => sum + getPrice(item), 0) /
            menuItems.length
        )
      : 0;
  const totalValue = menuItems.reduce((sum, item) => sum + getPrice(item), 0);

  // Category breakdown
  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: menuItems.filter((item) => item.category === cat).length,
    totalPrice: menuItems
      .filter((item) => item.category === cat)
      .reduce((sum, item) => sum + getPrice(item), 0),
  }));

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Food Management 🍕
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your menu items and view analytics
          </p>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition w-full md:w-auto">
          + Add Food Item
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Items</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalItems}</p>
          <p className="text-xs text-gray-500 mt-2">In menu</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">Categories</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {categories.length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Unique types</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Avg Price</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {avgPrice}
          </p>
          <p className="text-xs text-gray-500 mt-2">Per item</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
          <p className="text-gray-600 text-sm font-medium">Total Value</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {totalValue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">Menu value</p>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Category Distribution
          </h2>
          <div className="space-y-4">
            {categoryStats.map((stat) => {
              const percentage = (stat.count / totalItems) * 100;
              return (
                <div key={stat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      {stat.name}
                    </span>
                    <span className="text-gray-600">{stat.count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Items by Price */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Premium Items
          </h2>
          <div className="space-y-3">
            {menuItems
              .sort((a, b) => getPrice(b) - getPrice(a))
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <p className="font-bold text-yellow-600 ml-2 shrink-0">
                    Rs. {getPrice(item)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Food Items List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">
                      Rs. {getPrice(item)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-semibold text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No foods found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
