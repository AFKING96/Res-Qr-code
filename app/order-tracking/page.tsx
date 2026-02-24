"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function TrackingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const id = searchParams.get("orderId");
        if (!id) {
            router.push("/menu");
        } else {
            setOrderId(id);
        }
    }, [searchParams, router]);

    if (!orderId) {
        return (
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-primary font-sans font-bold uppercase tracking-widest text-sm animate-pulse">Locating Order...</p>
            </div>
        );
    }

    return (
        <div className="bg-background-light text-primary min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="border-b border-primary/10 px-6 md:px-20 py-6 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "28px" }}>restaurant</span>
                    <h1 className="font-display font-black text-xl tracking-tight uppercase">Jera</h1>
                </div>
                <nav>
                    <Link className="font-sans text-sm uppercase tracking-widest font-bold hover:opacity-60 transition-opacity" href="/menu">Back to Menu</Link>
                </nav>
            </header>

            <main className="flex-grow flex flex-col items-center py-16 px-6">
                {/* Page Title */}
                <div className="text-center mb-20">
                    <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-[0.2em] mb-4">Order Tracking</h2>
                    <div className="h-px w-24 bg-primary mx-auto"></div>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-lg w-full">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/20 -translate-x-1/2"></div>

                    {/* Status: Received (Checked) */}
                    <div className="relative flex items-center justify-between mb-16 w-full">
                        <div className="w-5/12 text-right pr-8">
                            <span className="text-xs uppercase tracking-widest text-primary/40 font-sans">Just Now</span>
                        </div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full border border-primary">
                                <span className="text-white text-xl font-bold">✓</span>
                            </div>
                        </div>
                        <div className="w-5/12 pl-8">
                            <h3 className="font-display font-bold text-lg uppercase tracking-wide">Received</h3>
                            <p className="font-sans text-sm text-primary/60 mt-1">We have received your order.</p>
                        </div>
                    </div>

                    {/* Status: Preparing (Active) */}
                    <div className="relative flex items-center justify-between mb-16 w-full">
                        <div className="w-5/12 text-right pr-8">
                            <span className="text-xs uppercase tracking-widest text-primary font-sans font-bold">In Progress</span>
                        </div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border-2 border-primary ring-4 ring-primary/10">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-5/12 pl-8">
                            <h3 className="font-display font-bold text-lg uppercase tracking-wide">Preparing</h3>
                            <p className="font-sans text-sm text-primary/60 mt-1">Our chefs are crafting your meal.</p>
                        </div>
                    </div>

                    {/* Status: Ready (Pending) */}
                    <div className="relative flex items-center justify-between mb-16 w-full opacity-40">
                        <div className="w-5/12 text-right pr-8">
                            <span className="text-xs uppercase tracking-widest font-sans">Next</span>
                        </div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-primary/30">
                                <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-5/12 pl-8">
                            <h3 className="font-display font-bold text-lg uppercase tracking-wide">Ready</h3>
                            <p className="font-sans text-sm mt-1">Plating and final touches.</p>
                        </div>
                    </div>

                    {/* Status: Served (Pending) */}
                    <div className="relative flex items-center justify-between w-full opacity-40">
                        <div className="w-5/12 text-right pr-8">
                            <span className="text-xs uppercase tracking-widest font-sans">Final</span>
                        </div>
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-primary/30">
                                <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-5/12 pl-8">
                            <h3 className="font-display font-bold text-lg uppercase tracking-wide">Served</h3>
                            <p className="font-sans text-sm mt-1">Enjoy your experience.</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="mt-24 border-t border-primary/10 pt-12 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center uppercase tracking-widest">
                    <div>
                        <p className="text-xs text-primary/50 font-sans mb-2 font-bold">Order Identification</p>
                        <p className="text-2xl font-display font-black">#{orderId}</p>
                    </div>
                    <div>
                        <p className="text-xs text-primary/50 font-sans mb-2 font-bold">Estimated Arrival</p>
                        <p className="text-2xl font-display font-black">12 Minutes</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-16">
                    <button className="px-10 py-4 bg-primary text-white font-sans font-bold text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-primary transition-all border border-primary">
                        Contact Support
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-10 px-6 border-t border-primary/5 text-center bg-white mt-auto">
                <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-primary/40 font-bold">© Jera Fine Dining Est. 2024</p>
            </footer>
        </div>
    );
}

export default function OrderTrackingPage() {
    return (
        <Suspense fallback={
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-primary font-sans font-bold uppercase tracking-widest text-sm animate-pulse">Locating Order...</p>
            </div>
        }>
            <TrackingContent />
        </Suspense>
    );
}
