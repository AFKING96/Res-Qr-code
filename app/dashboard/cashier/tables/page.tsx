"use client";

import { mockTables } from "@/lib/mockData";

export default function TablesPage() {
    return (
        <>
            <header className="flex flex-col justify-center mb-12 border-b-2 border-primary pb-8 items-start">
                <h2 className="text-2xl font-bold tracking-widest uppercase font-sans">Tables Management</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {mockTables.map((table) => {
                    if (table.status === "Ordered") {
                        return (
                            <div key={table.id} className="border-2 border-primary flex flex-col min-h-[320px]">
                                <div className="bg-primary text-white p-4 flex justify-between items-center">
                                    <span className="text-lg font-bold font-sans">TABLE {table.number.toString().padStart(2, '0')}</span>
                                    <span className="text-xs uppercase tracking-widest font-sans font-bold italic">Ordered</span>
                                </div>
                                <div className="p-6 flex-grow">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                        <span className="text-sm font-bold font-sans text-primary">Waiting: {table.timer}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-t-2 border-primary pt-4">
                                        <span className="text-xs font-bold uppercase tracking-widest font-sans">Total</span>
                                        <span className="text-2xl font-black font-sans">${table.total?.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="bg-primary text-white hover:bg-gray-800 transition-colors py-4 uppercase font-bold tracking-widest text-sm font-sans">
                                    Mark as Paid
                                </button>
                            </div>
                        );
                    } else if (table.status === "Empty") {
                        return (
                            <div key={table.id} className="border-2 border-primary/20 flex flex-col min-h-[320px] opacity-60 grayscale">
                                <div className="border-b border-primary/20 p-4 flex justify-between items-center bg-gray-50">
                                    <span className="text-lg font-bold font-sans">TABLE {table.number.toString().padStart(2, '0')}</span>
                                    <span className="text-xs uppercase tracking-widest font-sans font-bold">Empty</span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col items-center justify-center italic text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">event_seat</span>
                                    <p className="text-sm font-sans">Ready for service</p>
                                </div>
                                <button className="border-t border-primary/20 py-4 uppercase font-bold tracking-widest text-sm font-sans hover:bg-gray-50">
                                    Open Table
                                </button>
                            </div>
                        );
                    } else if (table.status === "Paid") {
                        return (
                            <div key={table.id} className="border-2 border-primary flex flex-col min-h-[320px] bg-gray-50">
                                <div className="border-b-2 border-primary p-4 flex justify-between items-center">
                                    <span className="text-lg font-bold font-sans">TABLE {table.number.toString().padStart(2, '0')}</span>
                                    <span className="text-xs uppercase tracking-widest font-sans font-bold">Paid</span>
                                </div>
                                <div className="p-6 flex-grow flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl mb-2">cleaning_services</span>
                                    <p className="text-sm font-bold uppercase tracking-widest font-sans">Cleanup Required</p>
                                    <p className="text-xs italic mt-1 font-sans">Total: ${table.total?.toFixed(2)}</p>
                                </div>
                                <button className="bg-white border-t border-primary py-4 uppercase font-bold tracking-widest text-sm font-sans hover:bg-gray-100">
                                    Clear Table
                                </button>
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
}
