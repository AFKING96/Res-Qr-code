"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RevyButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem("revy_intro_seen");
        if (!hasSeenIntro) {
            const timer = setTimeout(() => {
                setHasAnimated(true);
                setTimeout(() => setShowIntro(true), 600); // Show bubble after animation finishes
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissIntro = () => {
        setShowIntro(false);
        sessionStorage.setItem("revy_intro_seen", "true");
    };

    // Auto dismiss after 4 seconds
    useEffect(() => {
        if (showIntro) {
            const timer = setTimeout(() => {
                dismissIntro();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [showIntro]);

    return (
        <>
            {/* Intro Speech Bubble */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-[92px] right-6 z-40 bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(10,10,10,1)] max-w-[240px]"
                    >
                        <button
                            onClick={dismissIntro}
                            className="absolute -top-3 -right-3 w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                            <span className="font-bold text-xs leading-none -mt-0.5">x</span>
                        </button>
                        <p className="font-sans font-bold text-sm leading-tight">
                            Hi 👋 I&apos;m Revy.<br />
                            Not sure what to order?<br />
                            Let me help you pick ✨
                        </p>
                        {/* Little triangle pointing to button */}
                        <div className="absolute -bottom-[10px] right-4 w-4 h-4 bg-white border-b-2 border-r-2 border-black rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => {
                    setIsOpen(true);
                    if (showIntro) dismissIntro();
                }}
                animate={hasAnimated ? {
                    scale: [0.9, 1.05, 1],
                    rotate: [0, -6, 6, 0]
                } : {}}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                }}
                onAnimationComplete={() => {
                    if (hasAnimated) { // Reset so it only plays once
                        setHasAnimated(false);
                        sessionStorage.setItem("revy_intro_seen", "true");
                    }
                }}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-black border-2 border-black rounded-full flex items-center justify-center transition-colors group ${isOpen ? 'shadow-none' : 'shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    }`}
                aria-label="Ask Revy AI"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden border border-white/20">
                    {/* Minimal AI face representation */}
                    <div className="flex gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90 animate-pulse" style={{ animationDelay: "200ms" }}></div>
                    </div>
                </div>
            </motion.button>

            {/* Bottom Sheet Modal Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Bottom Sheet Modal Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[70] bg-white border-t-[3px] border-black shadow-[0_-8px_0_0_rgba(10,10,10,1)] max-h-[85vh] overflow-y-auto"
                    // Brutalist style: sharp corners on top
                    >
                        <div className="max-w-md mx-auto p-6 md:p-8 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <span className="font-bold leading-none -mt-1">x</span>
                            </button>

                            <div className="mb-6 border-b-2 border-black pb-4 text-center">
                                <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-primary mb-2">
                                    Hi 👋 I&apos;m Revy
                                </h3>
                                <p className="font-sans font-bold text-primary/60 uppercase tracking-wide text-sm">
                                    Need help choosing?
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    "Suggest something sweet",
                                    "What's popular?",
                                    "Surprise me"
                                ].map((option, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => {
                                                // Static UI: Doesn't actually do anything per requirements
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left p-4 border-2 border-black font-sans font-bold uppercase tracking-widest text-sm hover:bg-primary/5 hover:shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all flex items-center justify-between group"
                                        >
                                            <span>• {option}</span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span >
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
