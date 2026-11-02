

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  maxCapacity: number;
  overview: string;
};

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Delete selected studio
  const handleDeleteStudio = async () => {
    if (!selectedStudio) return;

    setDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/studios/${selectedStudio._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete studio.");
      }

      setStudios((previousStudios) =>
        previousStudios.filter(
          (studio) => studio._id !== selectedStudio._id
        )
      );

      toast.success("Studio deleted successfully!");
      setSelectedStudio(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Fetch user's studios
  useEffect(() => {
    const fetchMyStudios = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/my-listings",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load studios.");
        }

        setStudios(data.studios);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading your studios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Studio Listings
              </h1>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage the studios you have listed on StudioSpace.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Add New Studio
            </Link>
          </div>

          {/* Studio Listings */}
          {studios.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center dark:border-gray-700">
              <h2 className="text-xl font-semibold dark:text-white">
                You have no studio listings yet.
              </h2>

              <p className="mt-2 text-gray-500">
                Add your first studio to get started.
              </p>

              <Link
                href="/add-studio"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white"
              >
                Add Your Studio
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-gray-600 dark:text-gray-400">
                Total Listings: {studios.length}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studios.map((studio) => (
                  <div
                    key={studio._id}
                    className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="relative h-52 w-full">
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-medium text-blue-600">
                        {studio.category}
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                        {studio.title}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {studio.overview}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-2">
                          <MapPin size={16} />
                          {studio.location}
                        </p>

                        <p className="flex items-center gap-2">
                          <Users size={16} />
                          Capacity: {studio.maxCapacity} people
                        </p>
                      </div>

                      <p className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                        ৳{studio.hourlyRate}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}/ hour
                        </span>
                      </p>

                      {/* Edit and Delete Buttons */}
                      <div className="mt-5 flex gap-3">
                        <Link
                          href={`/studios/edit/${studio._id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => setSelectedStudio(studio)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Custom Delete Confirmation Modal */}
        {selectedStudio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">

              {/* Modal Heading */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Trash2 size={24} />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Studio?
                </h2>
              </div>

              {/* Confirmation Message */}
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedStudio.title}
                </span>
                ? This action cannot be undone.
              </p>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStudio(null)}
                  disabled={deleting}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteStudio}
                  disabled={deleting}
                  className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}

