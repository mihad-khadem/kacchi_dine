import React from "react";
import Link from "next/link";

export const AdminQuickActions = () => {
  const actions = [
    { label: "Add Food Item", href: "/admin/foods" },
    { label: "Create Offer", href: "/admin/offers" },
    { label: "Add Branch", href: "/admin/branches" },
    { label: "View Bookings", href: "/admin/bookings" },
    { label: "Pending Orders", href: "/admin/orders?status=Pending" },
    { label: "Send Notifications", href: "/admin/notifications" },
    { label: "Generate Reports", href: "/admin/reports" },
  ];

  return (
    <section className="my-8">
      <div className="mt-8 bg-yellow-50 rounded-lg shadow p-6 border border-yellow-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition text-center"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
