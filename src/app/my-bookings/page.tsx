
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/app/components/ProtectedRoute";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  hourlyRate: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancelBooking = async (bookingId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    setCancellingId(bookingId);

    const response = await fetch(
      `http://localhost:8000/api/bookings/${bookingId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to cancel booking.");
    }

    // Update the booking status in the frontend
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );

    toast.success("Booking cancelled successfully!");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );
  } finally {
    setCancellingId(null);
  }
};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/bookings",
          { credentials: "include" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings.");
        }

        setBookings(data.bookings);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-400">
          View and manage your studio reservations.
        </p>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">
            <CalendarDays className="mx-auto mb-4" size={40} />
            <h2 className="mb-2 text-xl font-semibold">
              No bookings yet
            </h2>
            <p className="mb-5 text-gray-500">
              Explore studios and book your first creative space.
            </p>
            <Link
              href="/studios"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={16} />
                      {booking.bookingDate}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                    {booking.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 border-t border-gray-200 pt-5 dark:border-gray-800 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Hours</p>
                    <p className="mt-1 font-semibold">
                      {booking.totalHours} hours
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Hourly Rate</p>
                    <p className="mt-1 font-semibold">
                      ৳{booking.hourlyRate}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="mt-1 text-lg font-bold text-blue-600">
                      ৳{booking.totalPrice}
                    </p>
                  </div>
                </div>

                {booking.status === "Pending" && (
  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
    <p className="flex items-center gap-2 text-sm text-gray-500">
      <XCircle size={16} />
      Awaiting host confirmation
    </p>

    <button
      type="button"
      onClick={() => handleCancelBooking(booking._id)}
      disabled={cancellingId === booking._id}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {cancellingId === booking._id
        ? "Cancelling..."
        : "Cancel Booking"}
    </button>
  </div>
)}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </ProtectedRoute>
  );
}
