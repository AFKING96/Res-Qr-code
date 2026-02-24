export function OrderConfirmationSkeleton() {
    return (
        <div className="bg-background-light text-primary min-h-screen flex flex-col">
            {/* Top Navigation / Logo Bar */}
            <header className="w-full py-8 border-b border-primary/10 bg-white">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">restaurant</span>
                        <h1 className="text-xl font-bold tracking-tighter uppercase font-display">Jera</h1>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center py-16 px-6 relative">
                {/* Title Section Skeleton */}
                <div className="text-center mb-12 flex flex-col items-center">
                    <div className="w-72 h-12 bg-primary/10 mb-4 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    <div className="w-48 h-4 bg-primary/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>

                {/* Main Confirmation Card Skeleton */}
                <div className="w-full max-w-xl border border-primary p-8 md:p-12 bg-white flex flex-col">

                    {/* Identification Header Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-primary/10">
                        <div className="flex flex-col gap-2">
                            <div className="w-24 h-3 bg-primary/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                            <div className="w-32 h-8 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
                            <div className="w-24 h-3 bg-primary/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                            <div className="w-32 h-8 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </div>
                    </div>

                    {/* Status Badge Skeleton */}
                    <div className="py-8 flex justify-center">
                        <div className="w-48 h-10 border border-primary/10 bg-primary/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                    </div>

                    {/* Receipt Content Skeleton */}
                    <div className="space-y-6 flex-1 w-full">
                        <div className="border-b border-primary pb-2 flex items-end">
                            <div className="w-32 h-6 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center">
                                        <div className="w-40 h-5 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                        <div className="w-16 h-5 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                    </div>
                                    <div className="border-b border-primary/10 mt-4"></div>
                                </div>
                            ))}
                        </div>

                        {/* Total Calculation Skeleton */}
                        <div className="pt-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="w-16 h-4 bg-primary/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                <div className="w-16 h-4 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary">
                                <div className="w-20 h-6 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                <div className="w-24 h-8 bg-primary/20 animate-[pulse_2s_ease-in-out_infinite]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Selection Skeleton */}
                    <div className="mt-12 w-full">
                        <div className="border-b border-primary pb-2 mb-6 flex items-end">
                            <div className="w-48 h-6 bg-primary/10 animate-[pulse_2s_ease-in-out_infinite]"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2].map((idx) => (
                                <div key={idx} className="relative flex flex-col items-center justify-center p-6 border-[3px] border-primary/10 bg-white">
                                    <div className="w-24 h-8 bg-primary/5 mb-4 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                    <div className="w-6 h-6 bg-transparent"></div> {/* Placeholder for checkmark area */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
