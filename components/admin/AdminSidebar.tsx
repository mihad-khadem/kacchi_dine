"use client";
"use client";

import Link from "next/link";
import { useAuthRole } from "@/redux/hooks";

export default function AdminSidebar() {
  const role = useAuthRole();

  if (role !== "admin") {
    return (
      <aside className="w-64 bg-red-50 shadow-md h-screen sticky top-0 p-6 flex flex-col gap-4">
        <div className="text-xl font-bold mb-6 text-red-600">
          ⚠️ Admin Access Denied
        </div>
        <Link
          href="/"
          className="text-red-700 hover:text-red-900 font-semibold"
        >
          Return to Home
        </Link>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 p-6 flex flex-col gap-4">
      <div className="text-xl font-bold mb-6">🔧 Admin Panel</div>
      <Link
        href="/admin/dashboard"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/foods"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Foods
      </Link>
      <Link
        href="/admin/orders"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Orders
      </Link>
      <Link
        href="/admin/offers"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Offers
      </Link>
      <Link
        href="/admin/branches"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Branches
      </Link>
      <Link
        href="/admin/bookings"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Bookings
      </Link>
      <Link
        href="/admin/users"
        className="hover:text-yellow-500 transition font-semibold"
      >
        Users
      </Link>
    </aside>
  );
}
