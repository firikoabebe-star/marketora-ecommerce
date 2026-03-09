'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const setCart = useCartStore((state) => state.setCart);

  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${params.slug}`);
        setProduct(data.data.product);

        if (data.data.product.variants.length > 0) {
          setSelectedSize(data.data.product.variants[0].size);
          setSelectedColor(data.data.product.variants[0].color);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setAdding(true);
    try {
      const { data } = await api.post('/cart/items', {
        productId: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
      setCart(data.data.cart.items);
      alert('Added to cart!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  const availableSizes = [...new Set(product.variants.map((v: any) => v.size))];
  const availableColors = [...new Set(product.variants.map((v: any) => v.color))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 aspect-square overflow-hidden bg-gray-100"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden bg-gray-100 ${
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-6 text-2xl font-semibold">{formatPrice(product.price)}</p>

          <p className="mb-6 text-gray-600">{product.description}</p>

          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Size</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 ${
                    selectedSize === size ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Color</h3>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 ${
                    selectedColor === color ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Quantity</h3>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-24 border p-2"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full bg-black py-4 font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
