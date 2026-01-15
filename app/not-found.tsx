"use client";

import Link from "next/link";
import { HiArrowLeft, HiExclamationCircle } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
            <HiExclamationCircle className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-7xl font-bold text-center text-gray-800 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 text-base md:text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/menu"
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            <span>Menu</span>
          </Link>
        </div>

        {/* More Links */}
        <div className="space-y-2">
          <Link
            href="/branches"
            className="block text-center text-yellow-600 hover:text-yellow-700 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition"
          >
            Browse Branches
          </Link>
          <Link
            href="/contact"
            className="block text-center text-yellow-600 hover:text-yellow-700 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition"
          >
            Contact Support
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Need help? Visit our{" "}
          <Link
            href="/contact"
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            contact page
          </Link>{" "}
          or return to{" "}
          <Link
            href="/"
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            home
          </Link>
        </p>
      </div>
    </div>
  );
}
