
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CalendarCheck,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const API_URL = "https://studiospace-server-nine-psi.vercel.app";

type Booking = {
  _id: string;
  studioTitle: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
};

type DashboardStats = {
  totalStudios: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudios: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
  });

  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [listingsResponse, bookingsResponse] = await Promise.all([
          fetch(`${API_URL}/api/my-listings`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/api/bookings`, {
            credentials: "include",
          }),
        ]);

        if (!listingsResponse.ok || !bookingsResponse.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const listingsData = await listingsResponse.json();
        const bookingsData = await bookingsResponse.json();

        if (!listingsData.success || !bookingsData.success) {
          throw new Error("Unable to retrieve dashboard information.");
        }

        const bookings: Booking[] = bookingsData.bookings || [];

        setStats({
          totalStudios: listingsData.totalStudios || 0,
          totalBookings: bookingsData.totalBookings || 0,
          pendingBookings: bookings.filter(
            (booking) => booking.status === "Pending"
          ).length,
          confirmedBookings: bookings.filter(
            (booking) => booking.status === "Confirmed"
          ).length,
        });

        setRecentBookings(bookings.slice(0, 5));
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "My Studio Listings",
      value: stats.totalStudios,
      icon: Building2,
      description: "Your listed studios",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      description: "All your bookings",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock,
      description: "Awaiting confirmation",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: CheckCircle,
      description: "Confirmed reservations",
    },
  ];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">

          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Welcome to your StudioSpace dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </p>
          )}

          {/* Statistics Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>

                  <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {loading ? "..." : stat.value}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <section className="mt-10">
            <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/add-studio"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <Plus className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Add New Studio
                  </span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/my-listings"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    My Listings
                  </span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/my-bookings"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <CalendarCheck className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-800 dark:text-white">
                    My Bookings
                  </span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>

          {/* Recent Bookings */}
          <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Bookings
              </h2>

              <Link
                href="/my-bookings"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <p className="py-6 text-center text-gray-500">
                Loading bookings...
              </p>
            ) : recentBookings.length === 0 ? (
              <p className="py-6 text-center text-gray-500">
                No bookings found yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500 dark:border-gray-700">
                      <th className="p-3">Studio</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Time</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b last:border-0 dark:border-gray-700"
                      >
                        <td className="p-3 font-medium text-gray-800 dark:text-white">
                          {booking.studioTitle}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {booking.bookingDate}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          {booking.startTime} - {booking.endTime}
                        </td>

                        <td className="p-3 text-gray-600 dark:text-gray-300">
                          ৳{booking.totalPrice}
                        </td>

                        <td className="p-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : booking.status === "Cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>
    </ProtectedRoute>
  );
}


