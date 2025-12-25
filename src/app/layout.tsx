import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { WizardProvider } from "@/context/WizardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stack-align.vercel.app'),
    title: {
        default: "StackAlign | Build Your Perfect Next.js Tech Stack",
        template: "%s | StackAlign",
    },
    description: "Stop guessing your architecture. Generate a production-ready Next.js tech stack, context-aware .cursorrules, and a complete project roadmap instantly with StackAlign.",
    keywords: ["tech stack generator", "Next.js architecture", "web development tools", "AI coding assistant", "cursorrules generator", "frontend best practices"],

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://stack-align.vercel.app",
        title: "StackAlign | Build Your Perfect Next.js Tech Stack",
        description: "Stop guessing your architecture. Generate a production-ready Next.js tech stack, context-aware .cursorrules, and a complete project roadmap instantly.",
        siteName: "StackAlign",
    },

    twitter: {
        card: "summary_large_image",
        title: "StackAlign | Build Your Perfect Next.js Tech Stack",
        description: "Generate a production-ready Next.js tech stack and .cursorrules instantly.",
    },
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
                <WizardProvider>
                    {children}
                </WizardProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
