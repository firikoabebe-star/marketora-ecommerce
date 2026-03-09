'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.slice(0, 3).map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/products?category=${category.slug}`} className="group block">
              <div className="relative h-80 overflow-hidden bg-gray-100">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
