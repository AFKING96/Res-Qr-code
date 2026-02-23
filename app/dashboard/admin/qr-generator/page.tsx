"use client";

import { mockTables } from "@/lib/mockData";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import jsPDF from "jspdf";

export default function AdminQRGeneratorPage() {
    const [selectedTable, setSelectedTable] = useState(mockTables[0]?.id.padStart(2, '0') || "01");
    const [qrDataUrl, setQrDataUrl] = useState<string>("");

    useEffect(() => {
        let identifier = selectedTable;
        if (identifier === "takeaway") {
            identifier = "takeaway";
        }
        const url = `http://localhost:3000/menu/1?table=${identifier}`;

        QRCode.toDataURL(url, {
            width: 800,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, (err, url) => {
            if (!err) {
                setQrDataUrl(url);
            }
        });
    }, [selectedTable]);

    const handleDownloadPDF = () => {
        if (!qrDataUrl) return;

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(40);
        doc.text("JERA", pageWidth / 2, 40, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(24);
        const tableName = selectedTable === "takeaway" ? "Takeaway Counter" : `Table ${selectedTable}`;
        doc.text(tableName, pageWidth / 2, 60, { align: "center" });

        const qrSize = 120;
        const xPos = (pageWidth - qrSize) / 2;
        doc.addImage(qrDataUrl, "PNG", xPos, 80, qrSize, qrSize);

        doc.setFontSize(14);
        doc.text("Scan barcode to open menu", pageWidth / 2, 220, { align: "center" });

        const fileName = selectedTable === "takeaway" ? "JERA_Takeaway_QR.pdf" : `JERA_Table_${selectedTable}_QR.pdf`;
        doc.save(fileName);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">QR Generator</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section className="bg-primary/5 border border-primary p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-primary pb-2">
                        <h3 className="text-xl font-bold uppercase tracking-tight font-display">Generate Code</h3>
                        <span className="material-symbols-outlined">qr_code_2</span>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase font-bold tracking-widest">Select Table</label>
                            <select
                                value={selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                                className="w-full border-2 border-primary rounded-none focus:ring-0 focus:border-primary text-sm font-bold uppercase p-3 bg-white"
                            >
                                {mockTables.map(t => (
                                    <option key={t.id} value={t.id.padStart(2, '0')}>Table {t.id.padStart(2, '0')}</option>
                                ))}
                                <option value="takeaway">Takeaway Counter</option>
                            </select>
                        </div>
                        <div className="bg-white border-2 border-primary p-6 flex flex-col items-center justify-center gap-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="size-48 bg-white p-2 border-2 border-primary">
                                <div className="size-full bg-primary flex items-center justify-center">
                                    {qrDataUrl ? (
                                        <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-white text-xs font-bold uppercase tracking-widest text-center px-4">Loading...</div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleDownloadPDF}
                                className="w-full bg-primary mb-2 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-colors border-2 border-primary"
                            >
                                Download High-Res QR
                            </button>
                        </div>
                    </div>
                </section>

                <section className="border border-primary p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6 border-b border-primary pb-2">
                        <h3 className="text-xl font-bold uppercase tracking-tight font-display">Information</h3>
                        <span className="material-symbols-outlined">info</span>
                    </div>
                    <div className="text-sm font-sans space-y-4">
                        <p><strong>QR Codes</strong> automatically link to the restaurant's menu for the assigned table. When a customer scans the code, their device opens the ordering interface securely.</p>
                        <p>For custom print materials, downloading the <strong>High-Res QR</strong> will provide a vector-based (.SVG or .PDF) file designed to match the restaurant's branding.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
