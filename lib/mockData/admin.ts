/**
 * Admin Dashboard Mock Data
 * Replace these with API calls after backend development
 */

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  date: string;
  items?: number;
}

export interface BookingData {
  id: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  branch: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalOrders: number;
}

export interface DashboardMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  conversionRate: number;
}

// TODO: Replace with API call after backend development
export const mockRecentOrders: Order[] = [
  {
    id: "ORD001",
    customer: "Ahmed Khan",
    total: 1299,
    status: "Delivered",
    date: "2025-01-16",
    items: 3,
  },
  {
    id: "ORD002",
    customer: "Sara Ali",
    total: 899,
    status: "Processing",
    date: "2025-01-16",
    items: 2,
  },
  {
    id: "ORD003",
    customer: "Hassan Muhammad",
    total: 2499,
    status: "Pending",
    date: "2025-01-15",
    items: 5,
  },
  {
    id: "ORD004",
    customer: "Fatima Hassan",
    total: 1599,
    status: "Delivered",
    date: "2025-01-15",
    items: 4,
  },
  {
    id: "ORD005",
    customer: "Ali Raza",
    total: 749,
    status: "Processing",
    date: "2025-01-14",
    items: 2,
  },
];

// TODO: Replace with API call after backend development
export const mockRecentBookings: BookingData[] = [
  {
    id: "BK001",
    customerName: "Ahmed Khan",
    date: "2025-01-20",
    time: "19:00",
    guests: 4,
    branch: "Defence, Lahore",
    status: "Confirmed",
  },
  {
    id: "BK002",
    customerName: "Sara Ali",
    date: "2025-01-22",
    time: "18:30",
    guests: 6,
    branch: "Mall Road, Lahore",
    status: "Pending",
  },
  {
    id: "BK003",
    customerName: "Hassan Muhammad",
    date: "2025-01-18",
    time: "20:00",
    guests: 8,
    branch: "Clifton, Karachi",
    status: "Confirmed",
  },
];

// TODO: Replace with API call after backend development
export const mockUserStats: UserStats = {
  totalUsers: 2450,
  activeUsers: 1890,
  newUsersThisMonth: 340,
  totalOrders: 8920,
};

// TODO: Replace with API call after backend development
export const mockDashboardMetrics: DashboardMetrics = {
  totalRevenue: 875420,
  monthlyRevenue: 125680,
  totalCustomers: 2450,
  conversionRate: 12.5,
};

// TODO: Replace with API call after backend development
export const mockPopularCategories = [
  { name: "Kacchi", orders: 1245, revenue: 125000 },
  { name: "Biryani", orders: 980, revenue: 98000 },
  { name: "Karahi", orders: 756, revenue: 75600 },
  { name: "Tikka", orders: 654, revenue: 65400 },
  { name: "Pulao", orders: 432, revenue: 43200 },
];

// TODO: Replace with API call after backend development
export const mockUserActivity = [
  { date: "2025-01-10", orders: 45, revenue: 18900 },
  { date: "2025-01-11", orders: 52, revenue: 21500 },
  { date: "2025-01-12", orders: 48, revenue: 19200 },
  { date: "2025-01-13", orders: 67, revenue: 27800 },
  { date: "2025-01-14", orders: 54, revenue: 22300 },
  { date: "2025-01-15", orders: 61, revenue: 25100 },
  { date: "2025-01-16", orders: 58, revenue: 23900 },
];
