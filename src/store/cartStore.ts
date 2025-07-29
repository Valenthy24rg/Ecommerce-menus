import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
  cart: { [id: number]: number };
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: {},
      addToCart: (id) =>
        set((state) => ({
          cart: { ...state.cart, [id]: 1 },
        })),
      removeFromCart: (id) =>
        set((state) => {
          const newCart = { ...state.cart };
          delete newCart[id];
          return { cart: newCart };
        }),
      increment: (id) =>
        set((state) => ({
          cart: { ...state.cart, [id]: (state.cart[id] || 0) + 1 },
        })),
      decrement: (id) =>
        set((state) => {
          const current = state.cart[id] || 0;
          if (current <= 1) {
            const newCart = { ...state.cart };
            delete newCart[id];
            return { cart: newCart };
          }
          return { cart: { ...state.cart, [id]: current - 1 } };
        }),
      clearCart: () => set({ cart: {} }),
    }),
    {
      name: 'cart-storage',
    }
  )
);