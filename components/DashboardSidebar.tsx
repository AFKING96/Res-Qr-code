"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    role: "cashier" | "kitchen" | "admin";
}

export function DashboardSidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const links = {
        cashier: [
            { name: "Dashboard", href: "/dashboard/cashier" },
            { name: "Tables", href: "/dashboard/cashier/tables" },
            { name: "Orders", href: "/dashboard/cashier/orders" },
            { name: "Payments", href: "/dashboard/cashier/payments" },
        ],
        kitchen: [
            { name: "Dashboard", href: "/dashboard/kitchen" },
            { name: "Active Orders", href: "/dashboard/kitchen/active" },
            { name: "History", href: "/dashboard/kitchen/history" },
        ],
        admin: [
            { name: "Dashboard", href: "/dashboard/admin" },
            { name: "Analytics", href: "/dashboard/admin/analytics" },
            { name: "Staff", href: "/dashboard/admin/staff" },
            { name: "Tables", href: "/dashboard/admin/tables" },
            { name: "Settings", href: "/dashboard/admin/settings" },
        ],
    };

    const currentLinks = links[role] || links.cashier;

    return (
        <nav className="w-[240px] h-screen bg-black text-white fixed left-0 top-0 flex flex-col p-8 z-50">
            <div className="mb-12">
                <h1 className="text-2xl font-black tracking-tighter uppercase italic font-display">Jera</h1>
            </div>

            <ul className="flex-grow space-y-4 font-sans uppercase tracking-widest text-sm font-bold">
                {currentLinks.map((link) => {
                    const isActive = pathname === link.href || (pathname?.startsWith(link.href + "/") && link.href !== `/dashboard/${role}`);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`block p-3 cursor-pointer transition-colors ${isActive ? "bg-white text-black" : "hover:bg-white/10"}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="mt-auto">
                <Link
                    href="/staff/login"
                    className="list-none p-3 hover:bg-white/10 cursor-pointer transition-colors font-sans uppercase tracking-widest text-sm font-bold flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Logout
                </Link>
            </div>
        </nav >
    );
}
