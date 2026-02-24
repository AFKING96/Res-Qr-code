import { getAllMenuItems } from "@/lib/queries";
import { AddToCartButton } from "@/components/AddToCartButton";
import { MenuHeader } from "@/components/MenuHeader";
import { MenuSkeleton } from "@/components/MenuSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 60;

export default async function MenuPage({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const resolvedParams = await params;
    const pageNum = resolvedParams?.page === "2" ? 2 : 1;

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <MenuHeader />

                <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
                    <Suspense fallback={<MenuSkeleton />}>
                        <MenuContent pageNum={pageNum} />
                    </Suspense>
                </main>

                <footer className="py-10 bg-primary text-white text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans">Jera Restaurant © 2024</p>
                </footer>
            </div>
        </div>
    );
}

async function MenuContent({ pageNum }: { pageNum: 1 | 2 }) {
    // Fetch all items from Sanity
    const allItems = await getAllMenuItems();

    // Group categories by page exactly as in Stitch reference
    const categoriesByPage = {
        1: [
            { id: "classic", title: "Classic", subtitle: "(Hot / Iced)" },
            { id: "drip", title: "Drip Coffee", subtitle: "(Speciality Coffee)" },
            { id: "flavoured", title: "Flavoured Coffee", subtitle: "(Hot / Iced)" },
            { id: "matcha", title: "Matcha", subtitle: "(Hot / Iced)" },
            { id: "hot", title: "Hot Drinks", subtitle: "" },
            { id: "refreshers", title: "Jera Refreshers", subtitle: "" }
        ],
        2: [
            { id: "sandwiches", title: "Sandwiches", subtitle: "" },
            { id: "desserts", title: "Desserts", subtitle: "" }
        ]
    };

    const currentCategories = categoriesByPage[pageNum as 1 | 2];

    // --- DEBUG LOGGING ---
    console.log("ALL ITEMS FETCHED:", allItems.length);
    if (allItems.length > 0) {
        console.log("SAMPLE ITEM:", { name: allItems[0].name, category: allItems[0].category, imageUrl: allItems[0].imageUrl });
        console.log("ALL CATEGORIES IN DB:", [...new Set(allItems.map(i => i.category))]);
    } else {
        console.log("WARNING: No items returned from Sanity!");
    }
    console.log("EXPECTED CATEGORIES ON THIS PAGE:", currentCategories.map(c => c.id));
    // ---------------------

    return (
        <>
            {currentCategories.map(cat => {
                const items = allItems.filter(i => {
                    // Helper to normalize strings for comparison in case of minor mismatches
                    const match = i.category?.toLowerCase() === cat.id.toLowerCase();
                    if (!match && i.category) {
                        // console.log(`Mismatch: Item Cat '${i.category}' vs Current Cat '${cat.id}'`);
                    }
                    return match;
                });

                if (items.length === 0) {
                    console.log(`No items found for category ID: ${cat.id}`);
                    return null;
                }

                return (
                    <section key={cat.id} className="mb-16">
                        <h2 className="text-2xl font-bold mb-8 border-b-2 border-primary pb-2 uppercase tracking-tight font-display">
                            {cat.title}
                            {cat.subtitle && <span className="text-sm font-normal normal-case italic opacity-60 ml-2 font-display">{cat.subtitle}</span>}
                        </h2>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item._id} className="flex items-end menu-item-row group cursor-default">
                                    <span className="text-lg font-medium font-display">{item.name}</span>
                                    <div className="dotted-leader border-primary"></div>
                                    <span className="text-lg font-bold mr-4 font-display">{item.price}</span>
                                    <AddToCartButton item={item} />
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}

            <div className="text-center py-12 border-t border-primary/10">
                <p className="text-sm italic opacity-70 mb-8 font-display">All milk alternatives are available</p>
                {pageNum === 1 ? (
                    <Link href="/menu/2" className="group flex items-center justify-center gap-4 mx-auto min-w-[200px] border-2 border-primary bg-primary py-4 px-8 text-white hover:bg-white hover:text-primary transition-all">
                        <span className="font-bold tracking-widest uppercase font-sans text-sm">NEXT PAGE</span>
                    </Link>
                ) : (
                    <Link href="/menu/1" className="group flex items-center justify-center gap-4 mx-auto min-w-[200px] border-2 border-primary bg-primary py-4 px-8 text-white hover:bg-white hover:text-primary transition-all">
                        <span className="font-bold tracking-widest uppercase font-sans text-sm">PREVIOUS PAGE</span>
                    </Link>
                )}
            </div>
        </>
    );
}
