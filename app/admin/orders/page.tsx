// app/admin/orders/page.tsx

"use client";

import React, { useState } from "react";
import { mockRecentOrders } from "@/lib/mockData/admin";

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  // Calculate metrics
  const allOrders = mockRecentOrders;
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  // Status breakdown
  const statusBreakdown = {
    Delivered: allOrders.filter((o) => o.status === "Delivered").length,
    Processing: allOrders.filter((o) => o.status === "Processing").length,
    Pending: allOrders.filter((o) => o.status === "Pending").length,
    Cancelled: allOrders.filter((o) => o.status === "Cancelled").length,
  };

  // Filter orders
  const filteredOrders =
    statusFilter === "All"
      ? allOrders
      : allOrders.filter((order) => order.status === statusFilter);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Order Management 📦
        </h1>
        <p className="text-gray-600">Track and manage all customer orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalOrders}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">From orders</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">Avg Order Value</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rs. {avgOrderValue}
          </p>
          <p className="text-xs text-gray-500 mt-2">Per order</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
          <p className="text-gray-600 text-sm font-medium">Delivery Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalOrders > 0
              ? Math.round((statusBreakdown.Delivered / totalOrders) * 100)
              : 0}
            %
          </p>
          <p className="text-xs text-gray-500 mt-2">Delivered</p>
        </div>
      </div>

      {/* Status Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Order Status Breakdown
          </h2>
          <div className="space-y-6">
            {Object.entries(statusBreakdown).map(([status, count]) => {
              const percentage =
                totalOrders > 0 ? (count / totalOrders) * 100 : 0;
              const colors = {
                Delivered: "bg-green-400",
                Processing: "bg-blue-400",
                Pending: "bg-yellow-400",
                Cancelled: "bg-red-400",
              };
              return (
                <div key={status}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      {status}
                    </span>
                    <span className="text-gray-600">{count} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${
                        colors[status as keyof typeof colors]
                      } h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Stats</h2>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-semibold">
                ✓ Delivered
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {statusBreakdown.Delivered}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-semibold">
                ⏳ Processing
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {statusBreakdown.Processing}
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 font-semibold">
                ⏱️ Pending
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {statusBreakdown.Pending}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>All</option>
              <option>Delivered</option>
              <option>Processing</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-800">
                    Rs. {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      View
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
