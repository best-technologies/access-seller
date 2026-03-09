"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function MiniCartPreview() {
  const router = useRouter();
  const { cart } = useCart();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative pr-2 cursor-pointer flex items-center gap-2 group"
      aria-label={`Cart with ${cart.length} items`}
    >
      <div className="relative pr-1">
        <ShoppingCart className="w-8 h-8 text-gray-700 group-hover:text-brand-500" />
        <span className="absolute -top-1 -right-1 bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-semibold">
          {cart.length}
        </span>
      </div>
      <span className="hidden lg:inline text-gray-700 group-hover:text-brand-500 font-semibold text-sm">
        CART
      </span>
    </button>
  );
}
