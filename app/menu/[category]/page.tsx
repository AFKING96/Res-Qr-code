import { getAllMenuItems } from "@/lib/queries";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MenuHeader } from "@/components/MenuHeader";
import { MenuSkeleton } from "@/components/MenuSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 60;

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const resolvedParams = await params;
    const currentCategorySlug = resolvedParams?.category;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <MenuHeader />

                <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
                    <Suspense fallback={<MenuSkeleton />}>
                        <CategoryContent categorySlug={currentCategorySlug} />
                    </Suspense>
                </main>

                <footer className="py-10 bg-primary text-white text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans">Jera Restaurant © 2024</p>
                </footer>
            </div>
        </div>
    );
}

async function CategoryContent({ categorySlug }: { categorySlug: string }) {
    // Fetch all items from Sanity
    const allItems = await getAllMenuItems();

    // Filter items exactly matching the current category slug
    const items = allItems.filter(i => i.category?.toLowerCase() === categorySlug.toLowerCase());

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-display uppercase">No items found in this category.</p>
                <Link href="/menu" className="mt-8 inline-block border-2 border-primary bg-primary py-3 px-6 text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-all">
                    BACK TO CATEGORIES
                </Link>
            </div>
        );
    }

    // Determine category title from the slug if possible, or just capitalize the slug
    const title = categorySlug.replace(/-/g, ' ');

    return (
        <>
            <div className="mb-8">
                <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase font-sans hover:underline text-primary/60 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    BACK TO CATEGORIES
                </Link>
            </div>

            <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 border-b-2 border-primary pb-4 uppercase tracking-tight font-display">
                    {title}
                </h2>
                <div className="space-y-6">
                    {items.map(item => (
                        <div key={item._id} className="flex items-end menu-item-row group cursor-default">
                            <span className="text-xl md:text-2xl font-medium font-display">{item.name}</span>
                            <div className="dotted-leader border-primary mx-4"></div>
                            <span className="text-xl md:text-2xl font-bold mr-6 font-display">{item.price}</span>
                            <AddToCartButton item={item} />
                        </div>
                    ))}
                </div>
            </section>

            <div className="text-center py-12 border-t border-primary/10">
                <p className="text-sm italic opacity-70 mb-8 font-display">All milk alternatives are available</p>
            </div>
        </>
    );
}
