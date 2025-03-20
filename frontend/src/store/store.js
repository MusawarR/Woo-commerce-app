import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => set({ user }),

            clearAuth: () => {
                set({ user: null })
            },

            isAuthenticated: () => {
                return !!localStorage.getItem("token")
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const useProductStore = create(
    persist(
        (set) => ({
            products: [],
            currentProduct: null,
            isLoading: false,
            error: null,

            setProducts: (products) => set({ products }),

            setCurrentProduct: (product) => set({ currentProduct: product }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearCurrentProduct: () => set({ currentProduct: null })
        }),
        {
            name: "product-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const useOrdersStore = create(
    persist(
        (set) => ({
            orders: [],
            userOrders: [],
            currentOrder: null,
            isLoading: false,
            error: null,

            setOrders: (orders) => set({ orders }),

            setUserOrders: (userOrders) => set({ userOrders }),

            setCurrentOrder: (order) => set({ currentOrder: order }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearCurrentOrder: () => set({ currentOrder: null }),

            clearError: () => set({ error: null })
        }),
        {
            name: "order-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            orderId: null,

            setItems: (items) => set({ items }),

            setOrderId: (orderId) => set({ orderId }),

            addItem: (item) => set((state) => ({ items: [...state.items, item] })),

            removeItem: (itemId) => set((state) => ({
                items: state.items.filter(item => item._id != itemId)
            })),

            clearItems: () => set({ items: [] }),

            getItemCount: () => get().items.length,

            isInCart: (itemId) => get().items.some(item => item._id == itemId)
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)