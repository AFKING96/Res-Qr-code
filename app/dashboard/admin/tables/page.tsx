"use client";

import { mockTables } from "@/lib/mockData";

export default function AdminTablesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">Tables Management</h2>
            </header>

            <section className="border-2 border-primary p-6">
                <div className="flex items-center justify-between mb-6 border-b border-primary pb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight font-display">Overview</h3>
                    <span className="text-xs font-bold uppercase tracking-widest bg-primary text-white px-2 py-1">
                        {mockTables.filter(t => t.status !== "Empty").length} / {mockTables.length} Occupied
                    </span>
                </div>
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-4">
                    {mockTables.map((table) => {
                        const isOccupied = table.status === "Ordered" || table.status === "Paid";
                        return (
                            <div key={table.id} className={`aspect-square border border-primary flex flex-col items-center justify-center gap-1 transition-colors ${isOccupied ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                                <span className="text-xl font-black">T-{table.id.padStart(2, '0')}</span>
                                <span className="text-xs uppercase font-bold tracking-widest opacity-80">{table.capacity}p</span>
                                {isOccupied && <span className="text-[10px] mt-2 border border-white px-1 py-0.5">{table.status}</span>}
                            </div>
                        )
                    })}
                    <div className="aspect-square border border-primary flex flex-col items-center justify-center gap-1 bg-primary/5 hover:bg-primary hover:text-white transition-colors cursor-pointer group">
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
