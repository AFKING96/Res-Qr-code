"use client";

import { useState, useEffect } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";

const categories = [
    { id: "classic", label: "Classic Coffee" },
    { id: "drip", label: "Drip Coffee" },
    { id: "flavoured", label: "Flavoured Coffee" },
    { id: "matcha", label: "Matcha" },
    { id: "hot", label: "Hot Drinks" },
    { id: "refreshers", label: "Refreshers" },
    { id: "sandwiches", label: "Sandwiches" },
    { id: "desserts", label: "Desserts" },
];

export default function MenuContentHorizontal({ allItems }: { allItems: any[] }) {
    const [activeCategory, setActiveCategory] = useState<string>("classic");

    // Smooth scroll function
    const scrollToCategory = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            // Use scrollIntoView with start block
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            // Update immediately on click for snappier UI
            setActiveCategory(id);
        }
    };

    // Intersection Observer for highlighting
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find all intersecting entries
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                if (visibleEntries.length > 0) {
                    // Update to the first visible entry
                    setActiveCategory(visibleEntries[0].target.id);
                }
            },
            {
                // Trigger when section hits the top 20% of the screen
                rootMargin: "-20% 0px -80% 0px",
                threshold: 0
            }
        );

        categories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [allItems]); // Re-run if allItems changes, though it shouldn't in practice

    return (
        <div className="relative">
            {/* Sticky Horizontal Category Bar */}
            <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark py-4 border-b-2 border-primary/20 mb-12 shadow-sm">
                <div className="flex gap-6 lg:gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide px-2 items-center">
                    {categories.map((cat) => {
                        const itemsLength = allItems.filter(i => i.category?.toLowerCase() === cat.id.toLowerCase()).length;
                        if (itemsLength === 0) return null; // Only show categories with items

                        return (
                            <button
                                key={cat.id}
                                onClick={() => scrollToCategory(cat.id)}
                                className={`text-sm md:text-base font-bold tracking-widest uppercase font-sans pb-2 border-b-2 transition-all duration-300 ${activeCategory === cat.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-primary/50 hover:text-primary"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-16">
                {categories.map((cat) => {
                    // Filter items
                    const items = allItems.filter(
                        (i) => i.category?.toLowerCase() === cat.id.toLowerCase()
                    );

                    if (items.length === 0) return null;

                    return (
                        <section id={cat.id} key={cat.id} className="scroll-mt-[120px] pb-8 border-b border-primary/10 last:border-0 last:pb-0">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase tracking-tight font-display text-primary">
                                {cat.label}
                            </h2>
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item._id} className="flex items-end menu-item-row group cursor-default">
                                        <span className="text-xl md:text-2xl font-medium font-display text-primary">{item.name}</span>
                                        <div className="dotted-leader border-primary/30 mx-4 grow border-b-2 hidden sm:block"></div>
                                        <div className="border-primary/30 mx-2 grow border-b-2 sm:hidden border-dotted"></div>
                                        <span className="text-xl md:text-2xl font-bold mr-6 font-display text-primary whitespace-nowrap">{item.price}</span>
                                        <AddToCartButton item={item} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            <div className="text-center py-12 mt-16">
                <p className="text-sm italic opacity-70 font-display text-primary">All milk alternatives are available</p>
            </div>
        </div>
    );
}
