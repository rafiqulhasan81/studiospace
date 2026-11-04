
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Wrench,
  ArrowRight,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Clear booking policies and support to help protect hosts and creators during studio bookings.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Build trust through verified user information and reliable studio owner profiles.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description:
      "Help creators and studio owners maintain safe and responsible use of studio equipment.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description:
      "Get assistance with booking-related questions and support whenever you need help.",
  },
];

export default function HostSupport() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-20 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Why StudioSpace?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Your Creative Journey,
            <span className="text-blue-600 dark:text-blue-400">
              {" "}Our Priority.
            </span>
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-400">
            We bring studio owners and creative professionals together
            through a simple, transparent and convenient platform.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                  <Icon size={28} />
                </div>

                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  0{index + 1}
                </span>

                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Host CTA */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-blue-700 px-6 py-12 text-center text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left">
          <div>
            <div className="mb-4 flex justify-center lg:justify-start">
              <Users size={36} />
            </div>

            <h3 className="text-2xl font-extrabold sm:text-3xl">
              Own a Creative Studio?
            </h3>

            <p className="mt-3 max-w-xl leading-7 text-blue-100">
              Share your space with creators, reach more customers
              and grow your studio business with StudioSpace.
            </p>
          </div>

          <div className="mt-8 lg:mt-0 lg:ml-8">
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              List Your Studio
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
