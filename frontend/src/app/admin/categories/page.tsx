'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Folder,
  ChevronRight,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm">Organize your products with hierarchical categories.</p>
        </div>
        <button 
          onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)
        ) : categories.map((category) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden border">
                   {category.imageUrl ? <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" /> : <Folder size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.slug}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setEditingCategory(category); setIsModalOpen(true); }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                 Products: {category._count?.products || 0}
              </span>
              <button className="text-sm font-medium text-black flex items-center gap-1 hover:gap-2 transition-all">
                View Products <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                  <X />
                </button>
              </div>
              <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category Name</label>
                  <input type="text" className="w-full p-3 border rounded-xl" defaultValue={editingCategory?.name} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Slug</label>
                  <input type="text" className="w-full p-3 border rounded-xl" defaultValue={editingCategory?.slug} placeholder="electronics-gadgets" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Image URL</label>
                  <input type="text" className="w-full p-3 border rounded-xl" defaultValue={editingCategory?.imageUrl} />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-xl">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-black text-white rounded-xl">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
