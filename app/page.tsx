"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Automatically redirect to the first menu page when someone visits the root URL
        router.push("/menu");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light">
            <div className="text-center space-y-4 animate-pulse text-primary">
                <h1 className="text-2xl font-display font-bold tracking-tight uppercase">Jera Restaurant</h1>
                <p className="text-primary/60 font-sans tracking-widest uppercase text-xs">Loading your menu...</p>
            </div>
        </div>
    );
}
