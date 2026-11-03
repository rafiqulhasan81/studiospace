
"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

type StudioForm = {
  title: string;
  category: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  location: string;
  imageUrl: string;
  images: string;
  amenities: string;
  overview: string;
};

const initialForm: StudioForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
   images: "",
  amenities: "",
  overview: "",
};

 function EditStudioContent() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [formData, setFormData] = useState<StudioForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch existing studio data
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/studios/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load studio.");
        }

        const studio = data.studio;

        setFormData({
          title: studio.title || "",
          category: studio.category || "",
          hourlyRate: String(studio.hourlyRate ?? ""),
          securityDeposit: String(studio.securityDeposit ?? ""),
          maxCapacity: String(studio.maxCapacity ?? ""),
          location: studio.location || "",
          imageUrl: studio.imageUrl || "",
          images: Array.isArray(studio.images)
          ? studio.images.join("\n")
          : "",
          amenities: Array.isArray(studio.amenities)
            ? studio.amenities.join(", ")
            : "",
          overview: studio.overview || "",
        });
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

    if (id) {
      fetchStudio();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Update studio
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/studios/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            hourlyRate: Number(formData.hourlyRate),
            securityDeposit: Number(formData.securityDeposit),
            maxCapacity: Number(formData.maxCapacity),
            amenities: formData.amenities
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
              
              images: formData.images
              .split("\n")
               .map((url) => url.trim())
               .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update studio.");
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading studio information...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Edit Studio
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Update your studio information below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div>
            <label className="mb-2 block font-medium">Studio Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="">Select Category</option>
              <option value="Photography">Photography</option>
              <option value="Music Studio">Music Studio</option>
              <option value="Podcast Studio">Podcast Studio</option>
              <option value="Art Studio">Art Studio</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium">Hourly Rate</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Security Deposit
              </label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Max Capacity</label>
              <input
                type="number"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                min="1"
                required
                className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Amenities (comma separated)
            </label>
            <input
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Lighting, AC, Wi-Fi"
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update Studio"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              className="rounded-lg border px-6 py-3 font-semibold dark:border-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EditStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading edit page...
        </div>
      }
    >
      <EditStudioContent />
    </Suspense>
  );
}
