'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/admin/analytics/dashboard');
        setStats(response.data.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl" />)}
      </div>
      <div className="h-96 bg-gray-200 rounded-xl" />
    </div>;
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.stats?.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Total Orders', value: stats?.stats?.totalOrders, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Users', value: stats?.stats?.totalUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Pending Orders', value: stats?.stats?.pendingOrders, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center font-medium">
                <ArrowUpRight size={16} className="mr-1" /> 12%
              </span>
              <span className="text-gray-400 ml-2">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</button>
          </div>
          <div className="space-y-4">
            {stats?.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500">{order.user.firstName} {order.user.lastName} • {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${Number(order.total).toLocaleString()}</p>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Low Stock Alerts</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">Inventory</button>
          </div>
          <div className="space-y-4">
            {stats?.lowStockProducts.map((variant: any) => (
              <div key={variant.id} className="flex items-center justify-between p-4 border rounded-xl bg-orange-50/50">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{variant.name}</p>
                    <p className="text-xs text-gray-500">Size: {variant.size} • Color: {variant.color} • SKU: {variant.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">{variant.stock} left</p>
                  <div className="w-24 bg-gray-200 h-1.5 rounded-full mt-1">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(variant.stock / 10) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
            {stats?.lowStockProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500 italic">No low stock alerts today!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
