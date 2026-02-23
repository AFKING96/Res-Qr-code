"use client";

import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/lib/queries";

export function AddToCartButton({ item }: { item: MenuItem }) {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem({ _id: item._id, name: item.name, price: item.price })}
            className="add-btn size-8 border border-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white"
        >
            <span className="font-bold text-lg leading-none">+</span>
        </button>
    );
}
