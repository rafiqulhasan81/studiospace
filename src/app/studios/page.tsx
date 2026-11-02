
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Search,
  MapPin,
  Users,
  SlidersHorizontal,
  ArrowRight,
  RefreshCw,
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
  amenities: string[];
  overview: string;
};

type ApiResponse = {
  success: boolean;
  count: number;
  studios: Studio[];
};

const categories = [
  "All Categories",
  "Photography",
  "Music Studio",
  "Podcast Studio",
  "Art Studio",
];

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");
  const [maxPrice, setMaxPrice] = useState("10000");

  const fetchStudios = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch("http://localhost:8000/api/studios");

      if (!response.ok) {
        throw new Error("Failed to load studios.");
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error("Could not retrieve studios.");
      }

      setStudios(data.studios);
    } catch (error) {
      console.error("Error fetching studios:", error);
      setError(true);
      toast.error("Failed to load studios. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const filteredStudios = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const priceLimit = maxPrice.trim() === ""
      ? Infinity
      : Number(maxPrice);

    return studios.filter((studio) => {
      const matchesSearch =
        studio.title.toLowerCase().includes(search) ||
        studio.location.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        studio.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesPrice =
        Number.isFinite(priceLimit) &&
        studio.hourlyRate <= priceLimit;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [studios, searchTerm, selectedCategory, maxPrice]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setMaxPrice("10000");
    toast.success("Filters reset successfully!");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Discover Your Creative Space
          </span>

          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Explore Creative Studios
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
            Find the perfect studio for photography, music,
            podcasting and other creative projects.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid gap-5 md:grid-cols-3">

            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Search Studio
              </label>

              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Studio name or location..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Studio Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Maximum Hourly Rate (৳)
              </label>

              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Enter maximum price"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
            <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <SlidersHorizontal size={17} />
              Showing {filteredStudios.length} of {studios.length} studios
            </p>

            <button
              onClick={resetFilters}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl bg-white dark:bg-gray-900"
              >
                <div className="h-56 bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl bg-white py-16 text-center dark:bg-gray-900">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              Studios could not be loaded.
            </p>

            <button
              onClick={fetchStudios}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStudios.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
            <Search size={42} className="mx-auto text-gray-400" />

            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              No Studios Found
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Try changing your search or filter options.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Studio Cards */}
        {!loading && !error && filteredStudios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Studio Image */}
                <div
                  className="relative h-56 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${studio.imageUrl}')`,
                  }}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow">
                    {studio.category}
                  </span>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h2>

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={17} className="text-blue-600" />
                    {studio.location}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {studio.overview}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hourly Rate
                      </p>

                      <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                        ৳{studio.hourlyRate}
                        <span className="text-xs font-normal text-gray-500">
                          {" "}/ hour
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users size={17} />
                      {studio.maxCapacity} People
                    </div>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Details
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
