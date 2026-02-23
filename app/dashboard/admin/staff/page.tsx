"use client";

import { mockStaff } from "@/lib/mockData";
import { useState } from "react";

export default function StaffPage() {
    const [staff, setStaff] = useState(mockStaff);

    const toggleStatus = (id: string, currentStatus: string) => {
        setStaff((prev) => prev.map((s) => {
            if (s.id === id) {
                return { ...s, status: currentStatus === "Clocked In" ? "Off Duty" : "Clocked In" };
            }
            return s;
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">Staff Management</h2>
            </header>

            <section className="border border-primary">
                <div className="flex items-center justify-between p-6 border-b-2 border-primary bg-primary/5">
                    <h3 className="text-xl font-bold uppercase tracking-tight font-display">Directory</h3>
                    <button className="text-xs font-bold uppercase tracking-widest bg-primary text-white border border-primary px-4 py-2 hover:bg-white hover:text-primary transition-all">+ Add Staff</button>
                </div>
                <div className="overflow-x-auto p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((s) => {
                                const isClockedIn = s.status === "Clocked In";
                                return (
                                    <tr key={s.id} className={`border-b border-primary/10 transition-colors ${!isClockedIn ? 'opacity-50 grayscale hover:bg-primary/5' : 'hover:bg-primary/5'}`}>
                                        <td className="px-6 py-5 font-black">{s.name}</td>
                                        <td className="px-6 py-5 italic text-sm font-display">{s.role}</td>
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={() => toggleStatus(s.id, s.status)}
                                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-primary px-2 py-1 bg-white hover:bg-gray-100 transition-colors"
                                            >
                                                <span className={`size-2 border border-primary ${isClockedIn ? 'bg-green-500 animate-pulse' : ''}`}></span> {s.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-[10px] uppercase font-bold tracking-widest hover:underline hover:text-primary/50">Edit User</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
