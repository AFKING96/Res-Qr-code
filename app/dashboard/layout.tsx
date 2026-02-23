"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Determine role based on path (simple auth mock for this structure)
    let role: "cashier" | "kitchen" | "admin" = "cashier"; // default

    if (pathname?.includes("/kitchen")) role = "kitchen";
    else if (pathname?.includes("/admin")) role = "admin";
    else if (pathname?.includes("/cashier")) role = "cashier";

    return (
        <div className="bg-background-light dark:bg-background-dark text-primary min-h-screen flex">
            <DashboardSidebar role={role} />
            <div className="w-full max-w-[1200px] min-h-screen flex flex-col bg-white dark:bg-black ml-[240px] p-8">
                {children}
            </div>
        </div>
    );
}
