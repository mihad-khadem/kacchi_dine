"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const role = "admin" as string; // useAuthRole();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile menu when pathname changes
  useEffect(() => {
    if (onClose) onClose();
  }, [pathname, onClose]);

  if (role !== "admin") {
    return (
      <aside className="hidden md:flex w-64 bg-white shadow-md h-screen sticky top-16 p-6 flex-col gap-4 border-r border-gray-200">
        <div className="text-lg font-bold mb-4 text-red-600">
          ⚠️ Access Denied
        </div>
        <Link
          href="/"
          className="text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 px-3 py-2 rounded transition font-semibold"
        >
          Return to Home
        </Link>
      </aside>
    );
  }

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: "🏠" },
    { label: "Quick Overviews", href: "/admin/dashboard", icon: "📊" },
    { label: "Foods", href: "/admin/foods", icon: "🍕" },
    { label: "Orders", href: "/admin/orders", icon: "📦" },
    { label: "Offers", href: "/admin/offers", icon: "🎁" },
    { label: "Branches", href: "/admin/branches", icon: "🏪" },
    { label: "Bookings", href: "/admin/bookings", icon: "📅" },
    { label: "Users", href: "/admin/users", icon: "👥" },
  ];

  return (
    <>
      {/* Desktop Sidebar - Collapsible */}
      <aside
        className={`hidden md:flex fixed md:sticky top-0 h-screen bg-white shadow-md flex-col gap-2 border-r border-gray-200 overflow-y-auto transition-all duration-300 z-30 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header with Toggle */}
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="text-lg font-bold text-gray-800">🔧 Menu</div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-700"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition font-semibold ${
                  isActive
                    ? "bg-yellow-400 text-black"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-xl shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200 mx-3"></div>

        {/* Footer Links */}
        <div className="space-y-1 px-3 pb-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition font-semibold"
            title={collapsed ? "Back to Site" : undefined}
          >
            <span className="text-xl shrink-0">🏠</span>
            {!collapsed && <span className="truncate">Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar - Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col md:hidden z-50 overflow-y-auto pt-24">
            <div className="p-6 flex items-center justify-between border-b absolute top-0 left-0 right-0 bg-white">
              <div className="text-lg font-bold text-gray-800">🔧 Admin</div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-700"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            <nav className="space-y-1 p-3 flex-1 mt-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-gray-200 p-3">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition font-semibold"
              >
                <span className="text-xl">🏠</span>
                <span>Back to Site</span>
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
