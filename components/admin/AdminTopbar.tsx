"use client";

import { useAuthUser, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Link from "next/link";
import { HiMenu, HiBell } from "react-icons/hi";
import { useEffect, useState } from "react";

interface AdminTopbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function AdminTopbar({
  sidebarOpen,
  onToggleSidebar,
}: AdminTopbarProps) {
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Live clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time nicely
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = time.toLocaleDateString();

  return (
    <div className="w-full bg-yellow-400 text-black p-4 md:p-6 flex justify-between items-center shadow-lg">
      {/* Left side: mobile menu & logo */}
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-yellow-500 rounded-lg transition text-black shrink-0"
          title="Toggle Menu"
        >
          <HiMenu className="text-2xl" />
        </button>

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 flex-1"
        >
          <span className="text-2xl">⚡</span>
          <h1 className="text-lg md:text-2xl font-bold hidden sm:block">
            Admin Dashboard
          </h1>
        </Link>
      </div>

      {/* Right side: clock, notifications, user */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Live Clock */}
        <div className="hidden md:flex flex-col items-end text-gray-800 text-xs md:text-sm">
          <span>{formattedTime}</span>
          <span className="text-gray-700 text-[10px] md:text-xs">
            {formattedDate}
          </span>
        </div>

        {/* Notifications */}
        <button
          title="Notifications"
          className="relative p-2 rounded-full hover:bg-yellow-500 transition text-black"
        >
          <HiBell className="text-xl md:text-2xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
        </button>

        {/* User avatar & name */}
        <div className="flex items-center gap-2 relative group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-800 text-sm md:text-base">
            {user?.name?.[0] || "A"}
          </div>
          <span className="hidden md:block text-sm font-semibold text-gray-800 truncate">
            {user?.name || "Admin"}
          </span>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <Link
              href="/admin/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
            >
              Profile
            </Link>
            <Link
              href="/admin/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
