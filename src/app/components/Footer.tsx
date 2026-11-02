// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// import {
//   Camera,
//   Users,
//   BriefcaseBusiness,
//   Mail,
//   MapPin,
//   ArrowRight,
// } from "lucide-react";

// const quickLinks = [
//   { name: "Home", href: "/" },
//   { name: "Explore Studios", href: "/studios" },
//   { name: "How It Works", href: "/#how-it-works" },
//   { name: "About Us", href: "/#about" },
// ];

// const hostLinks = [
//   { name: "Become a Host", href: "/add-studio" },
//   { name: "My Studio Listings", href: "/my-listings" },
//   { name: "My Bookings", href: "/my-bookings" },
// ];

// export default function Footer() {
//     const [year, setYear] = useState(2026);

// useEffect(() => {
//   setYear(new Date().getFullYear());
// }, []);
//   return (
//     <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
//       <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

//         {/* Main Footer */}
//         <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

//           {/* Brand */}
//           <div>
//             <Link
//               href="/"
//               className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400"
//             >
//               StudioSpace<span className="text-gray-900 dark:text-white">.</span>
//             </Link>

//             <p className="mt-5 max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
//               Discover, book and share creative spaces.
//               StudioSpace connects studio owners with creators
//               to bring great ideas to life.
//             </p>

//             <div className="mt-6 flex gap-3">
//               <a
//                 href="https://www.facebook.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300"
//               >
//                 <Users size={19} />
//               </a>

//               <a
//                 href="https://www.instagram.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300"
//               >
//                 <Camera size={19} />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-300"
//               >
//                 <BriefcaseBusiness size={19} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-bold text-gray-900 dark:text-white">
//               Quick Links
//             </h3>

//             <ul className="mt-5 space-y-4">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* For Hosts */}
//           <div>
//             <h3 className="font-bold text-gray-900 dark:text-white">
//               For Studio Owners
//             </h3>

//             <ul className="mt-5 space-y-4">
//               {hostLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-sm text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="font-bold text-gray-900 dark:text-white">
//               Get in Touch
//             </h3>

//             <div className="mt-5 space-y-5">
//               <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
//                 <Mail size={19} className="mt-0.5 shrink-0 text-blue-600" />
//                 <a
//                   href="mailto:support@studiospace.com"
//                   className="hover:text-blue-600"
//                 >
//                   support@studiospace.com
//                 </a>
//               </div>

//               <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
//                 <MapPin size={19} className="mt-0.5 shrink-0 text-blue-600" />
//                 <span>Bangladesh</span>
//               </div>
//             </div>

//             <Link
//               href="/studios"
//               className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
//             >
//               Explore Studios
//               <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-14 border-t border-gray-200 pt-7 text-center dark:border-gray-800">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             © {year} StudioSpace. All rights reserved.
//           </p>

//           <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
//             Made for creators, by creators.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Camera,
  Users,
  BriefcaseBusiness,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const hostLinks = [
  { name: "Become a Host", href: "/add-studio" },
  { name: "My Studio Listings", href: "/my-listings" },
  { name: "My Bookings", href: "/my-bookings" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-purple-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Top CTA */}
        <div className="mb-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <Sparkles size={18} />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Create Without Limits
              </span>
            </div>

            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Have a Creative Space?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-blue-100/70">
              Share your studio with creators and turn your space
              into an opportunity.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-blue-500/40"
          >
            Become a Host
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-3xl font-extrabold tracking-tight"
            >
              Studio<span className="text-cyan-400">Space</span>
              <span className="text-purple-400">.</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-blue-100/70">
              Discover, book and share creative spaces.
              We connect studio owners with creators to bring
              amazing ideas to life.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-blue-100 transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950"
              >
                <Users size={19} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-blue-100 transition hover:border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Camera size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-blue-100 transition hover:border-blue-400 hover:bg-blue-400 hover:text-white"
              >
                <BriefcaseBusiness size={19} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Quick Links
              <span className="mt-2 block h-1 w-10 rounded-full bg-cyan-400" />
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-blue-100/70 transition hover:translate-x-1 hover:text-cyan-300"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              For Studio Owners
              <span className="mt-2 block h-1 w-10 rounded-full bg-purple-400" />
            </h3>

            <ul className="space-y-4">
              {hostLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-blue-100/70 transition hover:translate-x-1 hover:text-purple-300"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Get in Touch
              <span className="mt-2 block h-1 w-10 rounded-full bg-blue-400" />
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3 text-sm text-blue-100/70">
                <div className="rounded-lg bg-cyan-400/10 p-2 text-cyan-300">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:support@studiospace.com"
                  className="mt-2 transition hover:text-cyan-300"
                >
                  support@studiospace.com
                </a>
              </div>

              <div className="flex items-start gap-3 text-sm text-blue-100/70">
                <div className="rounded-lg bg-purple-400/10 p-2 text-purple-300">
                  <MapPin size={18} />
                </div>
                <span className="mt-2">Bangladesh</span>
              </div>
            </div>

            <Link
              href="/studios"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:gap-3"
            >
              Explore Studios
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 border-t border-white/10 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-blue-100/60">
              © {year} StudioSpace. All rights reserved.
            </p>

            <p className="text-sm text-blue-100/60">
              Made with <span className="text-pink-400">♥</span> for creators, by creators.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
