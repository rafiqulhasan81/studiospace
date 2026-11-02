
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddStudioPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    amenities: "",
    overview: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/api/studios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            amenities: formData.amenities
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add studio.");
      }

      toast.success("Studio added successfully!");

      setFormData({
        title: "",
        category: "",
        hourlyRate: "",
        securityDeposit: "",
        maxCapacity: "",
        location: "",
        imageUrl: "",
        amenities: "",
        overview: "",
      });

      router.push("/my-listings");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Studio
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your creative space with creators.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          {/* Studio Title */}
          <div>
            <label className="mb-2 block font-medium">
              Studio Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter studio name"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Photography">Photography</option>
              <option value="Music Studio">Music Studio</option>
              <option value="Podcast Studio">Podcast Studio</option>
              <option value="Art Studio">Art Studio</option>
            </select>
          </div>

          {/* Pricing and Capacity */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium">
                Hourly Rate (৳)
              </label>

              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="1"
                placeholder="1000"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Security Deposit (৳)
              </label>

              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                min="0"
                placeholder="2000"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Max Capacity
              </label>

              <input
                type="number"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                min="1"
                placeholder="10"
                required
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block font-medium">
              Location / Address
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter studio address"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block font-medium">
              Studio Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/studio-image.jpg"
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="mb-2 block font-medium">
              Amenities
            </label>

            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="WiFi, Air Conditioning, Lighting"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-sm text-gray-500">
              Separate each amenity with a comma.
            </p>
          </div>

          {/* Overview */}
          <div>
            <label className="mb-2 block font-medium">
              Studio Overview
            </label>

            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Describe your studio..."
              rows={5}
              required
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding Studio..." : "Add Studio"}
          </button>
        </form>
      </div>
    </main>
  );
}
