"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useRef } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import BookCard from "@/components/home/BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  desc: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  image: string;
  releaseDate?: string;
  sellingPrice?: string;
  normalPrice?: string;
  category?: string;
}

interface NewArrivalsProps {
  books: Book[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function NewArrivals({
  books = [],
  loading = false,
  error = null,
  onRetry,
}: NewArrivalsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart, removeFromCart, cart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isInCart = (bookId: string) =>
    cart.some((item) => item.productId === bookId);

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
            New Arrivals
          </h2>
          <Link
            href="/products?sort=newest"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline"
          >
            See All
          </Link>
        </div>

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

          {/* Books Row */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 px-1 sm:px-0 scrollbar-hide scroll-smooth py-4 -my-4"
          >
            {loading ? (
              <div className="flex justify-center items-center w-full min-h-[200px]">
                <Loader size="lg" variant="primary" />
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center w-full min-h-[200px] text-red-500 gap-2">
                <span>{error}</span>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-colors text-xs font-medium mt-2"
                  >
                    <RotateCcw className="w-4 h-4 mr-1 animate-spin-slow" /> Try
                    Again
                  </button>
                )}
              </div>
            ) : books.length === 0 ? (
              <div className="flex justify-center items-center w-full min-h-[200px] text-gray-500">
                No new arrivals at the moment.
              </div>
            ) : (
              books.map((b) => (
                <BookCard
                  key={b.id}
                  id={String(b.id)}
                  title={b.title}
                  author={b.author}
                  price={b.price}
                  image={b.image}
                  isInCart={isInCart(String(b.id))}
                  isInWishlist={isInWishlist(String(b.id))}
                  onAddToCart={() =>
                    addToCart({
                      productId: String(b.id),
                      quantity: 1,
                      price: Number(b.price),
                      sellingPrice: Number(b.sellingPrice ?? b.price),
                      normalPrice: Number(
                        b.normalPrice ?? b.originalPrice ?? b.price,
                      ),
                      product: {
                        name: b.title,
                        image: b.image,
                        category: b.category ?? "",
                      },
                    })
                  }
                  onRemoveFromCart={() => removeFromCart(String(b.id))}
                  onToggleWishlist={() => {
                    if (isInWishlist(String(b.id))) {
                      removeFromWishlist(String(b.id));
                    } else {
                      addToWishlist({
                        id: String(b.id),
                        title: b.title,
                        author: b.author,
                        price: Number(b.price),
                        image: b.image,
                        category: b.category ?? "",
                        rating: b.rating,
                        reviews: b.reviews,
                        originalPrice: b.originalPrice
                          ? Number(b.originalPrice)
                          : undefined,
                        discount: undefined,
                        badge: undefined,
                        isNew: undefined,
                      });
                    }
                  }}
                />
              ))
            )}
          </div>

          {/* Gradient Fade Effects */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="hidden sm:block absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}
