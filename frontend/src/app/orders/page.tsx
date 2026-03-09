'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">No orders yet</h1>
        <Link href="/products" className="inline-block bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block border p-6 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(order.total)}</p>
                <p className="text-sm">
                  <span className={`inline-block rounded px-2 py-1 text-xs ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {order.items.slice(0, 3).map((item: any) => (
                <img
                  key={item.id}
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover"
                />
              ))}
              {order.items.length > 3 && (
                <div className="flex h-16 w-16 items-center justify-center bg-gray-100 text-sm">
                  +{order.items.length - 3}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
