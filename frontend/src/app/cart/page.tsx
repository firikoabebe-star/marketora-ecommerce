'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, setCart, getTotal } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await api.get('/cart');
        setCart(data.data.cart.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, router, setCart]);

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
      setCart(data.data.cart.items);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { data } = await api.delete(`/cart/items/${itemId}`);
      setCart(data.data.cart.items);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
        <Link href="/products" className="inline-block bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="flex gap-4 border p-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="mt-2 font-semibold">{formatPrice(item.product.price)}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border px-2 py-1"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="mb-4 flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(getTotal())}</span>
            </div>

            <div className="mb-4 flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black py-3 text-center font-semibold text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
