
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Users, ArrowRight, Star } from "lucide-react";

// Studio Data Type
type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  overview: string;
  rating?: number;
};

type ApiResponse = {
  success: boolean;
  count: number;
  studios: Studio[];
};

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Studios from Backend
  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/studios/featured"
        );

        if (!response.ok) {
          throw new Error("Failed to load studios.");
        }

        const data: ApiResponse = await response.json();

        setStudios(data.studios);
        console.log("Featured Studios:", data.studios);
      } catch (error) {
        console.error("Error fetching studios:", error);
        setError("Studios could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">

      {/* Section Heading */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold uppercase tracking-wider text-blue-600">
            Discover Your Space
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Featured Studios
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Explore some of the best creative spaces available.
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
        >
          View All Studios
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <p className="rounded-xl bg-red-50 p-5 text-center text-red-600 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && !error && studios.length === 0 && (
        <p className="rounded-xl bg-gray-100 p-8 text-center text-gray-600 dark:bg-gray-900 dark:text-gray-300">
          No studios are available right now.
        </p>
      )}

      {/* Studio Cards */}
      {!loading && !error && studios.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Studio Image */}
              <div
                className="relative h-56 bg-gray-200 bg-cover bg-center dark:bg-gray-800"
                style={{
                  backgroundImage: studio.imageUrl
                    ? `url("${studio.imageUrl}")`
                    : "none",
                }}
              >
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                  {studio.category}
                </span>
              </div>

              {/* Studio Information */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 text-xl font-bold">
                    {studio.title}
                  </h3>

                  
{/* Rating Badge */}
{Number(studio.rating) > 0 &&
Number.isFinite(Number(studio.rating)) ? (
  <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
    <Star size={14} fill="currentColor" />
    {Number(studio.rating).toFixed(1)}
  </span>
) : (
  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
    New Studio
  </span>
)}

                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={16} />
                  {studio.location}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Hourly Rate
                    </p>

                    <p className="text-lg font-bold text-blue-600">
                      ${studio.hourlyRate}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}/ hr
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Users size={17} />
                    <span>{studio.maxCapacity} Guests</span>
                  </div>
                </div>

                {/* Details Button */}
                <Link
                  href={`/studios/${studio._id}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
