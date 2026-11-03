
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  User,
  X,
  
} from "lucide-react";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  images?: string[];
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
};

type ApiResponse = {
  success: boolean;
  studio: Studio;
  message?: string;
};

function StudioDetailsContent() {
  const params = useParams();
  const id = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages = studio
  ? [
      studio.imageUrl,
      ...(studio.images || []).filter(
        (image) => image !== studio.imageUrl
      ),
    ].filter(Boolean)
  : [];

  // Booking Form States
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [isBooking, setIsBooking] = useState(false);

  // Fetch Studio Details
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `http://localhost:8000/api/studios/${id}`
        );

        const data: ApiResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Studio not found.");
        }

        setStudio(data.studio);
        setActiveImage(0);
      } catch (error) {
        console.error("Error fetching studio:", error);
        setError(true);
        toast.error("Failed to load studio details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-8 h-96 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="mt-8 h-10 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-4 h-24 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </main>
    );
  }

  // Error State
  if (error || !studio) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Studio Not Found
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          We could not find this studio.
        </p>

        <Link
          href="/studios"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Studios
        </Link>
      </main>
    );
  }

  // Booking Price Calculation
  const startMinutes =
    Number(startTime.slice(0, 2)) * 60 +
    Number(startTime.slice(3, 5));

  const endMinutes =
    Number(endTime.slice(0, 2)) * 60 +
    Number(endTime.slice(3, 5));

  const totalHours =
    endMinutes > startMinutes
      ? (endMinutes - startMinutes) / 60
      : 0;

  const totalPrice = totalHours * studio.hourlyRate;

  // Booking Submit Function
  const handleBookingSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!bookingDate || totalHours <= 0) {
      toast.error("Please select a valid date and time.");
      return;
    }

    try {
      setIsBooking(true);

      const response = await fetch(
        "http://localhost:8000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            studioId: studio._id,
            bookingDate,
            startTime,
            endTime,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed.");
      }

      toast.success("Booking request submitted successfully!");

      setShowBookingForm(false);
      setBookingDate("");
      setStartTime("10:00");
      setEndTime("12:00");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Studio Image Gallery */}
<div className="relative h-72 overflow-hidden rounded-2xl bg-gray-200 sm:h-96 lg:h-[480px] dark:bg-gray-800">
  {galleryImages.length > 0 && (
    <>
      <img
        src={galleryImages[activeImage]}
        alt={`${studio.title} - Image ${activeImage + 1}`}
        className="h-full w-full object-cover"
      />

      <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow">
        {studio.category}
      </span>

      {galleryImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setActiveImage((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveImage((prev) =>
                (prev + 1) % galleryImages.length
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${
                  activeImage === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  )}
</div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* Title and Location */}
            <section>
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                {studio.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={19} className="text-blue-600" />
                {studio.location}
              </p>
            </section>

            {/* Studio Specifications */}
            <section className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <Clock className="text-blue-600" size={25} />

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Hourly Rate
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                  ৳{studio.hourlyRate}
                </h3>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <Users className="text-blue-600" size={25} />

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Maximum Capacity
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                  {studio.maxCapacity} People
                </h3>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <ShieldCheck className="text-blue-600" size={25} />

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Security Deposit
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                  ৳{studio.securityDeposit}
                </h3>
              </div>

            </section>

            {/* Overview */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                About This Studio
              </h2>

              <p className="mt-4 whitespace-pre-line leading-8 text-gray-600 dark:text-gray-400">
                {studio.overview}
              </p>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Studio Amenities
              </h2>

              {studio.amenities?.length > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {studio.amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle
                        size={19}
                        className="text-green-600"
                      />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500">
                  No amenities information available.
                </p>
              )}
            </section>

            {/* Host Information */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hosted By
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <User size={28} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {studio.ownerName}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Studio Host
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Booking Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Starting from
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                ৳{studio.hourlyRate}

                <span className="text-sm font-normal text-gray-500">
                  {" "}/ hour
                </span>
              </h2>

              <div className="my-6 space-y-4 border-y border-gray-200 py-5 dark:border-gray-800">

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Security Deposit
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    ৳{studio.securityDeposit}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Capacity
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {studio.maxCapacity} People
                  </span>
                </div>

              </div>

              {/* Open Booking Modal Button */}
              <button
                type="button"
                onClick={() => setShowBookingForm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                <CalendarDays size={19} />
                Book Workspace Now
              </button>

            </div>
          </aside>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6"
          onClick={() => {
            if (!isBooking) {
              setShowBookingForm(false);
            }
          }}
        >
          <div
            className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Book Workspace
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {studio.title}
                </p>
              </div>

              <button
                type="button"
                disabled={isBooking}
                onClick={() => setShowBookingForm(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                aria-label="Close booking modal"
              >
                <X size={22} />
              </button>

            </div>

            {/* Booking Form */}
            <form
              onSubmit={handleBookingSubmit}
              className="space-y-4"
            >

              {/* Booking Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Booking Date
                </label>

                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(event) => setBookingDate(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Start Time
                </label>

                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  End Time
                </label>

                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Price Summary */}
              <div className="space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Hourly Rate
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    ৳{studio.hourlyRate}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Hours
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {totalHours} Hours
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Security Deposit
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    ৳{studio.securityDeposit}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                  <div className="flex justify-between">

                    <span className="font-bold text-gray-900 dark:text-white">
                      Rental Price
                    </span>

                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                      ৳{totalPrice.toLocaleString("en-US")}
                    </span>

                  </div>
                </div>

              </div>

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                Security deposit is shown separately from the rental price.
              </p>

              {/* Confirm Booking Button */}
              <button
                type="submit"
                disabled={isBooking}
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isBooking ? "Submitting..." : "Confirm Booking"}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                disabled={isBooking}
                onClick={() => setShowBookingForm(false)}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}

export default function StudioDetailsPage() {
  return (
    <Suspense fallback={<div>Loading studio details...</div>}>
      <StudioDetailsContent />
    </Suspense>
  );
}
