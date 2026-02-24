"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export function MenuHeader() {
    const { items, lastAddedItem } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const [isBouncing, setIsBouncing] = useState(false);

    useEffect(() => {
        if (lastAddedItem) {
            setIsBouncing(true);
            const timeout = setTimeout(() => setIsBouncing(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [lastAddedItem]);

    return (
        <header className="flex flex-col items-center justify-center px-6 py-10 border-b border-primary/10 relative">
            <div className="absolute right-6 top-10">
                <motion.div
                    animate={isBouncing ? { y: [0, -10, 0] } : {}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <Link href="/cart" className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 border border-primary bg-primary px-4 h-10 text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-all">
                        <span className="truncate">VIEW CART ({itemCount})</span>
                    </Link>
                </motion.div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <div className="size-12 mb-2">
                    <svg className="text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                    </svg>
                </div>
                <Link href="/">
                    <h1 className="text-4xl font-bold tracking-tighter uppercase font-display mt-2">
                        Jera
                    </h1>
                </Link>
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-sans mt-2">All Roads Lead Here</p>
                <div className="mt-4 px-3 py-1 border border-primary/20 text-[10px] uppercase tracking-widest font-sans font-bold">
                    Table 1
                </div>
            </div>
        </header>
    );
}
