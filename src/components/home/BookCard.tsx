"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Sparkles } from "lucide-react";
import { BrandedButton } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onToggleWishlist: () => void;
  isInCart: boolean;
  isInWishlist: boolean;
}

export default function BookCard({
  id,
  title,
  author,
  price,
  image,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
  isInCart,
  isInWishlist,
}: BookCardProps) {
  const [mobileActive, setMobileActive] = useState(false);
  const slug = `${id}-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="group relative flex-none w-[170px] sm:w-[230px] snap-start">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg p-2 sm:p-2.5 h-full">
        {/* Base card content */}
        <div className="flex flex-col h-full">
          {/* Inner image container */}
          <div className="relative bg-brand-100 rounded-xl sm:rounded-2xl overflow-hidden">
            {/* Price badge */}
            <div className="absolute top-2 right-2.5 z-10">
              <span className="text-sm sm:text-base font-bold text-brand-900">
                ₦{Number(price).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>

            {/* Book image — fully visible, not cropped */}
            <div className="flex items-center justify-center px-5 sm:px-7 py-6 sm:py-8 min-h-[190px] sm:min-h-[230px]">
              <img
                src={image}
                alt={title}
                className="max-h-[150px] sm:max-h-[190px] w-auto object-contain drop-shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title & author */}
          <div className="pt-2.5 sm:pt-3 px-1 pb-1">
            <h3 className="font-bold text-xs sm:text-sm line-clamp-2 text-gray-900 leading-tight">
              {title}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">
              {author}
            </p>
          </div>
        </div>

        {/* ── Overlay (hover on desktop, tap on mobile) ── */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center",
            "px-4 sm:px-5 py-6 transition-all duration-300 z-30",
            "bg-gradient-to-b from-brand-700 via-brand-900 to-brand-950",
            "sm:opacity-0 sm:pointer-events-none",
            "sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto",
            mobileActive
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileActive(false);
          }}
        >
          {/* Book title */}
          <h3 className="text-brand-200 font-semibold italic text-sm sm:text-base text-center mb-6 line-clamp-2 px-1">
            {title}
          </h3>

          {/* Action items */}
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isInCart) onRemoveFromCart();
                else onAddToCart();
              }}
              className="flex items-center gap-2.5 text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
              }}
              className="flex items-center gap-2.5 text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
            >
              <Heart
                className={cn(
                  "w-4 h-4 sm:w-[18px] sm:h-[18px]",
                  isInWishlist && "fill-current text-red-400",
                )}
              />
              <span>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </button>

            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <Link href={`/products/${slug}`}>
                <BrandedButton size="sm" variant="outline">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Full Details
                </BrandedButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile tap target — only present when overlay is hidden */}
        {!mobileActive && (
          <div
            className="absolute inset-0 z-20 sm:hidden"
            onClick={() => setMobileActive(true)}
            role="button"
            tabIndex={0}
            aria-label="Show book actions"
          />
        )}
      </div>
    </div>
  );
}
