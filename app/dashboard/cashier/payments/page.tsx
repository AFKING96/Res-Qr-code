"use client";

import { mockTables, mockHistory } from "@/lib/mockData";

export default function PaymentsPage() {
    const paidTables = mockTables.filter(t => t.status === "Paid");

    return (
        <>
            <header className="flex flex-col justify-center mb-12 border-b-2 border-primary pb-8 items-start">
                <h2 className="text-2xl font-bold tracking-widest uppercase font-sans">Payments & Receipts</h2>
            </header>

            <div className="border border-primary">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white font-sans uppercase tracking-widest text-xs">
                            <th className="p-6 font-bold border-b border-gray-700">Order ID</th>
                            <th className="p-6 font-bold border-b border-gray-700">Table</th>
                            <th className="p-6 font-bold border-b border-gray-700">Time</th>
                            <th className="p-6 font-bold border-b border-gray-700">Total</th>
                            <th className="p-6 font-bold border-b border-gray-700 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                        {mockHistory.map((order, idx) => (
                            <tr key={order.id} className={`border-b border-primary/20 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                                <td className="p-6 font-bold">{order.id}</td>
                                <td className="p-6">Table {order.tableId.padStart(2, '0')}</td>
                                <td className="p-6 text-primary/60 italic">{order.time}</td>
                                <td className="p-6 font-black">${order.total.toFixed(2)}</td>
                                <td className="p-6 text-right">
                                    <button className="text-xs uppercase tracking-widest font-bold border-b-2 border-primary pb-1 hover:text-primary/60 transition-colors">
                                        Print Receipt
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
