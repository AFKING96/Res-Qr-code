"use client";

export default function AdminSettingsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">System Settings</h2>
            </header>

            <div className="max-w-2xl border-2 border-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <form className="space-y-8 flex flex-col font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-primary/20 pb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest">Restaurant Name</label>
                            <input type="text" defaultValue="Jera Minimalist Dining" className="border-2 border-primary p-3 focus:outline-none focus:ring-0 focus:border-black font-bold" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest">Currency</label>
                            <select className="border-2 border-primary p-3 focus:outline-none focus:ring-0 focus:border-black font-bold uppercase">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-b border-primary/20 pb-8">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-2 font-display">Features</h4>
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="size-5 border-2 border-primary rounded-none checked:bg-primary accent-black" />
                            <span className="font-bold group-hover:underline">Enable Kitchen Display System (KDS)</span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="size-5 border-2 border-primary rounded-none checked:bg-primary accent-black" />
                            <span className="font-bold group-hover:underline">Allow Customer Self-Ordering via QR</span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="checkbox" className="size-5 border-2 border-primary rounded-none checked:bg-primary accent-black" />
                            <span className="font-bold group-hover:underline">Require Staff Authentication for Actions</span>
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <button type="button" className="px-6 py-3 border-2 border-primary text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">Discard</button>
                        <button type="button" className="px-6 py-3 bg-primary text-white border-2 border-primary text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
