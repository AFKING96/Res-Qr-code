"use client";

import { mockOrders } from "@/lib/mockData";

export default function ActiveOrdersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navigation / Header */}
            <header className="flex items-center justify-between border-b border-primary pb-4 mb-4">
                <h1 className="text-2xl font-black uppercase tracking-tighter font-display">Active Orders</h1>
            </header>

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
        </div>
    );
}
