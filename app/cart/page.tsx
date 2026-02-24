"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
    const { items, increaseQuantity, decreaseQuantity, removeItem, total, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        if (items.length === 0) return;

        setIsProcessing(true);

        // Simulate order placement
        setTimeout(() => {
            const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();

            // Save real order sequence to localstorage
            const order = {
                id: orderId,
                items: [...items],
                subtotal: total,
                status: "preparing",
                createdAt: new Date().toISOString()
            };
            localStorage.setItem("jera_order", JSON.stringify(order));

            clearCart();
            setIsProcessing(false);
            router.push(`/order-confirmation?orderId=${orderId}`);
        }, 1000);
    };

    if (items.length === 0) {
        return (
            <div className="bg-background-light text-primary min-h-screen flex flex-col">
                <header className="border-b border-primary/10 px-6 py-6 sticky top-0 bg-white z-50">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">restaurant</span>
                            <h1 className="text-xl font-bold tracking-tighter uppercase font-display">Jera</h1>
                        </div>
                        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-sans font-bold">
                            <Link className="hover:underline" href="/menu">Menu</Link>
                            <a className="hover:underline" href="#">Reservations</a>
                            <a className="hover:underline" href="#">About</a>
                        </nav>
                        <div className="flex gap-4">
                            <button className="p-1 hover:opacity-60 transition-opacity relative">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center font-sans">
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-grow flex flex-col items-center justify-center py-12 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 font-display">Cart</h2>
                        <div className="h-1 w-12 bg-primary mx-auto"></div>
                    </div>
                    <p className="text-primary/60 mb-8 font-sans">Your cart is currently empty.</p>
                    <Link
                        href="/menu"
                        className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs font-sans hover:bg-white hover:text-primary transition-all border-2 border-primary group flex items-center gap-4"
                    >
                        <span>Return to Menu</span>
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background-light text-primary min-h-screen flex flex-col">
            {/* Top Navigation */}
            <header className="border-b border-primary/10 px-6 py-6 sticky top-0 bg-white z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">restaurant</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase font-display">Jera</h1>
                    </div>
                    <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-sans font-bold">
                        <Link className="hover:underline" href="/menu">Menu</Link>
                        <a className="hover:underline" href="#">Reservations</a>
                        <a className="hover:underline" href="#">About</a>
                    </nav>
                    <div className="flex gap-4">
                        <button className="p-1 hover:opacity-60 transition-opacity relative">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center font-sans">{itemCount}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center py-12 px-6">
                <div className="w-full max-w-2xl">
                    {/* Page Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 font-display">Cart</h2>
                        <div className="h-1 w-12 bg-primary mx-auto"></div>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-0 border-t border-primary">
                        {items.map((item, index) => (
                            <div key={item._id || index} className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-primary/10 gap-6">
                                <div className="flex items-center gap-6">

                                    <div>
                                        <h3 className="text-xl font-bold italic font-display">{item.name}</h3>
                                        <p className="text-sm font-sans text-primary/60 mt-1">Single Origin Roast</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-12">
                                    {/* Quantity Control */}
                                    <div className="flex items-center border border-primary h-10 px-2 bg-white">
                                        <button
                                            onClick={() => decreaseQuantity(item._id)}
                                            className="w-8 h-full flex items-center justify-center hover:bg-primary/5 transition-colors font-bold text-lg leading-none"
                                        >
                                            -
                                        </button>
                                        <input
                                            className="w-8 text-center border-none focus:ring-0 font-sans text-sm font-bold bg-transparent"
                                            readOnly
                                            value={item.quantity}
                                        />
                                        <button
                                            onClick={() => increaseQuantity(item._id)}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-primary/5 transition-colors font-bold text-lg leading-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* Price & Remove */}
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-lg font-bold font-sans">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Summary Section */}
                    <div className="mt-12 space-y-8">
                        <div className="flex justify-between items-baseline border-t-2 border-primary pt-6">
                            <span className="text-sm uppercase tracking-[0.2em] font-sans font-bold">Subtotal</span>
                            <span className="text-4xl font-bold font-display">${total.toFixed(2)}</span>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="w-full bg-primary text-white py-6 text-xs uppercase tracking-[0.3em] font-sans font-black hover:bg-primary/90 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "CONFIRM ORDER"}
                            </button>
                        </div>
                        <div className="text-center pt-4">
                            <Link className="text-[10px] uppercase tracking-widest font-sans font-bold text-primary/40 hover:text-primary transition-colors" href="/menu">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-primary/5 mt-auto bg-primary/5">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 grayscale opacity-50">
                        <span className="material-symbols-outlined">restaurant</span>
                        <span className="font-bold tracking-tighter uppercase text-sm font-display">Jera</span>
                    </div>
                    <div className="flex gap-8 text-[10px] uppercase tracking-widest font-sans font-bold opacity-40">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Contact</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-sans font-bold opacity-40">
                        © 2024 Jera Restaurant. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
