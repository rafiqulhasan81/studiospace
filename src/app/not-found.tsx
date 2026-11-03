
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="mx-auto max-w-lg text-center">

        <h1 className="text-8xl font-extrabold text-blue-600">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found!
        </h2>

        <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Search size={18} />
            Explore Studios
          </Link>

        </div>
      </div>
    </main>
  );
}
