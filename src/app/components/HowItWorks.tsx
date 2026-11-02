
import Link from "next/link";
import {
  Search,
  Eye,
  CalendarCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Studio",
    description:
      "Browse a wide range of creative spaces and discover the perfect studio for your needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Explore Details",
    description:
      "Check studio photos, amenities, location, pricing and all the details before booking.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Book Your Space",
    description:
      "Choose your preferred date and time, submit your booking request and wait for confirmation.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Start Creating",
    description:
      "Visit your booked studio and bring your creative ideas to life.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white px-4 py-16 dark:bg-gray-950 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-wider text-blue-600">
            Simple & Easy Process
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            How Booking Works
          </h2>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            Booking your perfect creative space is simple.
            Follow these four easy steps and start creating.
          </p>
        </div>

        {/* Four Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-200 bg-gray-50 p-7 transition hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
              >
                {/* Step Number */}
                <div className="absolute right-6 top-6 text-4xl font-extrabold text-gray-200 dark:text-gray-800">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400">
                  <Icon size={27} />
                </div>

                {/* Content */}
                <h3 className="mt-7 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Bottom Decoration */}
                <div className="mt-6 h-1 w-12 rounded-full bg-blue-600 transition-all group-hover:w-20" />
              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Find Your Studio
            <ArrowRight size={19} />
          </Link>
        </div>

      </div>
    </section>
  );
}
