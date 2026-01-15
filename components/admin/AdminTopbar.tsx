// admin topbar component
"use client";

import { useAuthUser, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";

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

  return (
    <div className="w-full bg-yellow-400 text-black p-4 md:p-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-yellow-500 rounded-lg transition text-black shrink-0"
          title="Toggle Menu"
        >
          <HiMenu className="text-2xl" />
        </button>

        {/* Logo and Title */}
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

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-xs md:text-sm font-semibold text-gray-800 truncate">
          {user?.name || "Admin"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 md:px-4 py-2 rounded-lg transition text-xs md:text-sm font-bold shrink-0"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
