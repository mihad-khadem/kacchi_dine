"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  useMenuItems,
  useBranches,
  useCartItems,
  useOffers,
  useAuthUser,
} from "@/redux/hooks";
import {
  mockRecentOrders,
  mockRecentBookings,
  mockUserStats,
  mockDashboardMetrics,
} from "@/lib/mockData/admin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminPage() {
  const menuItems = useMenuItems();
  const branches = useBranches();
  const cartItems = useCartItems();
  const offers = useOffers();
  const user = useAuthUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  const getPrice = (item: {
    prices?: { one?: number; three?: number; five?: number } | number;
  }) => {
    if (typeof item.prices === "number") return item.prices;
    if (typeof item.prices === "object") return item.prices?.one || 0;
    return 0;
  };

  const totalMenuItems = menuItems.length;
  const totalBranches = branches.length;
  const totalOffers = offers.length;
  const activeOffers = offers.filter((o) => o.active).length;

  const recentOrders = mockRecentOrders;
  const recentBookings = mockRecentBookings;
  const dashboardMetrics = mockDashboardMetrics;
  const userStats = mockUserStats;

  // Category Stats
  const categoryStats = [
    {
      name: "Kacchi",
      count: menuItems.filter((i) => i.category === "Kacchi").length,
    },
    {
      name: "Biryani",
      count: menuItems.filter((i) => i.category === "Biryani").length,
    },
    {
      name: "Tehari",
      count: menuItems.filter((i) => i.category === "Tehari").length,
    },
    {
      name: "Polao",
      count: menuItems.filter((i) => i.category === "Polao").length,
    },
  ];
  const totalItems = categoryStats.reduce((sum, cat) => sum + cat.count, 0);

  // Advanced Chart Data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 120000, orders: 200, users: 150 },
    { month: "Feb", revenue: 150000, orders: 240, users: 180 },
    { month: "Mar", revenue: 170000, orders: 280, users: 200 },
    { month: "Apr", revenue: 140000, orders: 220, users: 170 },
    { month: "May", revenue: 180000, orders: 300, users: 210 },
  ];

  const COLORS = ["#FACC15", "#34D399", "#3B82F6", "#F87171", "#A78BFA"];

  // Orders by Branch — generate once during initial render
  const [ordersByBranch] = useState(() =>
    branches.map((b) => ({
      branch: b.BranchName,
      orders: Math.floor(Math.random() * 200) + 50,
    })),
  );

  // Stacked Bar Data — generate once during initial render
  const [stackedBarData] = useState(() =>
    branches.map((branch) => {
      const row: any = { branch: branch.BranchName };
      categoryStats.forEach((cat) => {
        row[cat.name] = Math.floor(Math.random() * 50) + 10;
      });
      return row;
    }),
  );

  const goalTrackingData = [
    { goal: "Daily Orders", actual: 80, target: 100 },
    { goal: "Monthly Revenue", actual: 140000, target: 150000 },
    { goal: "New Users", actual: 250, target: 300 },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || "Admin"}! 👋
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Foods</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalMenuItems}
              </p>
            </div>
            <div className="text-4xl text-yellow-400">🍕</div>
          </div>
          <Link
            href="/admin/foods"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            Manage Foods →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Branches</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalBranches}
              </p>
            </div>
            <div className="text-4xl">🏪</div>
          </div>
          <Link
            href="/admin/branches"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            Manage Branches →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Offers</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {activeOffers}/{totalOffers}
              </p>
            </div>
            <div className="text-4xl">🎁</div>
          </div>
          <Link
            href="/admin/offers"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            View Offers →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Carts</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {cartItems.length}
              </p>
            </div>
            <div className="text-4xl">🛒</div>
          </div>
          <Link
            href="/admin/orders"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold mt-4 inline-block"
          >
            View Orders →
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ৳{dashboardMetrics.totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">📈 +12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ৳{dashboardMetrics.monthlyRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">✅ Active this month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {userStats.totalUsers.toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            +{userStats.newUsersThisMonth} new this month
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {dashboardMetrics.conversionRate}%
          </p>
          <p className="text-xs text-orange-600 mt-2">
            {userStats.activeUsers}/{userStats.totalUsers} active
          </p>
        </div>
      </div>

      {/* ----------------- Advanced Charts Section ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FACC15" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Branch */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Orders by Branch
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ordersByBranch}
                dataKey="orders"
                nameKey="branch"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label
              >
                {ordersByBranch.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Combined Revenue vs Orders vs Users */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Revenue vs Orders vs Users
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#F59E0B"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stacked Bar Chart for Categories per Branch */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Food Categories per Branch
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stackedBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categoryStats.map((cat, idx) => (
              <Bar
                key={cat.name}
                dataKey={cat.name}
                stackId="a"
                fill={COLORS[idx % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Tracking */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Goal Tracking</h2>
        {goalTrackingData.map((goal) => {
          const percentage = Math.min((goal.actual / goal.target) * 100, 100);
          return (
            <div key={goal.goal} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 font-semibold">{goal.goal}</span>
                <span className="text-gray-600">
                  {goal.actual}/{goal.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="h-3 rounded-full bg-green-400 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------- Existing Tables ----------------- */}
      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">
                      ৳{order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          setEditingId(editingId === order.id ? null : order.id)
                        }
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        {editingId === order.id ? "Cancel" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Premium Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top Premium Items
          </h2>
          <div className="space-y-3">
            {[...menuItems]
              .sort((a, b) => getPrice(b) - getPrice(a))
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <p className="font-bold text-yellow-600 ml-2 shrink-0">
                    ৳{getPrice(item)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Branch
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Guests
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {booking.customerName}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{booking.branch}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.date}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.guests}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        alert(`Booking ${booking.id} action triggered`)
                      }
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
