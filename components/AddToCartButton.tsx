"use client";

import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/lib/queries";
import { motion } from "framer-motion";

export function AddToCartButton({ item }: { item: MenuItem }) {
    const { addItem } = useCart();

    return (
        <motion.button
            whileTap={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.2 }}
            onClick={() => addItem({ _id: item._id, name: item.name, price: item.price })}
            className="add-btn size-8 border border-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white"
        >
            <span className="font-bold text-lg leading-none">+</span>
        </motion.button>
    );
}
