import type { Metadata } from "next";
import { Noto_Serif, Noto_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    variable: "--font-noto-serif"
});

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-noto-sans"
});

export const metadata: Metadata = {
    title: "Jera Restaurant",
    description: "Jera Restaurant QR Ordering System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body className={`${notoSerif.variable} ${notoSans.variable} font-sans`}>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
