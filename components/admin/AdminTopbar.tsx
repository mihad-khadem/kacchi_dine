// admin topbar component
"use client";

import { useAuthUser, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

export default function AdminTopbar() {
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-yellow-500 text-black p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">⚡ Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">{user?.name || "Admin"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
