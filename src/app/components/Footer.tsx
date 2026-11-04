
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

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

const popularCategories = [
  { name: "Photography Studio", href: "/studios?category=Photography" },
  { name: "Music Studio", href: "/studios?category=Music" },
  { name: "Dance Studio", href: "/studios?category=Dance" },
  { name: "Podcast Studio", href: "/studios?category=Podcast" },
  { name: "Creative Workspace", href: "/studios" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Newsletter backend is not connected yet.
    toast("Newsletter subscription will be available soon.");
    setEmail("");
  };

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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand */}
<div>
  <Link
    href="/"
    className="inline-flex items-center rounded-xl bg-white px-4 py-2.5 shadow-md"
  >
    <Image
      src="/image/studiospacelogo1.png"
      alt="StudioSpace Logo"
      width={180}
      height={54}
      className="h-auto w-[180px] object-contain"
    />
  </Link>

  <p className="mt-5 max-w-xs text-sm leading-7 text-blue-100/70">
    Discover, book and share creative spaces.
    We connect studio owners with creators to bring
    amazing ideas to life.
  </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-sm font-bold text-blue-100 transition hover:bg-blue-500 hover:text-white"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-sm font-bold text-blue-100 transition hover:bg-pink-500 hover:text-white"
              >
                IG
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-sm font-bold text-blue-100 transition hover:bg-blue-600 hover:text-white"
              >
                in
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-xl border border-white/10 bg-white/10 p-3 text-lg font-bold text-blue-100 transition hover:bg-white hover:text-black"
              >
                𝕏
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

          {/* Host Links */}
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

          {/* Popular Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Popular Categories
              <span className="mt-2 block h-1 w-10 rounded-full bg-cyan-400" />
            </h3>

            <ul className="space-y-4">
              {popularCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-blue-100/70 transition hover:text-cyan-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              Get in Touch
              <span className="mt-2 block h-1 w-10 rounded-full bg-blue-400" />
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-blue-100/70">
                <Mail size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                <a
                  href="mailto:support@studiospace.com"
                  className="transition hover:text-cyan-300"
                >
                  support@studiospace.com
                </a>
              </div>

              <div className="flex items-start gap-3 text-sm text-blue-100/70">
                <MapPin size={18} className="mt-0.5 shrink-0 text-purple-300" />
                <span>Bangladesh</span>
              </div>
            </div>

            {/* Newsletter */}
            <h4 className="mb-3 mt-7 font-semibold">Newsletter</h4>

            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-blue-100/40 focus:border-cyan-400"
                required
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Main Footer ends here */}

        {/* Bottom Copyright */}
        <div className="mt-16 border-t border-white/10 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-blue-100/60">
              © {year} StudioSpace. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-sm text-blue-100/60">
              <Link
                href="/terms"
                className="transition hover:text-cyan-300"
              >
                Terms & Conditions
              </Link>
            </div>

            <p className="text-sm text-blue-100/60">
              Made with <span className="text-pink-400">♥</span> for creators, by creators.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
