"use client";

import { mockOrders } from "@/lib/mockData";

export default function OrdersPage() {
    return (
        <>
            <header className="flex flex-col justify-center mb-12 border-b-2 border-primary pb-8 items-start">
                <h2 className="text-2xl font-bold tracking-widest uppercase font-sans">Active Orders</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {mockOrders.map((order) => (
                    <div key={order.id} className="border-2 border-primary flex flex-col">
                        <div className="bg-primary text-white p-4 flex justify-between items-center border-b border-primary">
                            <div>
                                <span className="text-lg font-bold font-sans mr-4">TABLE {order.tableId.padStart(2, '0')}</span>
                                <span className="text-xs uppercase tracking-widest font-sans opacity-70">ID: {order.id}</span>
                            </div>
                            <span className="text-xs uppercase tracking-widest font-sans font-bold italic border border-white px-2 py-1">{order.status}</span>
                        </div>
                        <div className="p-6 flex-grow">
                            <ul className="space-y-4 mb-6 font-sans text-sm">
                                {order.items.map((item, idx) => (
                                    <li key={idx} className="flex justify-between border-b border-gray-200 pb-2">
                                        <span className="font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-end border-t-2 border-primary pt-4">
                                <span className="text-xs font-bold uppercase tracking-widest font-sans italic">Time: {order.time}</span>
                                <span className="text-2xl font-black font-sans">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
