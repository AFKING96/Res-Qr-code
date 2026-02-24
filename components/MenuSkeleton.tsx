export function MenuSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {[1, 2].map((sectionIndex) => (
                <section key={sectionIndex} className="mb-16">
                    {/* Section Title Skeleton */}
                    <div className="mb-8 border-b-2 border-primary pb-2 flex items-center">
                        <div className="h-8 w-48 bg-primary/10"></div>
                        <div className="h-4 w-24 bg-primary/5 ml-4"></div>
                    </div>

                    {/* Menu Items Skeletons */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((itemIndex) => (
                            <div key={itemIndex} className="flex items-end menu-item-row">
                                {/* Item Name */}
                                <div className="h-6 w-1/3 bg-primary/10"></div>

                                {/* Dotted Leader (static for skeleton) */}
                                <div className="flex-1 border-b-[3px] border-dotted border-primary/20 mx-4 mb-2"></div>

                                {/* Price */}
                                <div className="h-6 w-16 bg-primary/10 mr-4"></div>

                                {/* Add to Cart Button Skeleton */}
                                <div className="size-8 bg-primary/10 border border-primary/20"></div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {/* Pagination Skeleton */}
            <div className="text-center py-12 border-t border-primary/10 mt-8">
                <div className="h-4 w-48 bg-primary/5 mx-auto mb-8"></div>
                <div className="h-14 w-48 bg-primary/10 mx-auto border-2 border-primary/20"></div>
            </div>
        </div>
    );
}
