"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import BookCard from "@/components/home/BookCard";
import AdsBanner from "@/components/home/AdsBanner";

interface Book {
  id: string;
  title: string;
  author: string;
  desc: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  category: string | string[];
  badge?: "Bestseller" | "Trending" | "Hot" | "Editor's Choice";
  discount?: number;
  isNew?: boolean;
  sellingPrice?: string;
  normalPrice?: string;
}

interface FeaturedBooksProps {
  books: Book[];
  available_categories?: Array<{ id: string; name: string }>;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const CATEGORY_SECTIONS = [
  "Nursery Books",
  "Primary Book Titles",
  "E-Books",
  "Yoruba Literature",
  "Uncategorized",
  "Junior Secondary Books",
];

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "Primary Book Titles": "Primary Books",
};

export default function FeaturedBooks({
  books = [],
  loading = false,
  error = null,
  onRetry,
}: FeaturedBooksProps) {
  const { addToCart, cart, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isInCart = (bookId: string) => {
    return cart.some((item) => item.productId === bookId);
  };

  const toggleFavorite = (book: Book): void => {
    const bookId = String(book.id);

    if (isInWishlist(bookId)) {
      removeFromWishlist(bookId);
    } else {
      addToWishlist({
        id: bookId,
        title: book.title,
        author: book.author,
        price: Number(book.price),
        image: book.image,
        category: Array.isArray(book.category)
          ? book.category.join(", ")
          : typeof book.category === "string"
            ? book.category
            : "",
        rating: book.rating,
        reviews: book.reviews,
        originalPrice: book.originalPrice
          ? Number(book.originalPrice)
          : undefined,
        discount: book.discount,
        badge: book.badge,
        isNew: book.isNew,
      });
    }
  };

  const getBooksByCategory = (categoryName: string): Book[] => {
    return books.filter((book) => {
      const categories = Array.isArray(book.category)
        ? book.category
        : typeof book.category === "string"
          ? book.category.split(",").map((c) => c.trim())
          : [];

      if (categoryName === "Uncategorized") {
        return categories.length === 0 || categories.every((c) => !c);
      }

      return categories.some(
        (cat) => cat.toLowerCase() === categoryName.toLowerCase(),
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[200px]">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[200px] text-red-500 gap-2">
        <span>{error}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-colors text-xs font-medium mt-2"
          >
            <RotateCcw className="w-4 h-4 mr-1 animate-spin-slow" /> Try Again
          </button>
        )}
      </div>
    );
  }

  const activeSections = CATEGORY_SECTIONS.filter(
    (name) => getBooksByCategory(name).length > 0,
  );

  const elements: React.ReactNode[] = [];
  activeSections.forEach((categoryName, index) => {
    elements.push(
      <CategorySection
        key={categoryName}
        categoryName={categoryName}
        displayName={CATEGORY_DISPLAY_NAMES[categoryName] || categoryName}
        books={getBooksByCategory(categoryName)}
        isInCart={isInCart}
        isInWishlist={isInWishlist}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        toggleFavorite={toggleFavorite}
      />,
    );

    const isAfterPair = (index + 1) % 2 === 0;
    const isNotLast = index < activeSections.length - 1;
    if (isAfterPair && isNotLast) {
      elements.push(
        <AdsBanner
          key={`ads-${index}`}
          mobileImage="/images/ads/ads-banner-mobile.png"
          tabletImage="/images/ads/ads-banner-tablet.png"
          desktopImage="/images/ads/ads-banner-desktop.png"
        />,
      );
    }
  });

  return <div className="space-y-10">{elements}</div>;
}

interface CategorySectionProps {
  categoryName: string;
  displayName?: string;
  books: Book[];
  isInCart: (bookId: string) => boolean;
  isInWishlist: (bookId: string) => boolean;
  addToCart: (item: {
    productId: string;
    quantity: number;
    price: number;
    sellingPrice: number;
    normalPrice: number;
    product: { name: string; image: string; category: string };
  }) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (book: Book) => void;
}

function CategorySection({
  categoryName,
  displayName,
  books,
  isInCart,
  isInWishlist,
  addToCart,
  removeFromCart,
  toggleFavorite,
}: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollable = el.scrollWidth > el.clientWidth + 1;
    setCanScroll(scrollable);

    if (!scrollable) {
      setIsAtStart(true);
      setIsAtEnd(false);
      return;
    }

    const threshold = 10;
    setIsAtStart(el.scrollLeft <= threshold);
    setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - threshold);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });

    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollTo({
      left:
        direction === "left"
          ? el.scrollLeft - amount
          : el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-");
  const showNavButtons = canScroll && !isAtEnd;

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {displayName || categoryName}
        </h2>

        {showNavButtons ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              disabled={isAtStart}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
                isAtStart
                  ? "border-gray-200 text-gray-300 cursor-default"
                  : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm flex items-center justify-center transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href={`/categories/${categorySlug}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline"
          >
            See All
          </Link>
        )}
      </div>

      {/* Books Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 sm:gap-4 scrollbar-hide scroll-smooth py-4 -my-4"
      >
        {books.map((b) => {
          const displayCategory = Array.isArray(b.category)
            ? b.category.join(", ")
            : typeof b.category === "string"
              ? b.category
              : "";

          return (
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
                    category: displayCategory,
                  },
                })
              }
              onRemoveFromCart={() => removeFromCart(String(b.id))}
              onToggleWishlist={() => toggleFavorite(b)}
            />
          );
        })}
      </div>
    </div>
  );
}
