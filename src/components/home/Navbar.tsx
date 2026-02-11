"use client";

import { useState, useRef } from "react";
import MiniCartPreview from "@/components/home/MiniCartPreview";
import {
  X,
  BookOpen,
  CircleUserRound,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
  LogOut,
  Search,
  Heart,
  UserPlus,
  Menu,
  HelpCircle,
  ShoppingBag,
  Sparkles,
  GraduationCap,
  BookText,
  Coins,
  BookHeart,
} from "lucide-react";
import { BrandedButton } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { api } from "@/services/api";
import Image from "next/image";

// Define a type for suggestions
interface SearchSuggestion {
  id: string;
  title: string;
  author: string;
  image: string;
  slug: string;
}

// Category links for navigation
const categoryLinks = [
  { name: "E-BOOKS", href: "/categories/e-books", icon: BookOpen },
  {
    name: "PRIMARY SCH BOOKS",
    href: "/categories/primary-school",
    icon: GraduationCap,
  },
  {
    name: "JUNIOR SECONDARY",
    href: "/categories/junior-secondary",
    icon: BookText,
  },
  {
    name: "SENIOR SECONDARY",
    href: "/categories/senior-secondary",
    icon: GraduationCap,
  },
  { name: "MONEY MAKING", href: "/categories/money-making", icon: Coins },
  { name: "FICTION", href: "/categories/fiction", icon: BookHeart },
];

// Promo banners for rotation
const promoBanners = [
  "📚 Free Shipping on Orders of ₦15,000 or More",
  "🎉 New Arrivals: Check out our latest bestsellers!",
  "💰 Save 20% on all E-Books this week!",
  "🎓 Back to School Sale - Up to 30% Off!",
];

// Mocked async fetch for search suggestions
async function fetchSearchSuggestions(
  query: string,
): Promise<SearchSuggestion[]> {
  return api.public.getSearchSuggestions(query);
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [loadingPrintingPress] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const successMessage = await logout();
      setIsUserMenuOpen(false);
      toast.success(successMessage);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleWishlistClick = () => {
    router.push("/wishlist");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowSuggestions(!!value && value.length >= 2);
    setHighlighted(-1);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (value.length < 2) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    debounceTimeout.current = setTimeout(async () => {
      const results = await fetchSearchSuggestions(value);
      setSuggestions(results);
      setIsLoadingSuggestions(false);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearch("");
    setShowSuggestions(false);
    router.push(`/products/${suggestion.slug}`);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 120);
  };

  const handleInputFocus = () => {
    if (search.length >= 2 && suggestions.length > 0) setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && highlighted < suggestions.length) {
        handleSuggestionClick(suggestions[highlighted]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearch("");
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % promoBanners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + promoBanners.length) % promoBanners.length,
    );
  };

  // Search suggestions dropdown component
  const SearchSuggestionsDropdown = () =>
    showSuggestions && (
      <div className="absolute left-0 right-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
        {isLoadingSuggestions ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            Searching...
          </div>
        ) : suggestions.length === 0 ? (
          <div className="p-4 text-center text-gray-400 text-sm">
            No results found
          </div>
        ) : (
          suggestions.map((s, i) => (
            <div
              key={s.id}
              onMouseDown={() => handleSuggestionClick(s)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${highlighted === i ? "bg-brand-50" : "hover:bg-gray-50"}`}
            >
              <Image
                src={s.image}
                alt={s.title}
                width={40}
                height={56}
                className="w-10 h-14 object-cover rounded shadow"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {s.title}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1">
                  {s.author}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );

  return (
    <>
      {/* Loader for Printing Press */}
      {loadingPrintingPress && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30">
          <Loader
            title="Loading Printing Press..."
            message="Preparing the Printing Press dashboard..."
          />
        </div>
      )}

      {/* ========== MOBILE & TABLET NAVBAR (below lg breakpoint) ========== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] lg:hidden">
        {/* Promo Banner */}
        <div className="bg-brand-500 text-white">
          <div className="flex items-center justify-between px-2 py-2">
            <button
              onClick={prevBanner}
              className="p-1 hover:bg-brand-600 rounded transition-colors"
              aria-label="Previous promotion"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-xs sm:text-sm font-medium text-center flex-1 px-2">
              {promoBanners[currentBannerIndex]}
            </p>
            <button
              onClick={nextBanner}
              className="p-1 hover:bg-brand-600 rounded transition-colors"
              aria-label="Next promotion"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Navbar Row */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-3 py-3">
            {/* Left: Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 hover:text-brand-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: Logo */}
            <Link href="/" className="flex-1 flex justify-center">
              <span className="text-xl sm:text-2xl font-bold">
                <span className="text-slate-800">Access</span>
                <span className="text-brand-500">&</span>
                <span className="text-slate-800">Sellr</span>
              </span>
            </Link>

            {/* Right: User Icon & Cart */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="py-2 text-gray-700 hover:text-brand-700 transition-colors relative"
                aria-label="Account"
              >
                <CircleUserRound className="w-6 h-6" />
              </button>
              <MiniCartPreview />
            </div>
          </div>

          {/* Search Bar Row */}
          <div className="px-3 pb-3">
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Site search"
            >
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by Title, Author, or ISBN"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none bg-white text-gray-800 placeholder-gray-400 text-sm"
                  aria-label="Search for books"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 bg-brand-500 hover:bg-brand-600 text-white transition-colors rounded-r-sm"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <SearchSuggestionsDropdown />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile User Dropdown (positioned below navbar) */}
        {isUserMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[98]"
              onClick={() => setIsUserMenuOpen(false)}
            />
            <div className="absolute right-3 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[99]">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      Hi, {user?.first_name || "CircleUserRound"}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <CircleUserRound className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">My Account</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Orders</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-brand-600 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 my-2"
                  >
                    <BrandedButton size="sm" className="w-full">
                      Sign In
                    </BrandedButton>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <CircleUserRound className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">My Account</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Orders</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </nav>

      {/* ========== DESKTOP NAVBAR (lg and above) ========== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] hidden lg:block">
        {/* Promo Banner */}
        <div className="bg-brand-500 text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-2">
            <button
              onClick={prevBanner}
              className="p-1 hover:bg-brand-600 rounded transition-colors mr-4"
              aria-label="Previous promotion"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <p className="text-sm font-medium uppercase tracking-wide">
              {promoBanners[currentBannerIndex]}
            </p>
            <button
              onClick={nextBanner}
              className="p-1 hover:bg-brand-600 rounded transition-colors ml-4"
              aria-label="Next promotion"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Navigation Row (Categories Left, Account/Wishlist Right) */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-10">
              {/* Left: Category Links */}
              <div className="flex items-center space-x-1">
                {categoryLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-xs font-medium text-gray-700 hover:text-brand-600 transition-colors px-2 py-1 whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                    {index < categoryLinks.length - 1 && (
                      <span className="text-gray-300">|</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Right: My Account & Wishlist */}
              <div className="flex items-center space-x-4">
                {/* My Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                    className="flex items-center space-x-1.5 text-gray-700 hover:text-brand-600 transition-colors py-2"
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span className="text-xs font-medium">MY ACCOUNT</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-0 w-56 bg-white rounded-b-lg shadow-xl border border-gray-200 py-2 z-[101]"
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-sm font-medium text-gray-700">
                              Hi, {user?.first_name || "CircleUserRound"}{" "}
                              <ChevronDown className="w-3 h-3 inline" />
                            </p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <CircleUserRound className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">My Account</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Orders</span>
                          </Link>
                          <Link
                            href="/inbox"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <ShoppingBag className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Inbox</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Wishlist</span>
                          </Link>
                          <Link
                            href="/vouchers"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Sparkles className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Voucher</span>
                          </Link>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center px-4 py-2.5 text-brand-600 hover:bg-gray-50"
                          >
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/auth/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 my-2"
                          >
                            <BrandedButton size="sm" className="w-full">
                              Sign In
                            </BrandedButton>
                          </Link>
                          <Link
                            href="/auth/register"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <UserPlus className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Register</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Package className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Orders</span>
                          </Link>
                          <Link
                            href="/wishlist"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Heart className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Wishlist</span>
                          </Link>
                          <Link
                            href="/help"
                            className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <HelpCircle className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">Help</span>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-gray-300">|</span>

                {/* Wishlist */}
                <button
                  onClick={handleWishlistClick}
                  className="flex items-center space-x-1.5 text-gray-700 hover:text-brand-500 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-medium">WISHLIST</span>
                  {wishlistCount > 0 && (
                    <span className="bg-brand-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Logo Row (Logo, Search, Cart) */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16 gap-8">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold">
                  <span className="text-slate-800">Access</span>
                  <span className="text-brand-500">&</span>
                  <span className="text-slate-800">Sellr</span>
                </span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <form
                  onSubmit={handleSearchSubmit}
                  role="search"
                  aria-label="Site search"
                >
                  <div className="relative flex">
                    <input
                      type="text"
                      value={search}
                      onChange={handleSearchChange}
                      onBlur={handleInputBlur}
                      onFocus={handleInputFocus}
                      onKeyDown={handleKeyDown}
                      placeholder="Search by Title, Author, Keyword or ISBN"
                      className="w-full px-4 py-2.5 border border-gray-300 border-r-0 rounded-l-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none bg-white text-gray-800 placeholder-gray-400 text-sm"
                      aria-label="Search for books"
                    />
                    <button
                      type="submit"
                      className="px-5 bg-brand-500 hover:bg-brand-600 text-white transition-colors rounded-r-sm flex items-center justify-center"
                      aria-label="Search"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    <SearchSuggestionsDropdown />
                  </div>
                </form>
              </div>

              {/* Cart */}
              <div className="flex-shrink-0">
                <MiniCartPreview />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== MOBILE SLIDE-IN MENU ========== */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[150] lg:hidden"
          onClick={handleBackdropClick}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl overflow-hidden flex flex-col">
            {/* Menu Header */}
            <div className="bg-brand-500 text-white p-4 flex items-center justify-between">
              <span className="text-lg font-semibold">Logo</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-brand-600 rounded transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="bg-white p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                    <CircleUserRound className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Hi, {user?.first_name || "CircleUserRound"}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-gray-200 space-y-2">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <BrandedButton className="w-full">Sign In</BrandedButton>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BrandedButton variant="outline" className="w-full mt-4">
                    Register
                  </BrandedButton>
                </Link>
              </div>
            )}

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Navigation */}
              {/* Seems redundant */}
              {/* <nav className="p-2">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HomeIcon className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
                <Link
                  href="/products"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">Browse All</span>
                </Link>
              </nav> */}

              {/* Categories */}
              <div className="border-t border-gray-200 p-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Categories
                </p>
                {categoryLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Account Section */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 p-2">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Account
                  </p>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CircleUserRound className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium">My Account</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium">Orders</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium">Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/vouchers"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium">Vouchers</span>
                  </Link>
                  {(user?.role === "admin" || user?.role === "super_admin") && (
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CircleUserRound className="w-5 h-5 text-slate-600" />
                      <span className="text-sm font-medium">Admin Panel</span>
                    </Link>
                  )}
                </div>
              )}

              {/* Help */}
              <div className="border-t border-gray-200 p-2">
                <Link
                  href="/help"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium">Help & Support</span>
                </Link>
              </div>
            </div>

            {/* Logout Button (if authenticated) */}
            {isAuthenticated && (
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 text-brand-600 hover:bg-brand-50 rounded-md transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      {/* Mobile/Tablet spacer */}
      <div className="h-[140px] sm:h-[148px] lg:hidden" />
      {/* Desktop spacer */}
      <div className="hidden lg:block h-[136px]" />
    </>
  );
}
