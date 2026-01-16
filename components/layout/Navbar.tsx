"use client";

import Link from "next/link";
import { useAuthRole } from "@/redux/hooks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const role = "admin" as string; // replace with useAuthRole() later
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide navbar inside admin panel (admin has its own layout)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Menu", href: "/menu" },
    { label: "Offers", href: "/offers" },
    { label: "Branches", href: "/branches" },
    { label: "About Us", href: "/about" },
    { label: "Book Now", href: "/bookings" },
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

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 items-center text-sm md:text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md transition ${
                pathname === item.href
                  ? "bg-yellow-400 text-white"
                  : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Admin Dashboard - Desktop */}
          {role === "admin" && (
            <Link
              href="/admin"
              className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-100 font-medium"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/cart"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold transition"
          >
            Order Now
          </Link>

          {role && (
            <Link
              href="/login"
              className="text-gray-700 hover:text-yellow-500 font-medium transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="/cart"
            className="text-2xl text-gray-700 hover:text-yellow-500 transition"
            title="Cart"
          >
            🛒
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-gray-700"
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setSidebarOpen(false)}
          >
            <Image
              src="/kacchi_logo.png"
              alt="Kacchi Dine Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-2 font-bold text-lg">Kacchi Dine</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl">
            <HiX />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`px-3 py-2 rounded-md transition ${
                pathname === item.href
                  ? "bg-yellow-400 text-white"
                  : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setSidebarOpen(false)}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold text-center transition"
          >
            Cart
          </Link>

          {!role && (
            <Link
              href="/auth/login"
              onClick={() => setSidebarOpen(false)}
              className="mt-2 text-gray-700 hover:text-yellow-500 font-medium transition text-center"
            >
              Login
            </Link>
          )}

          {/* Admin Dashboard - Mobile */}
          {role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className="mt-2 text-gray-700 hover:text-yellow-500 font-medium transition text-center"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </nav>
  );
}
