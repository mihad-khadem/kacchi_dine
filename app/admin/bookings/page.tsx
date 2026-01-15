// app/admin/bookings/page.tsx

"use client";

import React, { useState } from "react";
import { mockRecentBookings } from "@/lib/mockData/admin";

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const allBookings = mockRecentBookings;
  const totalBookings = allBookings.length;
  const confirmedBookings = allBookings.filter(
    (b) => b.status === "Confirmed"
  ).length;
  const totalGuests = allBookings.reduce((sum, b) => sum + b.guests, 0);
  const avgGuestsPerBooking = Math.round(totalGuests / totalBookings);

  const filteredBookings =
    statusFilter === "All"
      ? allBookings
      : allBookings.filter((b) => b.status === statusFilter);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Booking Management 📅
        </h1>
        <p className="text-gray-600">Manage table reservations and bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalBookings}
          </p>
          <p className="text-xs text-gray-500 mt-2">All bookings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Confirmed</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {confirmedBookings}
          </p>
          <p className="text-xs text-gray-500 mt-2">Confirmed bookings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">Total Guests</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalGuests}</p>
          <p className="text-xs text-gray-500 mt-2">Expected guests</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
          <p className="text-gray-600 text-sm font-medium">
            Avg Guests/Booking
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {avgGuestsPerBooking}
          </p>
          <p className="text-xs text-gray-500 mt-2">Per reservation</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search bookings..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>All</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Customer
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Guests
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Branch
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {booking.customerName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {booking.date} @ {booking.time}
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-gray-800">
                    {booking.guests}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{booking.branch}</td>
                  <td className="px-6 py-4">
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
    </div>
  );
}
