'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items, getTotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/orders', formData);
      clearCart();
      router.push(`/orders/${data.data.order.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow">
            {error && (
              <div className="bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}

            <h2 className="text-xl font-bold">Shipping Information</h2>

            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <input
                type="text"
                required
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                className="w-full border p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full border p-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full border p-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border p-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="mb-4 space-y-2">
              {items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>{formatPrice(parseFloat(item.product.price) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
