"use client";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CookieConsent from "@/components/common/CookieConsent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main>{children}</main>

              {/* Footer */}
              <Footer />

              {/* Toaster for notifications */}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                    fontSize: "14px",
                  },
                  success: {
                    duration: 2000,
                    style: {
                      background: "#10b981",
                      color: "#fff",
                      fontSize: "14px",
                    },
                  },
                  error: {
                    duration: 2000,
                    style: {
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: "14px",
                    },
                  },
                }}
              />

              {/* Cookie Consent Banner */}
              <CookieConsent />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
