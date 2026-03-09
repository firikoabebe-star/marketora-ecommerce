'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="mb-3 aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mb-1 font-medium">{product.name}</h3>
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </Link>
    </motion.div>
  );
}
