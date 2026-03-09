'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden bg-gray-100">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-white"
        >
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">
            Elevate Your Style
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Discover premium fashion that defines you. Shop the latest collection now.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
