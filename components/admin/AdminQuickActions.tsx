import React from "react";
import Link from "next/link";
export const AdminQuickActions = () => {
  return (
    <section className="my-8">
      {/* Quick Actions */}
      <div className="mt-8 bg-yellow-50 rounded-lg shadow p-6 border border-yellow-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/foods"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition text-center"
          >
            Add Food Item
          </Link>
          <Link
            href="/admin/offers"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition text-center"
          >
            Create Offer
          </Link>
          <Link
            href="/admin/branches"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition text-center"
          >
            Add Branch
          </Link>
          <Link
            href="/admin/bookings"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition text-center"
          >
            View Bookings
          </Link>
        </div>
      </div>
    </section>
  );
};
