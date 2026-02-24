"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { OrderConfirmationSkeleton } from "@/components/OrderConfirmationSkeleton";

type OrderItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

type Order = {
    id: string;
    items: OrderItem[];
    subtotal: number;
    status: string;
    createdAt: string;
};

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = searchParams.get("orderId");
        if (!id) {
            router.push("/menu");
            return;
        }

        const storedOrder = localStorage.getItem("jera_order");
        if (storedOrder) {
            try {
                const parsed = JSON.parse(storedOrder);
                if (parsed.id === id) {
                    setOrder(parsed);
                } else {
                    router.push("/menu/1");
                }
            } catch {
                router.push("/menu/1");
            }
        } else {
            router.push("/menu/1");
        }
        setLoading(false);
    }, [searchParams, router]);

    const handlePayment = (method: string) => {
        setSelectedPayment(method);
        setTimeout(() => {
            router.push(`/order-tracking?orderId=${order?.id}`);
        }, 600);
    };

    if (loading || !order) {
        return <OrderConfirmationSkeleton />;
    }

    return (
        <div className="bg-background-light text-primary min-h-screen flex flex-col">
            {/* Top Navigation / Logo Bar */}
            <header className="w-full py-8 border-b border-primary/10 bg-white">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">restaurant</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase font-display">Jera</h1>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-sans font-medium">
                        <Link className="hover:underline" href="/menu">Menu</Link>
                        <a className="hover:underline" href="#">Reservations</a>
                        <a className="hover:underline" href="#">Contact</a>
                    </nav>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center py-16 px-6">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Order Confirmation</h2>
                    <p className="text-primary/60 font-sans tracking-wide uppercase text-sm">Thank you for dining with us</p>
                </div>

                {/* Main Confirmation Card */}
                <div className="w-full max-w-xl border border-primary p-8 md:p-12 bg-white">
                    {/* Identification Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-primary/10">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-primary/40 font-sans mb-1">Order Number</p>
                            <p className="text-3xl font-display font-bold">#{order.id}</p>
                        </div>
                        <div className="md:text-right">
                            <p className="text-xs uppercase tracking-widest text-primary/40 font-sans mb-1">Table Number</p>
                            <p className="text-3xl font-display font-bold">Table 1</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="py-8 flex justify-center">
                        <div className="border border-primary px-6 py-2 flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-sm font-sans font-bold uppercase tracking-[0.2em]">Status: Preparing</span>
                        </div>
                    </div>

                    {/* Receipt Content */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-display font-bold border-b border-primary pb-2">Order Summary</h3>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={item._id || idx}>
                                    <div className="flex justify-between items-center font-sans">
                                        <span className="text-base">{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                                        <span className="text-base font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="border-b border-primary/10 mt-4"></div>
                                </div>
                            ))}
                        </div>

                        {/* Total Calculation */}
                        <div className="pt-4 space-y-2">
                            <div className="flex justify-between items-center text-sm font-sans text-primary/60">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary">
                                <span className="text-xl font-display font-bold uppercase tracking-tighter">Total</span>
                                <span className="text-2xl font-display font-bold">${order.subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Selection */}
                    <div className="mt-12">
                        <h3 className="text-lg font-display font-bold border-b border-primary pb-2 mb-6">Select Payment Method</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['CASH', 'VISA'].map((method) => {
                                const isSelected = selectedPayment === method;
                                return (
                                    <button
                                        key={method}
                                        onClick={() => handlePayment(method)}
                                        disabled={selectedPayment !== null}
                                        className={`relative flex flex-col items-center justify-center p-6 border-[3px] transition-all font-sans font-bold uppercase tracking-[0.2em] ${isSelected
                                            ? "border-primary bg-primary/10 text-primary shadow-[4px_4px_0_0_var(--color-primary,theme(colors.black))]"
                                            : "border-primary text-primary hover:bg-primary/5 hover:shadow-[4px_4px_0_0_var(--color-primary,theme(colors.black))] bg-white"
                                            }`}
                                    >
                                        <span className="text-xl md:text-2xl mb-4 font-display">{method}</span>
                                        <div className="h-6 flex items-center justify-center">
                                            {isSelected ? (
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-lg">✓</span>
                                                    <div className="w-5 h-5 border-[3px] border-primary border-t-transparent animate-spin"></div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-primary/40 font-sans uppercase tracking-widest">
                            A copy of this receipt has been sent to your registered email.
                        </p>
                    </div>
                </div>

                {/* Support Info */}
                <div className="mt-12 text-center max-w-xs">
                    <p className="text-sm font-sans text-primary/60 leading-relaxed">
                        Need assistance with your order?<br />
                        <a className="text-primary font-bold underline underline-offset-4" href="#">Call the Waitstaff</a> or <Link className="text-primary font-bold underline underline-offset-4" href="/menu">View Menu</Link>
                    </p>
                </div>
            </main>

            <footer className="w-full py-12 border-t border-primary/10 mt-auto bg-white">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-primary/40">
                        © 2024 Jera Restaurant. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a className="text-primary/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                        <a className="text-primary/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
                        <a className="text-primary/40 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<OrderConfirmationSkeleton />}>
            <ConfirmationContent />
        </Suspense>
    );
}
