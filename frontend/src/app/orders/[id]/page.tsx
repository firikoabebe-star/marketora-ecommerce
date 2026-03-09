'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${params.id}`);
        setOrder(data.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  if (!order) {
    return <div className="py-20 text-center">Order not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600">Order #{order.id.slice(0, 8)}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 border p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Order Status</h2>
              <span className={`rounded px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
          </div>

          <div className="border p-6">
            <h2 className="mb-4 text-xl font-bold">Items</h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-600">
                      Total: {formatPrice(parseFloat(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-6 border p-6">
            <h2 className="mb-4 text-xl font-bold">Shipping Address</h2>
            <div className="text-sm">
              <p>{order.shippingAddress}</p>
              <p>{order.city}, {order.postalCode}</p>
              <p>{order.country}</p>
              <p className="mt-2">Phone: {order.phone}</p>
            </div>
          </div>

          <div className="border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
