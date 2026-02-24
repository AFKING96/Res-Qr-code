import { getAllMenuItems } from "@/lib/queries";
import { MenuHeader } from "@/components/MenuHeader";
import { MenuSkeleton } from "@/components/MenuSkeleton";
import { Suspense } from "react";
import MenuContentHorizontal from "@/components/MenuContentHorizontal";

export const revalidate = 60;

export default async function MenuPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <MenuHeader />

                <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 relative">
                    <Suspense fallback={<MenuSkeleton />}>
                        <MenuDataFetcher />
                    </Suspense>
                </main>

                <footer className="py-10 bg-primary text-white text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans">Jera Restaurant © 2024</p>
                </footer>
            </div>
        </div>
    );
}

async function MenuDataFetcher() {
    const allItems = await getAllMenuItems();
    return <MenuContentHorizontal allItems={allItems} />;
}
