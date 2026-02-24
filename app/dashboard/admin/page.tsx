"use client";

import { mockRevenue, mockTables } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function AdminDashboard() {
    const router = useRouter();

    // -- QR Generator State --
    const [qrTable, setQrTable] = useState(mockTables[0]?.id.padStart(2, '0') || "01");
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    useEffect(() => {
        let identifier = qrTable;
        if (identifier === "takeaway") identifier = "takeaway";
        const url = `http://localhost:3000/menu?table=${identifier}`;
        QRCode.toDataURL(url, { width: 400, margin: 2, color: { dark: '#000000', light: '#ffffff' } }, (err, url) => {
            if (!err) setQrDataUrl(url);
        });
    }, [qrTable]);

    // -- Table Interactivity State --
    type TableData = { id: string; pax: string; status: "occupied" | "available" };
    const [tablesList, setTablesList] = useState<TableData[]>([
        { id: "01", pax: "4p", status: "occupied" },
        { id: "02", pax: "2p", status: "available" },
        { id: "03", pax: "6p", status: "occupied" },
        { id: "04", pax: "4p", status: "available" },
        { id: "05", pax: "2p", status: "occupied" },
        { id: "06", pax: "2p", status: "available" }
    ]);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [editingTableIndex, setEditingTableIndex] = useState<number | null>(null);
    const [modalTableId, setModalTableId] = useState("");
    const [modalTablePax, setModalTablePax] = useState("2p");
    const [modalTableStatus, setModalTableStatus] = useState<"occupied" | "available">("available");

    const openTableModal = (index: number | null) => {
        if (index !== null) {
            setEditingTableIndex(index);
            const t = tablesList[index];
            setModalTableId(t.id);
            setModalTablePax(t.pax);
            setModalTableStatus(t.status);
        } else {
            setEditingTableIndex(null);
            setModalTableId(`0${tablesList.length + 1}`.slice(-2));
            setModalTablePax("2p");
            setModalTableStatus("available");
        }
        setIsTableModalOpen(true);
    };

    const handleSaveTable = () => {
        const newTable: TableData = { id: modalTableId, pax: modalTablePax, status: modalTableStatus };
        if (editingTableIndex !== null) {
            const newList = [...tablesList];
            newList[editingTableIndex] = newTable;
            setTablesList(newList);
        } else {
            setTablesList([...tablesList, newTable]);
        }
        setIsTableModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Area */}
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">Revenue Summary</h2>
                <span className="text-sm italic font-sans text-primary/60">Last updated: Today, 11:45 AM</span>
            </header>

            {/* Revenue Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary mb-16">
                <div className="p-8 border-b md:border-b-0 md:border-r border-primary flex flex-col justify-between h-48">
                    <span className="uppercase text-xs font-bold tracking-widest text-primary/50 font-sans">Daily Revenue</span>
                    <div className="flex flex-col">
                        <span className="text-4xl font-black font-sans">${mockRevenue.daily.toFixed(2)}</span>
                        <span className="text-sm font-bold mt-2 flex items-center gap-1 font-sans text-green-700">
                            <span className="material-symbols-outlined text-sm">trending_up</span> +12.5% vs yesterday
                        </span>
                    </div>
                </div>
                <div className="p-8 border-b md:border-b-0 md:border-r border-primary flex flex-col justify-between h-48">
                    <span className="uppercase text-xs font-bold tracking-widest text-primary/50 font-sans">Average Check</span>
                    <div className="flex flex-col">
                        <span className="text-4xl font-black font-sans">$64.50</span>
                        <span className="text-sm font-bold mt-2 font-sans opacity-70">324 Transactions today</span>
                    </div>
                </div>
                <div className="p-8 flex flex-col justify-between h-48 bg-primary text-white">
                    <span className="uppercase text-xs font-bold tracking-widest opacity-70 font-sans">Monthly Target</span>
                    <div className="flex flex-col">
                        <span className="text-4xl font-black font-sans">82%</span>
                        <div className="w-full h-1 bg-white/20 mt-4">
                            <div className="h-full bg-white w-[82%]"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans mb-16">
                {/* Left Column */}
                <div className="lg:col-span-4 flex flex-col gap-16">
                    {/* Top Selling */}
                    <div>
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-display">Top Selling Items</h3>
                            <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <ul className="space-y-6">
                            <li className="flex items-center justify-between group cursor-pointer border-b border-primary/10 pb-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg group-hover:underline">Wagyu Ribeye</span>
                                    <span className="text-xs text-primary/50 italic font-bold">Main Course • 48 Sold</span>
                                </div>
                                <span className="font-black text-xl">$125.00</span>
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer border-b border-primary/10 pb-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg group-hover:underline">Black Truffle Pasta</span>
                                    <span className="text-xs text-primary/50 italic font-bold">Handmade • 36 Sold</span>
                                </div>
                                <span className="font-black text-xl">$42.00</span>
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer border-b border-primary/10 pb-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg group-hover:underline">Oysters Rockefeller</span>
                                    <span className="text-xs text-primary/50 italic font-bold">Appetizer • 29 Sold</span>
                                </div>
                                <span className="font-black text-xl">$28.00</span>
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer border-b border-primary/10 pb-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg group-hover:underline">Vintage Cabernet</span>
                                    <span className="text-xs text-primary/50 italic font-bold">Wine • 22 Sold</span>
                                </div>
                                <span className="font-black text-xl">$210.00</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => router.push("/dashboard/admin/analytics")}
                            className="w-full mt-10 py-4 border-2 border-primary font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all">
                            View Full Menu Analytics
                        </button>
                    </div>

                    {/* Table Management */}
                    <section>
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-display">Tables</h3>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary/60">{tablesList.filter(t => t.status === 'occupied').length} / {tablesList.length} Occupied</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {tablesList.map((t, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => openTableModal(idx)}
                                    className={`aspect-square border-2 border-primary flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${t.status === 'occupied' ? 'bg-primary text-white hover:bg-slate-800' : 'bg-white hover:bg-primary/5'}`}
                                >
                                    <span className="text-xs font-bold">T-{t.id}</span>
                                    <span className="text-[10px] uppercase opacity-60">{t.pax}</span>
                                </div>
                            ))}
                            <div
                                onClick={() => openTableModal(null)}
                                className="aspect-square border-2 border-primary flex flex-col items-center justify-center gap-1 border-dashed opacity-40 hover:bg-primary/5 cursor-pointer transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-8 flex flex-col gap-16">
                    {/* Staff Management */}
                    <section>
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-display">Staff Management</h3>
                            <button className="text-xs font-bold uppercase tracking-widest border-2 border-primary px-3 py-1 hover:bg-primary hover:text-white transition-all">+ Add Staff</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-primary">
                                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Name</th>
                                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Role</th>
                                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Status</th>
                                        <th className="py-4 text-xs font-bold uppercase tracking-widest text-primary/50 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-primary/10 hover:bg-primary/5">
                                        <td className="py-4 font-bold">Julian Vasseur</td>
                                        <td className="py-4 italic text-sm text-primary/70">Head Chef</td>
                                        <td className="py-4">
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                                <span className="size-2 bg-primary"></span> Clocked In
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-xs uppercase font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Edit</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-primary/10 hover:bg-primary/5">
                                        <td className="py-4 font-bold">Elena Moretti</td>
                                        <td className="py-4 italic text-sm text-primary/70">Sommelier</td>
                                        <td className="py-4">
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                                <span className="size-2 bg-primary"></span> Clocked In
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-xs uppercase font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Edit</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-primary/10 hover:bg-primary/5">
                                        <td className="py-4 font-bold">Marcus Thorne</td>
                                        <td className="py-4 italic text-sm text-primary/70">Floor Manager</td>
                                        <td className="py-4">
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter opacity-30">
                                                <span className="size-2 border border-primary"></span> Off Duty
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-xs uppercase font-bold underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* QR Generator Preview */}
                    <section>
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-4">
                            <h3 className="text-xl font-bold uppercase tracking-tight font-display">QR Generator</h3>
                            <span className="material-symbols-outlined">qr_code_2</span>
                        </div>
                        <div className="bg-primary/5 border-2 border-primary p-6 flex items-center justify-center gap-6">
                            <div className="w-full flex md:flex-row flex-col gap-8 items-center max-w-lg">
                                <div className="flex flex-col gap-2 flex-1 w-full">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-primary/50">Select Table</label>
                                    <select
                                        value={qrTable}
                                        onChange={(e) => setQrTable(e.target.value)}
                                        className="w-full border-2 border-primary rounded-none focus:ring-0 focus:border-primary text-sm font-bold uppercase bg-white p-3"
                                    >
                                        {mockTables.map(t => (
                                            <option key={`m-${t.id}`} value={t.id.padStart(2, '0')}>Table {t.id.padStart(2, '0')}</option>
                                        ))}
                                        {tablesList.filter(t => !mockTables.find(mt => mt.id === t.id)).map(t => (
                                            <option key={`dyn-${t.id}`} value={t.id.padStart(2, '0')}>Table {t.id.padStart(2, '0')}</option>
                                        ))}
                                        <option value="takeaway">Takeaway Counter</option>
                                    </select>
                                    <button
                                        onClick={() => router.push("/dashboard/admin/qr-generator")}
                                        className="w-full mt-4 bg-primary text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary border-2 border-primary transition-colors"
                                    >
                                        Open Full Generator
                                    </button>
                                </div>
                                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                                    <div className="size-32 bg-white p-2 border-2 border-primary w-full max-w-[160px]">
                                        <div className="size-full bg-primary flex items-center justify-center">
                                            {qrDataUrl ? (
                                                <img src={qrDataUrl} alt="QR Code Preview" className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="text-white text-[8px] font-bold uppercase tracking-widest text-center px-2">Loading...</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Brutalist Table Modal */}
            {isTableModalOpen && (
                <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border-4 border-primary p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center mb-6 border-b-2 border-primary pb-2">
                            <h3 className="text-xl font-bold uppercase tracking-widest font-display">
                                {editingTableIndex !== null ? "Edit Table" : "New Table"}
                            </h3>
                            <button onClick={() => setIsTableModalOpen(false)} className="text-primary hover:text-black">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 font-sans text-sm font-bold uppercase">
                            <div className="flex flex-col gap-1">
                                <label>Table ID (e.g., 07)</label>
                                <input
                                    className="border-2 border-primary p-2 focus:ring-0 focus:border-primary font-bold uppercase"
                                    value={modalTableId}
                                    onChange={(e) => setModalTableId(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Capacity (e.g., 4p)</label>
                                <input
                                    className="border-2 border-primary p-2 focus:ring-0 focus:border-primary font-bold uppercase"
                                    value={modalTablePax}
                                    onChange={(e) => setModalTablePax(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Status</label>
                                <select
                                    className="border-2 border-primary p-2 focus:ring-0 focus:border-primary bg-white font-bold uppercase"
                                    value={modalTableStatus}
                                    onChange={(e) => setModalTableStatus(e.target.value as "occupied" | "available")}
                                >
                                    <option value="occupied">Occupied</option>
                                    <option value="available">Available</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleSaveTable}
                            className="w-full mt-8 bg-primary text-white py-4 text-xs font-bold uppercase tracking-[0.2em] border-2 border-primary hover:bg-white hover:text-primary transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            <footer className="mt-auto border-t-2 border-primary pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] font-sans text-primary/40 pb-8">
                <span>Jera System Management Panel</span>
                <span className="mt-4 md:mt-0 italic font-display normal-case">Operational Excellence</span>
            </footer>
        </div>
    );
}
