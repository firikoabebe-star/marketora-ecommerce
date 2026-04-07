'use client';

import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors: any = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  PROCESSING: 'bg-blue-100 text-blue-700 border-blue-200',
  SHIPPED: 'bg-purple-100 text-purple-700 border-purple-200',
  DELIVERED: 'bg-green-100 text-green-700 border-green-200',
  CANCELLED: 'bg-red-100 text-red-700 border-red-200',
};

const statusIcons: any = {
  PENDING: Clock,
  PROCESSING: Package,
  SHIPPED: Truck,
  DELIVERED: CheckCircle2,
  CANCELLED: XCircle,
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/orders/all?status=${status}&page=${page}&limit=10`);
      setOrders(response.data.data.orders);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.patch(`/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm">Monitor and manage customer orders.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex-1">
          <select 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm text-gray-500 whitespace-nowrap">Total Orders: {orders.length}</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-full" /></td>
                </tr>
              ))
            ) : orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-gray-500">#{order.id.slice(0, 8)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-900">{order.user?.firstName} {order.user?.lastName}</span>
                    <span className="text-xs text-gray-500">{order.user?.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  ${Number(order.total).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className={`px-3 py-1 rounded-full border text-xs font-bold inline-flex items-center gap-1.5 ${statusColors[order.status]}`}>
                    {(() => {
                      const Icon = statusIcons[order.status];
                      return <Icon size={12} />;
                    })()}
                    {order.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <select 
                      className="text-xs border rounded p-1 focus:outline-none focus:ring-1 focus:ring-black"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <button 
                       onClick={() => setSelectedOrder(order)}
                       className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Drawer/Modal Placeholder */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 overflow-hidden">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-white w-full max-w-lg h-full shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-black transition-colors">
                  <XCircle />
                </button>
              </div>
              <div className="p-6 space-y-8">
                 <section className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-gray-500">Order ID</span>
                       <span className="font-mono text-sm">#{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-gray-500">Placed On</span>
                       <span className="text-sm">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-gray-500">Status</span>
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[selectedOrder.status]}`}>
                          {selectedOrder.status}
                       </span>
                    </div>
                 </section>

                 <section className="space-y-4 border-t pt-8">
                    <h3 className="font-bold text-gray-900">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                       <p className="font-bold text-sm">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                       <p className="text-sm text-gray-600">{selectedOrder.user?.email}</p>
                       <p className="text-sm text-gray-600 border-t pt-2">{selectedOrder.shippingAddress}, {selectedOrder.city}, {selectedOrder.country}</p>
                    </div>
                 </section>

                 <section className="space-y-4 border-t pt-8 pb-12">
                    <h3 className="font-bold text-gray-900">Order Items</h3>
                    <div className="space-y-4">
                       {selectedOrder.items?.map((item: any) => (
                          <div key={item.id} className="flex gap-4">
                             <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                             <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm truncate">{item.product?.name || 'Product'}</p>
                                <p className="text-xs text-gray-500">Size: {item.size} • Color: {item.color}</p>
                                <div className="flex justify-between mt-1">
                                   <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                   <span className="text-sm font-bold">${Number(item.price).toFixed(2)}</span>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                       <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>${Number(selectedOrder.total).toFixed(2)}</span>
                       </div>
                    </div>
                 </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
