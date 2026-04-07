'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Tag },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated || user?.role !== 'ADMIN') {
        router.replace('/');
      }
    }
  }, [isAuthenticated, user, isInitialized, router]);

  if (!isInitialized || !isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r bg-white",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/admin" className={cn("font-bold text-xl transition-all", !isSidebarOpen && "hidden")}>
            ADMIN
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-black text-white" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-black",
                  !isSidebarOpen && "justify-center px-0"
                )}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 p-3 text-gray-600 hover:text-black transition-colors rounded-lg hover:bg-gray-100",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <Settings size={20} />
            {isSidebarOpen && <span className="font-medium">Back to Shop</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-sm"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-64 bg-white" onClick={e => e.stopPropagation()}>
              <div className="h-16 flex items-center px-6 border-b font-bold text-xl">
                ADMIN
              </div>
              <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-colors font-medium",
                        isActive ? "bg-black text-white" : "text-gray-600"
                      )}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20",
          "p-8"
        )}
      >
        {children}
      </main>
    </div>
  );
}
