"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const role = useSelector((state: RootState) => state.auth.role);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Branches", href: "/branches" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/kacchi_logo.png"
            alt="Kacchi Dine Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="ml-2 text-xl md:text-2xl font-bold text-gray-900">
            Kacchi Dine
          </span>
        </Link>

        {/* Nav Items */}
        <div className="hidden md:flex gap-6 items-center text-sm md:text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-1 py-2 rounded-md transition ${
                pathname === item.href
                  ? "bg-yellow-400 text-white"
                  : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Role-based links */}
          {role === "user" && (
            <>
              <Link
                href="/user/order"
                className={`px-3 py-2 rounded-md transition ${
                  pathname === "/user/order"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
                }`}
              >
                My Orders
              </Link>
              <Link
                href="/user/bookings"
                className={`px-3 py-2 rounded-md transition ${
                  pathname === "/user/bookings"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
                }`}
              >
                Bookings
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link
                href="/admin/dashboard"
                className={`px-3 py-2 rounded-md transition ${
                  pathname === "/admin/dashboard"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/orders"
                className={`px-3 py-2 rounded-md transition ${
                  pathname === "/admin/orders"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
                }`}
              >
                Orders
              </Link>
              <Link
                href="/admin/foods"
                className={`px-3 py-2 rounded-md transition ${
                  pathname === "/admin/foods"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
                }`}
              >
                Foods
              </Link>
            </>
          )}

          {/* Order Now CTA */}
          <Link
            href="/order"
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Order Now
          </Link>

          {/* Login / Role Display */}
          {role ? (
            <span className="text-gray-600 font-medium">
              {role.toUpperCase()}
            </span>
          ) : (
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-yellow-500 font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
