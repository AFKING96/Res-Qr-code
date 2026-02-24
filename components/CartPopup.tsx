"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CartPopup() {
    const { items, lastAddedItem } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    // Don't show cart popup on the cart page itself
    const isCartPage = pathname === "/cart";
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (lastAddedItem && !isCartPage) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [lastAddedItem, isCartPage]);

    return (
        <AnimatePresence>
            {isVisible && lastAddedItem && !isCartPage && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw] px-4 py-3 bg-black text-white border-2 border-black flex flex-wrap items-center justify-between gap-4 sm:gap-6 shadow-[4px_4px_0_0_var(--color-primary,theme(colors.black))]"
                >
                    <div className="font-bold flex items-center gap-2 font-sans text-sm sm:text-base tracking-wide whitespace-nowrap">
                        <span className="text-white">✓</span>
                        {lastAddedItem.name} added
                    </div>
                    <Link
                        href="/cart"
                        className="bg-white text-black px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-gray-200 transition-colors whitespace-nowrap"
                        onClick={() => setIsVisible(false)}
                    >
                        View Cart ({itemCount})
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
