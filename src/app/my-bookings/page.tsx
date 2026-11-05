
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  XCircle,
  X,
  AlertTriangle,
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

  // Cancellation States
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Fetch Bookings
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
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel Booking Function
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    const bookingId = selectedBooking._id;

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

      // Update Booking Status
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully!");

      // Close Modal
      setSelectedBooking(null);
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

  // Loading State
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center text-gray-600 dark:text-gray-300">
          Loading your bookings...
        </div>
      </ProtectedRoute>
    );
  }

  // Error State
  if (error) {
    return (
      <ProtectedRoute>
        <div className="mx-auto max-w-6xl px-5 py-20 text-center text-red-500">
          {error}
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">

          {/* Page Header */}
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            My Bookings
          </h1>

          <p className="mb-8 text-gray-600 dark:text-gray-400">
            View and manage your studio reservations.
          </p>

          {/* Empty State */}
          {bookings.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">
              <CalendarDays
                className="mx-auto mb-4 text-blue-600"
                size={40}
              />

              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No bookings yet
              </h2>

              <p className="mb-5 text-gray-500 dark:text-gray-400">
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

            /* Booking List */
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >

                  {/* Booking Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {booking.studioTitle}
                      </h2>

                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDays size={16} />
                        {booking.bookingDate}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={16} />
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>

                    {/* Booking Status - DaisyUI Badge */}
<span
  className={`badge badge-lg ${
    booking.status === "Pending"
      ? "badge-warning"
      : booking.status === "Confirmed"
        ? "badge-success"
        : booking.status === "Completed"
          ? "badge-info"
          : "badge-error"
  }`}
>
  {booking.status}
</span>
                  </div>

                  {/* Booking Price Information */}
                  <div className="mt-6 grid gap-4 border-t border-gray-200 pt-5 dark:border-gray-800 sm:grid-cols-3">

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Hours
                      </p>

                      <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                        {booking.totalHours} hours
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hourly Rate
                      </p>

                      <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                        ৳{booking.hourlyRate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Price
                      </p>

                      <p className="mt-1 text-lg font-bold text-blue-600">
                        ৳{booking.totalPrice}
                      </p>
                    </div>

                  </div>


                  

                  {/* Pending Booking Actions */}
                  {booking.status === "Pending" && (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">

                      <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <XCircle size={16} />
                        Awaiting host confirmation
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedBooking(booking)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>

                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Cancel Confirmation Modal */}
        {selectedBooking && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
            onClick={() => {
              if (!cancellingId) {
                setSelectedBooking(null);
              }
            }}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Modal Header */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950">
                    <AlertTriangle size={25} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Cancel Booking?
                  </h2>
                </div>

                <button
                  type="button"
                  disabled={cancellingId !== null}
                  onClick={() => setSelectedBooking(null)}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                  aria-label="Close modal"
                >
                  <X size={21} />
                </button>
              </div>

              {/* Modal Message */}
              <p className="leading-7 text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel your booking for{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {selectedBooking.studioTitle}
                </span>
                ?
              </p>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This action will change your booking status to Cancelled.
              </p>

              {/* Modal Buttons */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={cancellingId !== null}
                  onClick={() => setSelectedBooking(null)}
                  className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  disabled={cancellingId !== null}
                  onClick={handleCancelBooking}
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cancellingId
                    ? "Cancelling..."
                    : "Yes, Cancel Booking"}
                </button>

              </div>

            </div>
          </div>
        )}

      </main>
    </ProtectedRoute>
  );
}
