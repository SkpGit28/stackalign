import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "StackAlign",
    description: "The Hallucination-Proof Stack Picker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-slate-950 text-slate-200 antialiased",
                    inter.className
                )}
            >
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
