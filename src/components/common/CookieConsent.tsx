"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie_consent_accepted";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Show consent banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setShowConsent(false);
  };

  const dismissConsent = () => {
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 sm:p-6 lg:left-6 lg:right-auto lg:bottom-6 lg:max-w-md animate-in slide-in-from-bottom duration-300">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 relative">
        {/* Close button - optional, for better UX */}
        <button
          onClick={dismissConsent}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pr-8">
          This website uses cookies
        </h2>

        {/* Content */}
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          This website uses cookies. For further information on how we use
          cookies you can read our{" "}
          <Link
            href="/cookies-policy"
            className="text-blue-600 hover:text-blue-700 underline transition-colors"
          >
            Privacy and Cookie notice
          </Link>
        </p>

        {/* Accept Button */}
        <div className="flex justify-start">
          <button
            onClick={acceptCookies}
            className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-md transition-colors shadow-sm hover:shadow-md"
          >
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}
