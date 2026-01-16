"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiExclamationCircle, HiArrowLeft, HiRefresh } from "react-icons/hi";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <HiExclamationCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4">
          Error!
        </h1>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-3">
          Admin Panel Error
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6 text-base md:text-lg">
          An error occurred in the admin panel. Please try again.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-mono break-words">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="text-sm text-red-700 font-mono mt-2">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            <HiRefresh className="w-5 h-5" />
            <span>Retry</span>
          </button>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* More Links */}
        <div className="space-y-2">
          <Link
            href="/admin/foods"
            className="block text-center text-yellow-600 hover:text-yellow-700 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition"
          >
            Foods
          </Link>
          <Link
            href="/admin/orders"
            className="block text-center text-yellow-600 hover:text-yellow-700 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition"
          >
            Orders
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          If this problem persists, please contact the development team.
        </p>
      </div>
    </div>
  );
}
