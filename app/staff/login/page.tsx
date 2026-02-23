"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StaffLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Mock authentication based on Stitch reference roles
        if (username === "admin" && password === "admin") {
            router.push("/dashboard/admin");
        } else if (username === "cashier" && password === "cashier") {
            router.push("/dashboard/cashier");
        } else if (username === "kitchen" && password === "kitchen") {
            router.push("/dashboard/kitchen");
        } else {
            setError("Invalid credentials. Please verify your role access.");
            setPassword("");
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Navigation Header */}
            <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 md:px-12 lg:px-20 bg-white">
                <div className="flex items-center gap-3">
                    <div className="text-primary dark:text-white">
                        <span className="material-symbols-outlined text-3xl">restaurant</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tighter uppercase font-display">Jera Restaurant</h2>
                </div>
                <div className="hidden md:block">
                    <span className="text-xs uppercase tracking-widest opacity-50 font-sans font-bold">Internal Access Only</span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Login Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 font-display">Staff Login</h1>
                        <div className="h-1 w-12 bg-primary mx-auto"></div>
                    </div>

                    {/* Login Form Card */}
                    <div className="border border-primary p-8 md:p-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-xs uppercase tracking-widest font-bold font-sans">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                    className="w-full border-primary border-2 p-4 focus:ring-0 focus:border-primary bg-transparent text-lg rounded-none placeholder:opacity-30 font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-xs uppercase tracking-widest font-bold font-sans">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                    className="w-full border-primary border-2 p-4 focus:ring-0 focus:border-primary bg-transparent text-lg rounded-none placeholder:opacity-30 font-sans"
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-[10px] font-sans font-bold uppercase tracking-widest text-center border-t border-red-600/20 pt-2">
                                    {error}
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-5 text-lg font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 font-sans"
                                >
                                    <span>Login</span>
                                    <span className="material-symbols-outlined text-sm">login</span>
                                </button>
                            </div>
                        </form>

                        {/* Role Hints */}
                        <div className="mt-12 pt-8 border-t border-dotted border-primary/30">
                            <p className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-60 text-center font-sans">System Roles Reference</p>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between text-xs border-b border-primary/5 pb-1 font-sans">
                                    <span className="font-bold">ADMINISTRATOR</span>
                                    <span className="opacity-60 italic">admin / admin</span>
                                </div>
                                <div className="flex justify-between text-xs border-b border-primary/5 pb-1 font-sans">
                                    <span className="font-bold">CASHIER</span>
                                    <span className="opacity-60 italic">cashier / cashier</span>
                                </div>
                                <div className="flex justify-between text-xs border-b border-primary/5 pb-1 font-sans">
                                    <span className="font-bold">KITCHEN</span>
                                    <span className="opacity-60 italic">kitchen / kitchen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Site Link */}
                    <div className="mt-8 text-center">
                        <Link href="/menu/1" className="text-xs uppercase tracking-widest hover:underline opacity-50 flex items-center justify-center gap-1 font-sans font-bold">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Return to Public Website
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-6 text-center border-t border-primary/5 bg-white">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">
                    © 2024 Jera Restaurant. All Rights Reserved. Private Management Terminal.
                </p>
            </footer>
        </div>
    );
}
