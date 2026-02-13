"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carousel slides with responsive images for different screen sizes.
 *
 * Naming convention for images:
 * - Mobile: accessseller-carousel-XX-mobile.jpg
 * - Tablet: accessseller-carousel-XX-tablet.jpg
 * - Desktop: accessseller-carousel-XX-desktop.jpg
 *
 * All three sizes should be provided for optimal display across devices.
 */
const slides = [
  {
    mobile: "/images/hero-carousels/accessseller-carousel-01-mobile.jpg",
    tablet: "/images/hero-carousels/accessseller-carousel-01-tablet.jpg",
    desktop: "/images/hero-carousels/accessseller-carousel-01-desktop.jpg",
    alt: "Banner 1",
    href: "/products",
  },
  {
    mobile: "/images/hero-carousels/accessseller-carousel-02-mobile.jpg",
    tablet: "/images/hero-carousels/accessseller-carousel-02-tablet.jpg",
    desktop: "/images/hero-carousels/accessseller-carousel-02-desktop.jpg",
    alt: "Banner 2",
    href: "/products",
  },
  {
    mobile: "/images/hero-carousels/accessseller-carousel-03-mobile.jpg",
    tablet: "/images/hero-carousels/accessseller-carousel-03-tablet.jpg",
    desktop: "/images/hero-carousels/accessseller-carousel-03-desktop.jpg",
    alt: "Banner 3",
    href: "/products",
  },
];

const AUTO_PLAY_INTERVAL = 6000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section
      className="relative w-full overflow-hidden h-[calc(100vh-140px)] sm:h-[calc(100vh-148px)] lg:h-[calc(100vh-136px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <Link
            key={i}
            href={slide.href}
            title="Learn More"
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Mobile Image */}
            <Image
              src={slide.mobile}
              alt={slide.alt}
              fill
              className="object-cover block md:hidden"
              priority={i === 0}
              sizes="100vw"
              quality={90}
            />

            {/* Tablet Image */}
            <Image
              src={slide.tablet}
              alt={slide.alt}
              fill
              className="object-cover hidden md:block lg:hidden"
              priority={i === 0}
              sizes="100vw"
              quality={90}
            />

            {/* Desktop Image */}
            <Image
              src={slide.desktop}
              alt={slide.alt}
              fill
              className="object-cover hidden lg:block"
              priority={i === 0}
              sizes="100vw"
              quality={90}
            />
          </Link>
        ))}
      </div>

      {/* Dot indicators — bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-3 h-3 bg-brand-500"
                : "w-2.5 h-2.5 bg-brand-300"
            }`}
          />
        ))}
      </div>

      {/* Arrow controls — bottom right */}
      <div className="absolute bottom-5 right-5 hidden md:flex items-center gap-2 z-10">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-300 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-300 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
