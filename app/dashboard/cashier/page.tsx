"use client";

import { useState } from "react";

import { mockTables, mockRevenue } from "@/lib/mockData";

export default function CashierDashboard() {
    const totalRevenue = mockTables.reduce((sum, t) => sum + (t.total || 0), 0);
    const orderedCount = mockTables.filter(t => t.status === "Ordered").length;

    return (
        <>
            {/* Header */}
            <header className="flex flex-col justify-center mb-12 border-b-2 border-primary pb-8 items-start">
                <h2 className="text-2xl font-bold tracking-widest uppercase font-sans">Cashier Dashboard</h2>
                <p className="text-sm opacity-60 mt-2 uppercase tracking-widest font-sans">Service Date: October 24, 2023</p>
            </header>

            {/* Top Bar Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary mb-12">
                <div className="flex flex-col p-6 items-center justify-center border-b md:border-b-0 md:border-r border-primary">
                    <p className="text-xs uppercase tracking-widest mb-2 font-sans font-bold">Today Revenue</p>
                    <p className="text-4xl font-black font-sans">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="flex flex-col p-6 items-center justify-center border-b md:border-b-0 md:border-r border-primary">
                    <p className="text-xs uppercase tracking-widest mb-2 font-sans font-bold">Active Tables</p>
                    <p className="text-4xl font-black font-sans">{orderedCount}</p>
                </div>
                <div className="flex flex-col p-6 items-center justify-center">
                    <p className="text-xs uppercase tracking-widest mb-2 font-sans font-bold">Top Item</p>
                    <p className="text-4xl font-black italic font-display">{mockRevenue.topItem}</p>
                </div>
            </div>

            {/* Table Grid (3x..) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {mockTables.filter(t => t.status === "Ordered").map((table) => (
                    <div key={table.id} className="border-2 border-primary flex flex-col min-h-[320px]">
                        <div className="bg-primary text-white p-4 flex justify-between items-center">
                            <span className="text-lg font-bold font-sans">TABLE {table.number.toString().padStart(2, '0')}</span>
                            <span className="text-xs uppercase tracking-widest font-sans font-bold italic">Ordered • {table.timer}</span>
                        </div>
                        <div className="p-6 flex-grow">
                            <ul className="space-y-2 mb-6 font-sans">
                                <li className="flex justify-between border-b border-gray-200 pb-1 italic text-primary/60">
                                    <span>{table.items} Items Pending</span>
                                </li>
                            </ul>
                            <div className="flex justify-between items-end border-t-2 border-primary pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest font-sans">Total</span>
                                <span className="text-2xl font-black font-sans">${table.total?.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="bg-primary text-white hover:bg-gray-800 transition-colors py-4 uppercase font-bold tracking-widest text-sm font-sans">
                            Mark as Paid
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-auto pt-12 border-t border-primary/10 flex justify-between items-center">
                <p className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold opacity-40">© 2023 Jera Restaurant Management System</p>
            </footer>
        </>
    );
}
