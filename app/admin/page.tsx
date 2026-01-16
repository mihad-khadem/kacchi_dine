"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useMenuItems,
  useBranches,
  useCartItems,
  useOffers,
  useAuthUser,
} from "@/redux/hooks";
import {
  mockRecentOrders,
  mockRecentBookings,
  mockUserStats,
  mockDashboardMetrics,
} from "@/lib/mockData/admin";

export default function AdminPage() {
  const menuItems = useMenuItems();
  const branches = useBranches();
  const cartItems = useCartItems();
  const offers = useOffers();
  const user = useAuthUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  const getPrice = (item: {
    prices?: { one?: number; three?: number; five?: number } | number;
  }) => {
    if (typeof item.prices === "number") return item.prices;
    if (typeof item.prices === "object") return item.prices?.one || 0;
    return 0;
  };

  const totalMenuItems = menuItems.length;
  const totalBranches = branches.length;
  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.active).length;

  const recentOrders = mockRecentOrders;
  const recentBookings = mockRecentBookings;
  const dashboardMetrics = mockDashboardMetrics;
  const userStats = mockUserStats;

  // Chart data for categories
  const categoryStats = [
    {
      name: "Kacchi",
      count: menuItems.filter((i) => i.category === "Kacchi").length,
    },
    {
      name: "Biryani",
      count: menuItems.filter((i) => i.category === "Biryani").length,
    },
    {
      name: "Tehari",
      count: menuItems.filter((i) => i.category === "Tehari").length,
    },
    {
      name: "Polao",
      count: menuItems.filter((i) => i.category === "Polao").length,
    },
  ];

  const totalItems = categoryStats.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || "Admin"}! 👋
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Foods</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalMenuItems}
              </p>
            </div>
            <div className="text-4xl text-yellow-400">🍕</div>
          </div>
          <Link
            href="/admin/foods"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            Manage Foods →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Branches</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalBranches}
              </p>
            </div>
            <div className="text-4xl">🏪</div>
          </div>
          <Link
            href="/admin/branches"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            Manage Branches →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Offers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {activeOffers}/{totalOffers}
              </p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>
          <Link
            href="/admin/offers"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            View Offers →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Carts</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {cartItems.length}
              </p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
          <Link
            href="/admin/orders"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            View Orders →
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ৳{dashboardMetrics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">📈 +12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ৳{dashboardMetrics.monthlyRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">✅ Active this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {userStats.totalUsers.toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            +{userStats.newUsersThisMonth} new this month
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {dashboardMetrics.conversionRate}%
          </p>
          <p className="text-xs text-orange-600 mt-2">
            {userStats.activeUsers}/{userStats.totalUsers} active
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Distribution Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Category Distribution (Bar Chart)
          </h2>
          <div className="space-y-4">
            {categoryStats.map((stat) => {
              const percentage =
                totalItems > 0 ? (stat.count / totalItems) * 100 : 0;
              return (
                <div key={stat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      {stat.name}
                    </span>
                    <span className="text-gray-600">
                      {stat.count} items ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-yellow-400 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Sales by Category (Pie Chart)
          </h2>
          <div className="flex items-center justify-center">
            <div className="space-y-3">
              {categoryStats.map((stat, idx) => {
                const colors = [
                  "bg-yellow-400",
                  "bg-green-400",
                  "bg-blue-400",
                  "bg-red-400",
                ];
                const percentage =
                  totalItems > 0 ? (stat.count / totalItems) * 100 : 0;
                return (
                  <div key={stat.name} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        colors[idx % colors.length]
                      }`}
                    ></div>
                    <span className="text-gray-700">
                      {stat.name}: {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders
                  .slice(0, 5)
                  .map((order: (typeof mockRecentOrders)[number]) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {order.customer}
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800">
                        ৳{order.total}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            setEditingId(
                              editingId === order.id ? null : order.id
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                        >
                          {editingId === order.id ? "Cancel" : "View"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Items by Price */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top Premium Items
          </h2>
          <div className="space-y-3">
            {[...menuItems]
              ?.sort((a, b) => getPrice(b) - getPrice(a))
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <p className="font-bold text-yellow-600 ml-2 shrink-0">
                    ৳{getPrice(item)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Branch
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Guests
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentBookings
                .slice(0, 5)
                .map((booking: (typeof mockRecentBookings)[number]) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {booking.customerName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {booking.branch}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{booking.date}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {booking.guests}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          alert(`Booking ${booking.id} action triggered`)
                        }
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
