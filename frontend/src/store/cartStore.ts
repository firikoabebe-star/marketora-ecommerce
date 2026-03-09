import { create } from 'zustand';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
  };
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  setCart: (items: CartItem[]) => void;
  setLoading: (loading: boolean) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  setCart: (items) => set({ items }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearCart: () => set({ items: [] }),
  getItemCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.quantity;
    }, 0);
  },
}));
