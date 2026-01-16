"use client";

import React from "react";
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
  mockPopularCategories,
} from "@/lib/mockData/admin";
import Link from "next/link";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";

export default function AdminDashboardPage() {
  const menuItems = useMenuItems();
  const branches = useBranches();
  const cartItems = useCartItems();
  const offers = useOffers();
  const user = useAuthUser();

  // Helper function to get price from MenuItem
  const getPrice = (item: any) => {
    if (typeof item.prices === "number") return item.prices;
    if (typeof item.prices === "object") return item.prices?.one || 0;
    return 0;
  };

  // Redux data - Real data from store
  const totalMenuItems = menuItems.length;
  const totalBranches = branches.length;
  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.active).length;

  // Mock data - Replace with API calls after backend development
  const recentOrders = mockRecentOrders;
  const recentBookings = mockRecentBookings;
  const dashboardMetrics = mockDashboardMetrics;
  const userStats = mockUserStats;

  // Get top menu items from Redux
  const topMenuItems = menuItems.slice(0, 5);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || "Admin"}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Menu Items */}
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
            View Foods →
          </Link>
        </div>

        {/* Total Branches */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
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
            View Branches →
          </Link>
        </div>

        {/* Total Offers */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
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

        {/* Total Cart Items */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
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

      {/* Key Metrics Section - Replace with API after backend */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {dashboardMetrics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">📈 +12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {dashboardMetrics.monthlyRevenue.toLocaleString()}
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
      {/* Quick Actions Section */}
      <div className="mt-8">
        <AdminQuickActions />
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Rs. {order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Secondary Grid - Bookings & Menu Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Bookings - Replace with API after backend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
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
                    Booking ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Guests
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {booking.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {booking.customerName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {booking.date} @ {booking.time}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {booking.guests}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Menu Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Popular Foods</h2>
            <Link
              href="/admin/foods"
              className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {topMenuItems.length > 0 ? (
              topMenuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rs. {getPrice(item)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No menu items yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
