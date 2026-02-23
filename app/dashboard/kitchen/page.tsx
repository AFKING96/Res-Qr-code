"use client";

import { mockOrders } from "@/lib/mockData";

export default function KitchenDashboard() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navigation / Header */}
            <header className="flex items-center justify-between border-b border-primary pb-4 mb-4">
                <h1 className="text-2xl font-black uppercase tracking-tighter font-display">Kitchen Dashboard</h1>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 border-r border-primary/10 pr-6">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span className="text-sm font-bold tracking-widest font-sans">19:42:05</span>
                    </div>
                </div>
            </header>

            {/* Status Tabs */}
            <div className="pb-4 border-b border-primary/10 mb-8">
                <div className="flex gap-8 flex-wrap">
                    <button className="border-b-2 border-primary py-2 text-sm font-bold uppercase tracking-widest font-sans">Active Orders (8)</button>
                    <button className="border-b-2 border-transparent py-2 text-sm font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors font-sans">In Preparation (3)</button>
                    <button className="border-b-2 border-transparent py-2 text-sm font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors font-sans">Ready to Serve (5)</button>
                    <button className="border-b-2 border-transparent py-2 text-sm font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors font-sans">History</button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockOrders.map((order) => {
                        const isNew = order.status === "New";
                        const isPrep = order.status === "Preparing";
                        const isReady = order.status === "Ready";

                        return (
                            <div key={order.id} className="bg-white border-2 border-primary flex flex-col min-h-[400px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="p-4 border-b border-primary flex justify-between items-start">
                                    <div>
                                        <h3 className="text-3xl font-black font-sans">Table {order.tableId}</h3>
                                        <p className="text-xs uppercase font-bold tracking-widest text-primary/60 font-sans">ID: {order.id}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-2xl font-black tracking-tighter font-sans ${isPrep ? 'underline decoration-2' : ''}`}>{order.time}</span>
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 mt-1 font-sans border ${isNew ? 'bg-primary text-white border-primary' :
                                            isPrep ? 'bg-primary/10 text-primary border-primary/20' :
                                                'bg-white text-primary border-primary'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 flex-grow space-y-3 font-sans">
                                    {order.items.map((item, idx) => {
                                        const match = item.match(/^(\dx)\s+(.*)/);
                                        const qty = match ? match[1] : "";
                                        const name = match ? match[2] : item;
                                        return (
                                            <div key={idx} className="flex justify-between items-baseline">
                                                <p className="text-lg leading-tight"><span className="font-black mr-2 text-primary">{qty}</span> {name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-2 mt-auto border-t border-primary/10">
                                    {isNew && (
                                        <>
                                            <button className="bg-primary text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-primary border-2 border-primary transition-all font-sans">Start Prep</button>
                                            <button className="bg-white text-primary py-3 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white border-2 border-primary transition-all font-sans">Ready</button>
                                        </>
                                    )}
                                    {isPrep && (
                                        <>
                                            <button className="bg-white text-primary py-3 text-xs font-black uppercase tracking-widest opacity-30 cursor-not-allowed border-2 border-primary font-sans" disabled>Preparing...</button>
                                            <button className="bg-primary text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-primary border-2 border-primary transition-all font-sans">Ready</button>
                                        </>
                                    )}
                                    {isReady && (
                                        <>
                                            <button className="bg-white text-primary py-3 text-xs font-black uppercase tracking-widest opacity-30 cursor-not-allowed border-2 border-primary font-sans" disabled>Ready</button>
                                            <button className="bg-primary text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-primary border-2 border-primary transition-all font-sans">Serve</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer Stats */}
            <footer className="mt-12 border-t-2 border-primary pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-bold uppercase tracking-[0.2em] font-sans gap-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-auto">
                    <div className="flex flex-col">
                        <span className="text-primary/50 mb-1 border-b border-primary/10 pb-1">Avg. Prep Time</span>
                        <span className="text-lg">14m 22s</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-primary/50 mb-1 border-b border-primary/10 pb-1">Orders Today</span>
                        <span className="text-lg">142</span>
                    </div>
                    <div className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-primary/50 mb-1 border-b border-primary/10 pb-1">Kitchen Capacity</span>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-lg">78%</span>
                            <div className="h-2 w-full max-w-[100px] border border-primary">
                                <div className="h-full bg-primary w-[78%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 border border-primary px-3 py-2 bg-primary/5">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="tracking-widest">System Live</span>
                </div>
            </footer>
        </div>
    );
}
