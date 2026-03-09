'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={onClose}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <Link href="/products" onClick={onClose} className="block py-2 font-medium">
                    All Products
                  </Link>
                  <Link href="/products?category=mens" onClick={onClose} className="block py-2 font-medium">
                    Men
                  </Link>
                  <Link href="/products?category=womens" onClick={onClose} className="block py-2 font-medium">
                    Women
                  </Link>
                  <Link href="/products?category=kids" onClick={onClose} className="block py-2 font-medium">
                    Kids
                  </Link>

                  <div className="border-t pt-4">
                    {isAuthenticated ? (
                      <>
                        <p className="mb-4 text-sm text-gray-600">Hi, {user?.firstName}</p>
                        <Link href="/orders" onClick={onClose} className="block py-2 font-medium">
                          My Orders
                        </Link>
                        <button onClick={() => { logout(); onClose(); }} className="block w-full py-2 text-left font-medium">
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={onClose} className="block py-2 font-medium">
                          Login
                        </Link>
                        <Link href="/register" onClick={onClose} className="block py-2 font-medium">
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
