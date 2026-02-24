import { MenuHeader } from "@/components/MenuHeader";
import Link from "next/link";
import { menuCategories } from "@/lib/menuCategories";

export default function MenuCategoriesPage() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <MenuHeader />

                <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
                    <div className="mb-12 text-center md:text-left border-b-2 border-primary pb-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase font-display mb-2">MENU</h1>
                        <p className="text-primary/60 font-sans tracking-wide uppercase text-sm">Choose a category</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {menuCategories.map((category) => (
                            <Link
                                href={`/menu/${category.slug}`}
                                key={category.slug}
                                className="group flex flex-col items-center justify-center p-8 border-2 border-primary bg-background-light transition-all duration-200 hover:bg-primary hover:text-white hover:scale-[1.02]"
                            >
                                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight font-display text-center">
                                    {category.title}
                                </h2>
                            </Link>
                        ))}
                    </div>
                </main>

                <footer className="py-10 bg-primary text-white text-center mt-auto">
                    <p className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans">Jera Restaurant © 2024</p>
                </footer>
            </div>
        </div>
    );
}
