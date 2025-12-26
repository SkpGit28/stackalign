"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import { libraries } from "@/data/libraries";
import { UserConstraints, SpeedLevel, AnimationLevel } from "@/types";
import ResultCard from "@/components/results/ResultCard";
import ContextActions from "@/components/results/ContextActions";
import SafetyToggle from "@/components/results/SafetyToggle";
import Link from "next/link";
import { ArrowLeft, Sparkle, Info, CaretDown, MagnifyingGlass, Command } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

function ResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isCompleted } = useWizard();

    useEffect(() => {
        if (!isCompleted) {
            router.replace("/wizard");
        }
    }, [isCompleted, router]);

    if (!isCompleted) {
        return null;
    }

    const constraints: UserConstraints = {
        context: (searchParams.get("context") as string) || "dashboard",
        speed: (searchParams.get("speed") as SpeedLevel) || "standard",
        animation: (searchParams.get("animation") as AnimationLevel) || "basic",
        aiReliance: (searchParams.get("aiReliance") as "manual" | "ai") || "manual",
    };

    // Filter libraries based on constraints
    // Libraries now have preassigned tiers, we just filter them
    const filteredLibraries = libraries.filter(
        (lib) => !(constraints.aiReliance === "ai" && lib.tier === "C")
    );

    // Group by Tier
    const grouped = {
        S: filteredLibraries.filter((l) => l.tier === "S"),
        A: filteredLibraries.filter((l) => l.tier === "A"),
        B: filteredLibraries.filter((l) => l.tier === "B"),
        C: filteredLibraries.filter((l) => l.tier === "C"),
    };

    // Combine Top Tiers for Context
    const topTierLibraries = [...grouped.S, ...grouped.A];

    return (
        <main className="min-h-screen bg-slate-950 p-6 md:p-12 pb-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/wizard"
                            className="p-2 rounded-full hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-100">Stack Recommendations</h1>
                            <p className="text-slate-400 text-sm">
                                {constraints.context} • {constraints.speed}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-100 hidden md:flex"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-command-menu'))}
                        >
                            <MagnifyingGlass className="w-4 h-4 mr-2" />
                            Search
                            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                        <SafetyToggle
                            isLocked={constraints.aiReliance === 'ai'}
                            isActive={constraints.aiReliance === 'ai'}
                        />
                    </div>
                </div>

                <ContextActions libraries={topTierLibraries} />

                {/* Methodology Disclaimer */}
                <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-3 md:p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-xs md:text-sm font-bold text-blue-100 mb-1">How StackAlign Classifies Risk</h3>
                            <p className="text-xs text-blue-200/80 leading-relaxed">
                                Tiers are based on how consistently LLMs generate correct code for a library.
                                This is a measure of <strong>AI Reliability</strong>, not <strong>Engineering Merit</strong>.
                                A "High Risk" rating indicates AI frequently hallucinates syntax, NOT that the library is poorly designed.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* HERO STACK (Tier S) */}
                    <section>
                        {grouped.S.length > 0 ? (
                            <Card className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
                                {/* Inner Glow */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                {/* Background Gradient */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                                {/* Recommended Pill */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-emerald-950 text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-emerald-900/20 z-10">
                                    Recommended
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-8">
                                        <Sparkle className="w-5 h-5 text-emerald-400" />
                                        <h2 className="text-xl font-medium tracking-tight text-slate-100">
                                            Your Optimized Stack
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {grouped.S.map((lib) => (
                                            <ResultCard key={lib.id} library={lib} tier="S" variant="hero" />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <div className="p-6 rounded-xl border border-yellow-500/20 bg-yellow-950/10 text-yellow-200">
                                No Tier S libraries found for these strict constraints. Consider relaxing your speed or animation requirements.
                            </div>
                        )}
                    </section>

                    {/* Collapsible Tier Sections */}
                    <Accordion
                        type="multiple"
                        className="space-y-4"
                        onValueChange={(values) => {
                            // Auto-scroll to the last opened section
                            if (values.length > 0) {
                                const lastValue = values[values.length - 1];
                                setTimeout(() => {
                                    const element = document.querySelector(`[data-value="${lastValue}"]`);
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                            inline: 'nearest'
                                        });
                                    }
                                }, 100);
                            }
                        }}
                    >
                        {/* Tier A - Reliable Alternatives */}
                        {grouped.A.length > 0 && (
                            <AccordionItem value="tier-a" data-value="tier-a" className="border border-blue-500/20 rounded-xl bg-blue-950/10 overflow-hidden">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-950/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                                        <h2 className="text-lg font-bold text-blue-100">
                                            ✅ Reliable Alternatives
                                        </h2>
                                        <span className="text-sm text-blue-300/60 font-mono">({grouped.A.length})</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                        {grouped.A.map((lib) => (
                                            <ResultCard key={lib.id} library={lib} tier="A" variant="standard" />
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )}

                        {/* Tier B - Use with Caution */}
                        {grouped.B.length > 0 && (
                            <AccordionItem value="tier-b" data-value="tier-b" className="border border-orange-500/20 rounded-xl bg-orange-950/10 overflow-hidden">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-orange-950/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                                        <h2 className="text-lg font-bold text-orange-100">
                                            ⚠️ Use with Caution
                                        </h2>
                                        <span className="text-sm text-orange-300/60 font-mono">({grouped.B.length})</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                        {grouped.B.map((lib) => (
                                            <ResultCard key={lib.id} library={lib} tier="B" variant="compact" />
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )}

                        {/* Tier C - Experimental (Only show if not AI mode) */}
                        {grouped.C.length > 0 && constraints.aiReliance !== 'ai' && (
                            <AccordionItem value="tier-c" data-value="tier-c" className="border border-red-500/20 rounded-xl bg-red-950/10 overflow-hidden">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-red-950/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-400" />
                                        <h2 className="text-lg font-bold text-red-100">
                                            ☢️ Experimental
                                        </h2>
                                        <span className="text-sm text-red-300/60 font-mono">({grouped.C.length})</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                        {grouped.C.map((lib) => (
                                            <ResultCard key={lib.id} library={lib} tier="C" variant="compact" />
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                </div>
            </div>
        </main>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-slate-400 animate-pulse">Loading your stack...</div>
            </div>
        }>
            <ResultContent />
        </Suspense>
    );
}
