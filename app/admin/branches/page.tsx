// app/admin/branches/page.tsx

"use client";

import React, { useState } from "react";
import { useBranches } from "@/redux/hooks";
import AppAlert from "@/components/ui/AppAlert";

export default function AdminBranchesPage() {
  const branches = useBranches();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter branches
  const filteredBranches = [...branches].filter(
    (branch) =>
      branch.Area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.BranchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate metrics
  const totalBranches = branches.length;
  const avgRating =
    branches.length > 0
      ? (
          [...branches].reduce((sum, b) => sum + 4.5, 0) / branches.length
        ).toFixed(1)
      : 0;

  const handleAddBranch = () => {
    setAlertMessage(
      "Branch has been added successfully! (Feature coming soon)"
    );
    setAlertOpen(true);
    setShowAddForm(false);
  };

  const handleEditBranch = (id: number) => {
    setEditingId(editingId === id.toString() ? null : id.toString());
  };

  const handleDeleteBranch = (id: number) => {
    setAlertMessage(`Branch ${id} has been deleted successfully!`);
    setAlertOpen(true);
    setEditingId(null);
  };

  const handleSaveBranch = (id: number) => {
    setAlertMessage(`Branch ${id} has been updated successfully!`);
    setAlertOpen(true);
    setEditingId(null);
  };

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
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition w-full md:w-auto"
        >
          {showAddForm ? "Cancel" : "+ Add Branch"}
        </button>
      </div>

      {/* Add Branch Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Add New Branch
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBranch();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Branch Name"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="text"
              placeholder="Hours (e.g., 10 AM - 11 PM)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg transition"
            >
              Add Branch
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <p className="text-gray-600 text-sm font-medium">Total Branches</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalBranches}
          </p>
          <p className="text-xs text-gray-500 mt-2">Across Bangladesh</p>
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
                    {branch.BranchName}
                  </h3>
                  <span className="text-yellow-500 font-bold">4.5⭐</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{branch.Area}</p>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>📞 {branch.phone || "Not provided"}</p>
                  <p>⏰ {branch.time || "10 AM - 11 PM"}</p>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleEditBranch(branch.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                  >
                    {editingId === branch.id.toString() ? "Cancel" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDeleteBranch(branch.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                  >
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

      {/* Alert */}
      <AppAlert
        open={alertOpen}
        title="Branch Management - Branch Deleted Successfully"
        message={alertMessage}
        duration={1500}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
