"use client";

import { useRef } from "react";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import { stripHtmlTags } from "@/lib/utils";
import BookCard from "@/components/home/BookCard";

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

// Define the category sections to display
const CATEGORY_SECTIONS = [
  "Primary Book Titles",
  "E-Books",
  "Yoruba Literature",
  "Nursery Books",
  "Uncategorized",
  "Junior Secondary Books",
];

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

  const getBadgeIcon = (badge: Book["badge"]): React.ReactElement | null => {
    switch (badge) {
      case "Bestseller":
        return <Award className="w-3 h-3" />;
      case "Trending":
        return <TrendingUp className="w-3 h-3" />;
      case "Hot":
        return <span className="text-xs">🔥</span>;
      case "Editor's Choice":
        return <BookOpen className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getBadgeColor = (badge: Book["badge"]): string => {
    switch (badge) {
      case "Bestseller":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "Trending":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white";
      case "Hot":
        return "bg-gradient-to-r from-red-400 to-pink-500 text-white";
      case "Editor's Choice":
        return "bg-gradient-to-r from-purple-400 to-indigo-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Group books by category
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
      <div className="py-6 sm:py-8 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center w-full min-h-[200px]">
            <Loader size="lg" variant="primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 sm:py-8 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {CATEGORY_SECTIONS.map((categoryName) => {
          const categoryBooks = getBooksByCategory(categoryName);

          // Skip empty categories
          if (categoryBooks.length === 0) return null;

          return (
            <CategorySection
              key={categoryName}
              categoryName={categoryName}
              books={categoryBooks}
              useNewCard={categoryName === "Primary Book Titles"}
              isInCart={isInCart}
              isInWishlist={isInWishlist}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              toggleFavorite={toggleFavorite}
              getBadgeIcon={getBadgeIcon}
              getBadgeColor={getBadgeColor}
            />
          );
        })}
      </div>
    </div>
  );
}

// Separate component for each category section
interface CategorySectionProps {
  categoryName: string;
  books: Book[];
  useNewCard?: boolean;
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
  getBadgeIcon: (badge: Book["badge"]) => React.ReactElement | null;
  getBadgeColor: (badge: Book["badge"]) => string;
}

function CategorySection({
  categoryName,
  books,
  useNewCard = false,
  isInCart,
  isInWishlist,
  addToCart,
  removeFromCart,
  toggleFavorite,
  getBadgeIcon,
  getBadgeColor,
}: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.7;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {categoryName}
        </h2>
        <Link
          href={`/categories/${categorySlug}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors underline"
        >
          See All
        </Link>
      </div>

      {/* Books Container */}
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

        {/* Books Grid */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-3 sm:gap-4 px-1 sm:px-0 sm:snap-x sm:snap-mandatory scrollbar-hide scroll-smooth"
        >
          {books.map((b, index) => {
            const displayCategory = Array.isArray(b.category)
              ? b.category.join(", ")
              : typeof b.category === "string"
                ? b.category
                : "";

            if (useNewCard) {
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
            }

            const slug = `${b.id}-${b.title.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={b.id}
                href={`/products/${slug}`}
                className="group relative flex-none w-[140px] sm:w-[200px] transition-all duration-700"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  minHeight: 340,
                  maxHeight: 340,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 hover:scale-105 snap-start flex flex-col h-full">
                  {/* Book Image Container */}
                  <div className="aspect-[3/4] w-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="relative w-full h-full">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${b.image})` }}
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    {/* Badges */}
                    <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex flex-col gap-1">
                      {b.badge && (
                        <div
                          className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg ${getBadgeColor((["Bestseller", "Trending", "Hot", "Editor's Choice"].includes(b.badge as string) ? b.badge : undefined) as Book["badge"])}`}
                        >
                          {getBadgeIcon(
                            ([
                              "Bestseller",
                              "Trending",
                              "Hot",
                              "Editor's Choice",
                            ].includes(b.badge as string)
                              ? b.badge
                              : undefined) as Book["badge"],
                          )}
                          <span className="text-[8px] sm:text-[10px]">
                            {[
                              "Bestseller",
                              "Trending",
                              "Hot",
                              "Editor's Choice",
                            ].includes(b.badge as string)
                              ? b.badge
                              : ""}
                          </span>
                        </div>
                      )}
                      {b.discount && (
                        <div className="bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                          -{b.discount}%
                        </div>
                      )}
                      {b.isNew && (
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg">
                          New
                        </div>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(b);
                      }}
                      className={`absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
                        isInWishlist(String(b.id))
                          ? "bg-red-500 text-white"
                          : "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist(String(b.id)) ? "fill-current" : ""}`}
                      />
                    </button>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInCart(String(b.id))) {
                          removeFromCart(String(b.id));
                        } else {
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
                              category: Array.isArray(b.category)
                                ? b.category.join(", ")
                                : typeof b.category === "string"
                                  ? b.category
                                  : "",
                            },
                          });
                        }
                      }}
                      className={`absolute top-1.5 sm:top-2 right-12 sm:right-14 p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
                        isInCart(String(b.id))
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      <ShoppingCart
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${isInCart(String(b.id)) ? "fill-current" : ""}`}
                      />
                    </button>

                    {/* Quick Action Button */}
                    <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-full bg-white/95 backdrop-blur-sm text-gray-800 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm hover:bg-white transition-colors shadow-lg">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-4 flex flex-col flex-1">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
                        {displayCategory}
                      </span>
                    </div>

                    {/* Book Info */}
                    <h3 className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 truncate mb-2 mt-4 sm:mb-3 leading-relaxed">
                      {stripHtmlTags(b.desc)}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm sm:text-lg font-bold text-indigo-600">
                          ₦
                          {Number(b.price).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        {b.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                            ₦
                            {Number(b.originalPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Gradient Fade Effects */}
        <div className="hidden sm:block absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="hidden sm:block absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
