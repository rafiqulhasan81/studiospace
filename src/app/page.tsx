
import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import FeaturedStudios from "./components/FeaturedStudios";
import HowItWorks from "./components/HowItWorks";
import HostSupport from "./components/HostSupport";
import {
  ArrowRight,
  Camera,
  Music,
  Mic,
  Palette,
  ShieldCheck,
  Clock,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* Hero Section */}
      <HeroSlider />
      <FeaturedStudios />
      <HowItWorks />
      <HostSupport />

      {/* Creative Categories */}
      <section className="border-t border-gray-100 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-900/50">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Explore Creative Spaces
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Everything you need to create something amazing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              { name: "Photography", icon: Camera },
              { name: "Music Studio", icon: Music },
              { name: "Podcast Studio", icon: Mic },
              { name: "Art Studio", icon: Palette },
            ].map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href="/studios"
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-300">
                    <Icon size={23} />
                  </div>

                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {category.name}
                  </span>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

    </main>
  );
}
