"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    total: number;
    clearCart: () => void;
    lastAddedItem: { name: string; timestamp: number } | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [lastAddedItem, setLastAddedItem] = useState<{ name: string; timestamp: number } | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i._id === item._id);
            if (existing) {
                return prev.map((i) =>
                    i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setLastAddedItem({ name: item.name, timestamp: Date.now() });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i._id !== id));
    };

    const increaseQuantity = (id: string) => {
        setItems((prev) =>
            prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i))
        );
    };

    const decreaseQuantity = (id: string) => {
        setItems((prev) =>
            prev
                .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter((i) => i.quantity > 0)
        );
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                increaseQuantity,
                decreaseQuantity,
                total,
                clearCart,
                lastAddedItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
