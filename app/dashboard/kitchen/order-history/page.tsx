"use client";

import { mockHistory } from "@/lib/mockData";

export default function OrderHistoryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between border-b border-primary pb-4 mb-4">
                <h1 className="text-2xl font-black uppercase tracking-tighter font-display">Order History</h1>
            </header>

            <main className="flex-grow">
                <div className="border border-primary">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black text-white font-sans uppercase tracking-widest text-xs">
                                <th className="p-6 font-bold border-b border-gray-700">Order ID</th>
                                <th className="p-6 font-bold border-b border-gray-700">Table</th>
                                <th className="p-6 font-bold border-b border-gray-700">Time Served</th>
                                <th className="p-6 font-bold border-b border-gray-700">Items</th>
                                <th className="p-6 font-bold border-b border-gray-700 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-sans text-sm">
                            {mockHistory.map((order, idx) => (
                                <tr key={order.id} className={`border-b border-primary/20 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="p-6 font-bold">{order.id}</td>
                                    <td className="p-6">Table {order.tableId.padStart(2, '0')}</td>
                                    <td className="p-6 text-primary/60 italic">{order.time}</td>
                                    <td className="p-6">
                                        <ul className="list-disc pl-4 text-xs font-bold font-sans">
                                            {order.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="p-6 text-right font-black uppercase tracking-widest">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
