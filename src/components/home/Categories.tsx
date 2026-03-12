"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  name: string;
  description?: string;
  image: string;
  count: string;
}

interface CategoriesProps {
  categories: Category[];
  loading?: boolean;
  error?: string | null;
}

export default function Categories({
  categories = [],
  loading = false,
  error = null,
}: CategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-6 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Popular Categories
          </h2>
          <Link
            href="/categories"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline"
          >
            See All
          </Link>
        </div>

        {/* Categories Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Categories Row */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-4 -my-4 gap-3 px-1 sm:px-0 scrollbar-hide scroll-smooth"
          >
            {loading ? (
              <div className="flex justify-center items-center w-full min-h-[200px]">
                <Loader size="lg" variant="primary" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center w-full min-h-[200px] text-red-500">
                {error}
              </div>
            ) : categories.length === 0 ? (
              <div className="flex justify-center items-center w-full min-h-[200px] text-gray-500">
                No categories at the moment.
              </div>
            ) : (
              categories.map((cat) => {
                const categorySlug = cat.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                return (
                  <Link
                    key={cat.name}
                    href={`/categories/${categorySlug}`}
                    className="flex-none"
                  >
                    <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]">
                      <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
                          <div className="text-white">
                            <h3 className="text-lg sm:text-xl font-bold mb-1">
                              {cat.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-medium">
                                {cat.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>

          {/* Gradient Fade Effects */}
          <div className="hidden sm:block pointer-events-none absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          <div className="hidden sm:block pointer-events-none absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}
