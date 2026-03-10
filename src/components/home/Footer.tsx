"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  GraduationCap,
  BookText,
  Coins,
  BookHeart,
  Send,
} from "lucide-react";

const categoryLinks = [
  { name: "E-Books", href: "/categories/e-books", icon: BookOpen },
  {
    name: "Primary School Books",
    href: "/categories/primary-school",
    icon: GraduationCap,
  },
  {
    name: "Junior Secondary",
    href: "/categories/junior-secondary",
    icon: BookText,
  },
  {
    name: "Senior Secondary",
    href: "/categories/senior-secondary",
    icon: GraduationCap,
  },
  { name: "Money Making", href: "/categories/money-making", icon: Coins },
  { name: "Fiction", href: "/categories/fiction", icon: BookHeart },
];

const usefulLinks = [
  { name: "About Access Seller", href: "/about" },
  { name: "Help Centre", href: "/help" },
  { name: "Contact Us", href: "/help/contact" },
  { name: "Report a Product", href: "/help/report-product" },
  { name: "Returns & Refund Timeline", href: "/help/returns-timeline" },
  { name: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: integrate with newsletter API
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Column 1: Brand Logo + Payment Methods */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/accessseller-logo.png"
                alt="Access&Sellr Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 mb-4 text-center sm:text-left">
              Your one-stop bookstore for textbooks, e-books, and more.
            </p>
            <h4 className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-3">
              We Accept
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Bank Transfer */}
              <div className="flex items-center h-9 px-3">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M12 3v4M6 7V5M18 7V5" />
                  <path d="M6 13h.01M10 13h.01M14 13h.01M18 13h.01" />
                  <path d="M6 17h12" />
                </svg>
                <span className="text-[10px] font-medium text-gray-600 ml-1">
                  Transfer
                </span>
              </div>
              {/* Mastercard */}
              <Image
                src="/images/icons/mastercard-logo.svg"
                alt="Mastercard"
                width={36}
                height={24}
                className="w-9 h-6 object-contain"
              />
              {/* Visa */}
              <Image
                src="/images/icons/visa-logo.svg"
                alt="Visa"
                width={36}
                height={24}
                className="w-9 h-6 object-contain"
              />
              {/* Verve */}
              <Image
                src="/images/icons/verve-logo.svg"
                alt="Verve"
                width={36}
                height={24}
                className="w-9 h-6 object-contain"
              />
            </div>
          </div>

          {/* Column 2: Newsletter + Social Icons */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-500 mb-3 text-center sm:text-left">
              Subscribe to our newsletter for deals and new arrivals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="w-full max-w-xs">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-r-md transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-green-600 mt-1.5">
                  Subscribed successfully!
                </p>
              )}
            </form>

            {/* Social Icons */}
            <h4 className="text-sm font-semibold text-brand-500 uppercase tracking-wider mt-5 mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-brand-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-brand-500 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-brand-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-brand-500 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Useful Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
              Useful Links
            </h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-500 transition-colors block text-center sm:text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-500 transition-colors block text-center sm:text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Affiliate Ad */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-3">
              Become Our Affiliate
            </h4>
            <Link
              href="/affiliate"
              className="block rounded-full overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <Image
                src="/images/ads/affilliate-ads.png"
                alt="Become an affiliate - Earn commissions by promoting our books"
                width={240}
                height={300}
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Access&amp;Sellr. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link
              href="/terms-and-conditions"
              className="hover:text-brand-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies-policy"
              className="hover:text-brand-500 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-brand-500 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
