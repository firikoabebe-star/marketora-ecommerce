'use client';

import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { 
  Search, 
  User, 
  UserPlus, 
  Shield, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/users?search=${search}&page=${page}&limit=10`);
      setUsers(response.data.data.users);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateRole = async (userId: string, role: string) => {
    try {
      await api.patch(`/api/admin/users/${userId}/role`, { role });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update role', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? (Soft delete)')) {
      try {
        await api.delete(`/api/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm">Manage customer accounts and administrative roles.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-6"><div className="h-4 bg-gray-100 rounded w-full" /></td>
                </tr>
              ))
            ) : users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">{user.firstName} {user.lastName}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${
                    user.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                  }`}>
                    {user.role === 'ADMIN' && <Shield size={10} />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(user.createdAt).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-sm text-gray-900">{user.ordersCount}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <select 
                      className="text-xs border rounded p-1 focus:outline-none focus:ring-1 focus:ring-black"
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 size={16} />
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
    </div>
  );
}
