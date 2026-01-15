// app/admin/branches/page.tsx

"use client";

import React, { useState } from "react";
import { useBranches } from "@/redux/hooks";

export default function AdminBranchesPage() {
  const branches = useBranches();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter branches
  const filteredBranches = branches.filter(
    (branch) =>
      branch.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate metrics
  const totalBranches = branches.length;
  const avgRating =
    branches.length > 0
      ? (
          branches.reduce((sum, b) => sum + (b.rating || 4.5), 0) /
          branches.length
        ).toFixed(1)
      : 0;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Branch Management 🏪
          </h1>
          <p className="text-gray-600">
            Manage all branch locations and operations
          </p>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition w-full md:w-auto">
          + Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Branches</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalBranches}
          </p>
          <p className="text-xs text-gray-500 mt-2">Across Pakistan</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <p className="text-gray-600 text-sm font-medium">Active Locations</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalBranches}
          </p>
          <p className="text-xs text-gray-500 mt-2">Operational</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <p className="text-gray-600 text-sm font-medium">Avg Rating</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {avgRating} ⭐
          </p>
          <p className="text-xs text-gray-500 mt-2">Customer satisfaction</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white border border-gray-200 rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {branch.name}
                  </h3>
                  <span className="text-yellow-500 font-bold">
                    {branch.rating || 4.5}⭐
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{branch.location}</p>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>📞 {branch.phone || "Not provided"}</p>
                  <p>⏰ {branch.hours || "10 AM - 11 PM"}</p>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No branches found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
