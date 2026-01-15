// app/admin/users/page.tsx

"use client";

import React, { useState } from "react";
import { mockUserStats } from "@/lib/mockData/admin";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Mock user data (replace with API)
  const mockUsers = [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@email.com",
      role: "Customer",
      orders: 12,
      spent: 5400,
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@email.com",
      role: "Customer",
      orders: 8,
      spent: 3200,
    },
    {
      id: 3,
      name: "Hassan Muhammad",
      email: "hassan@email.com",
      role: "Admin",
      orders: 0,
      spent: 0,
    },
    {
      id: 4,
      name: "Fatima Hassan",
      email: "fatima@email.com",
      role: "Customer",
      orders: 15,
      spent: 7890,
    },
    {
      id: 5,
      name: "Ali Raza",
      email: "ali@email.com",
      role: "Customer",
      orders: 5,
      spent: 1800,
    },
  ];

  // Filter users
  const filteredUsers = mockUsers.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "All" || user.role === roleFilter)
  );

  const activeUsers = mockUserStats.activeUsers;
  const newUsersThisMonth = mockUserStats.newUsersThisMonth;
  const totalUsers = mockUserStats.totalUsers;
  const returnRate = Math.round(
    ((totalUsers - newUsersThisMonth) / totalUsers) * 100
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          User Management 👥
        </h1>
        <p className="text-gray-600">Monitor and manage customer accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalUsers}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{activeUsers}</p>
          <p className="text-xs text-gray-500 mt-2">Currently active</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">New This Month</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {newUsersThisMonth}
          </p>
          <p className="text-xs text-gray-500 mt-2">New registrations</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
          <p className="text-gray-600 text-sm font-medium">Return Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{returnRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Returning customers</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>All</option>
              <option>Customer</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Orders
                </th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-800">
                      {user.orders}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">
                      Rs. {user.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm mr-3">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-semibold text-sm">
                        Block
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found
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
