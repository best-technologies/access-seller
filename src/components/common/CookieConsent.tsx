"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrandedButton } from "@/components/ui/button";

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

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 sm:p-6 md:right-6 md:left-auto md:bottom-6 md:max-w-md animate-in slide-in-from-bottom duration-300">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          This website uses cookies
        </h2>

        {/* Content */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
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
        <div className="flex justify-end">
          <BrandedButton
            onClick={acceptCookies}
            className="w-full sm:w-auto"
            size="default"
          >
            Accept cookies
          </BrandedButton>
        </div>
      </div>
    </div>
  );
}
