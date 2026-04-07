'use client';

import { useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/products?search=${search}&page=${page}&limit=10`);
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchProducts();
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories');
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">Manage your product catalog and inventory.</p>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-gray-200 rounded" />
                      <div className="w-20 h-3 bg-gray-100 rounded" />
                    </div>
                  </td>
                  <td colSpan={4} className="px-6 py-4"><div className="w-full h-4 bg-gray-100 rounded" /></td>
                </tr>
              ))
            ) : products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border">
                      {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" /> : <ImageIcon size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {product.category?.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold ${product.variants?.reduce((acc: number, v: any) => acc + v.stock, 0) <= 10 ? 'text-orange-600' : 'text-gray-600'}`}>
                      {product.variants?.reduce((acc: number, v: any) => acc + v.stock, 0)} items
                    </span>
                    <p className="text-[10px] text-gray-400">{product.variants?.length || 0} variants</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Product Modal Placeholder - will implement full modal in next step */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                  <X />
                </button>
              </div>
              <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); /* Handle submit */ }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2 col-span-2">
                      <label className="text-sm font-bold text-gray-700">Product Name</label>
                      <input type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/5 focus:outline-none" defaultValue={editingProduct?.name} required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Price ($)</label>
                      <input type="number" step="0.01" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/5 focus:outline-none" defaultValue={editingProduct?.price} required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Category</label>
                      <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-black/5 focus:outline-none" defaultValue={editingProduct?.categoryId} required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                   </div>
                   <div className="space-y-2 col-span-2">
                      <label className="text-sm font-bold text-gray-700">Description</label>
                      <textarea className="w-full p-3 border rounded-xl h-32 focus:ring-2 focus:ring-black/5 focus:outline-none" defaultValue={editingProduct?.description} required />
                   </div>
                </div>
                
                <div className="pt-6 border-t flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">Save Product</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
