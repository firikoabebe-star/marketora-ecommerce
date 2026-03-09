'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              STORE
            </Link>

            <div className="ml-10 hidden space-x-8 md:flex">
              <Link href="/products" className="text-sm font-medium hover:text-gray-600">
                All Products
              </Link>
              <Link href="/products?category=mens" className="text-sm font-medium hover:text-gray-600">
                Men
              </Link>
              <Link href="/products?category=womens" className="text-sm font-medium hover:text-gray-600">
                Women
              </Link>
              <Link href="/products?category=kids" className="text-sm font-medium hover:text-gray-600">
                Kids
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm md:inline">Hi, {user?.firstName}</span>
                <Link href="/orders" className="text-sm font-medium hover:text-gray-600">
                  Orders
                </Link>
                <button onClick={logout} className="text-sm font-medium hover:text-gray-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-gray-600">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-medium hover:text-gray-600">
                  Register
                </Link>
              </>
            )}

            <Link href="/cart" className="relative">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </nav>
  );
}
