
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const slides = [
  {
    title: "Find the Perfect",
    highlight: "Space to Create.",
    description:
      "Discover inspiring photography studios and creative spaces. Bring your vision to life in the perfect environment.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&auto=format&fit=crop&q=85",
    label: "PHOTOGRAPHY & CREATIVE SPACES",
  },
  {
    title: "Make Your Music",
    highlight: "Come to Life.",
    description:
      "Find professional music studios equipped for recording, mixing and producing your next masterpiece.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&auto=format&fit=crop&q=85",
    label: "PROFESSIONAL MUSIC STUDIOS",
  },
  {
    title: "Share Your Voice",
    highlight: "Create Something Big.",
    description:
      "Discover podcast and content creation studios designed to make every recording sound professional.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1400&auto=format&fit=crop&q=85",
    label: "PODCAST & RECORDING SPACES",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic Slide Change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Previous Slide
  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  // Next Slide
  const nextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <div
        className="relative flex min-h-[500px] items-center overflow-hidden rounded-3xl bg-cover bg-center sm:min-h-[550px]"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

        {/* Slide Content */}
        <div className="relative z-10 max-w-3xl px-6 py-16 text-white sm:px-12 lg:px-16">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Star size={16} className="text-yellow-400" />
            {slide.label}
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {slide.title}
            <span className="block text-blue-400">
              {slide.highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-200 sm:text-lg">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/studios"
              className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Studios →
            </Link>

            <Link
              href="/studios"
              className="rounded-xl border border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white hover:text-gray-900"
            >
              Host Your Space
            </Link>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-blue-600 sm:left-6"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-blue-600 sm:right-6"
        >
          <ArrowRight size={22} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {slides.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-9 bg-blue-500"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 right-6 z-20 rounded-lg bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
}
