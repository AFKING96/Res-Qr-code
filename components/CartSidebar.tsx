"use client";

import { useCart } from "@/context/CartContext";

export function CartSidebar() {
    const { items, increaseQuantity, decreaseQuantity, total } = useCart();

    if (items.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg md:relative md:w-80 md:h-screen md:border-l md:border-t-0 flex flex-col">
            <h2 className="text-xl font-bold mb-4 font-serif">Your Order</h2>
            <div className="flex-1 overflow-auto space-y-4">
                {items.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => decreaseQuantity(item._id)}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                                onClick={() => increaseQuantity(item._id)}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 bg-black text-white"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800">
                    Checkout
                </button>
            </div>
        </div>
    );
}
