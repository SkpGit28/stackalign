import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { WizardProvider } from "@/context/WizardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "StackAlign | Smart Tech Stack Generator",
        template: "%s | StackAlign",
    },
    description: "Stop guessing your tech stack. Get AI-powered, context-aware architectural recommendations for your next project.",
    keywords: ["tech stack", "web development", "Next.js", "AI", "architecture", "developer tools"],
    authors: [{ name: "Sushant Kumar", url: "https://stack-align.vercel.app" }],
    creator: "Sushant Kumar",

    // This controls how it looks on social media (Facebook, LinkedIn, Discord)
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://stack-align.vercel.app",
        title: "StackAlign - Build the Perfect Stack",
        description: "AI-driven tech stack recommendations for developers. Optimized for performance and scalability.",
        siteName: "StackAlign",
        images: [
            {
                url: "/opengraph-image.png", // You need to add this image to your public folder!
                width: 1200,
                height: 630,
                alt: "StackAlign Preview",
            },
        ],
    },

    // This controls how it looks on Twitter
    twitter: {
        card: "summary_large_image",
        title: "StackAlign - Build the Perfect Stack",
        description: "Stop guessing. Start building. AI-powered stack recommendations.",
        images: ["/opengraph-image.png"], // Same image
        creator: "@skponpurpose", // Optional: Change to your handle
    },

    icons: {
        icon: "/favicon.ico",
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
            </body>
        </html>
    );
}
