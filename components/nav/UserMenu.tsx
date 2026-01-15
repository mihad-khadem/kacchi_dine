"use client";

import { useAuthRole, useAuthUser, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Link from "next/link";

export default function UserMenu() {
  const role = useAuthRole();
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  if (!role) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold">{user?.name || "User"}</span>

      {role === "admin" && (
        <Link
          href="/admin/dashboard"
          className="text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          Admin Panel
        </Link>
      )}

      {role === "user" && (
        <Link
          href="/order"
          className="text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          My Orders
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition text-sm font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
