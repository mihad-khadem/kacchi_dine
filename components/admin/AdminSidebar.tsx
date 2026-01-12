"use client";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 p-6 flex flex-col gap-4">
      <div className="text-xl font-bold mb-6">Kacchi Dine Admin</div>
      <Link href="/admin/dashboard" className="hover:text-red-700">
        Dashboard
      </Link>
      <Link href="/admin/foods" className="hover:text-red-700">
        Foods
      </Link>
      <Link href="/admin/orders" className="hover:text-red-700">
        Orders
      </Link>
      <Link href="/admin/offers" className="hover:text-red-700">
        Offers
      </Link>
      <Link href="/admin/branches" className="hover:text-red-700">
        Branches
      </Link>
      <Link href="/admin/bookings" className="hover:text-red-700">
        Bookings
      </Link>
      <Link href="/admin/users" className="hover:text-red-700">
        Users
      </Link>
    </aside>
  );
}
