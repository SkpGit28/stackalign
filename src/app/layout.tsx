import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { WizardProvider } from "@/context/WizardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "StackAlign | Build Your Perfect Next.js Tech Stack in Seconds",
    template: "%s | StackAlign",
  },
  description: "Stop guessing your architecture. Generate a production-ready Next.js tech stack, context-aware .cursorrules, and project roadmap instantly with StackAlign.",
  keywords: ["tech stack generator", "Next.js architecture", "web development tools", "AI coding assistant", "cursorrules generator", "frontend best practices"],
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stack-align.vercel.app",
    title: "StackAlign | Build Your Perfect Next.js Tech Stack in Seconds",
    description: "Stop guessing your architecture. Generate a production-ready Next.js tech stack...",
    siteName: "StackAlign",
    // REMOVED: images: [...]  <-- Next.js will auto-inject this from your file!
  },

  twitter: {
    card: "summary_large_image",
    title: "StackAlign | Build Your Perfect Next.js Tech Stack",
    description: "Generate a production-ready Next.js tech stack and .cursorrules instantly.",
    // REMOVED: images: [...] <-- Next.js handles this too!
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
