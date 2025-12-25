import { libraries } from "@/data/libraries";
import { calculateTier } from "@/lib/scoring";
import { UserConstraints, SpeedLevel, AnimationLevel } from "@/types";
import ResultCard from "@/components/results/ResultCard";
import ContextActions from "@/components/results/ContextActions";
import SafetyToggle from "@/components/results/SafetyToggle";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ResultPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const constraints: UserConstraints = {
        context: (searchParams.context as string) || "dashboard",
        speed: (searchParams.speed as SpeedLevel) || "standard",
        animation: (searchParams.animation as AnimationLevel) || "basic",
        aiReliance: (searchParams.aiReliance as "manual" | "ai") || "manual",
    };

    // Calculate tiers for all libraries
    const tieredLibraries = libraries.map((lib) => ({
        ...lib,
        tier: calculateTier(lib, constraints),
    }));

    // Filter out Tier C if using AI 100%
    const filteredLibraries = tieredLibraries.filter(
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
        <main className="min-h-screen bg-slate-950 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
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
                    <SafetyToggle
                        isLocked={constraints.aiReliance === 'ai'}
                        isActive={constraints.aiReliance === 'ai'}
                    />
                </div>

                <ContextActions libraries={topTierLibraries} />

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
                                        <Sparkles className="w-5 h-5 text-emerald-400" />
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

                    {/* Tier A - STANDARD */}
                    {grouped.A.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
                                ✅ Reliable Alternatives
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {grouped.A.map((lib) => (
                                    <ResultCard key={lib.id} library={lib} tier="A" variant="standard" />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Tier B - COMPACT */}
                    {grouped.B.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2">
                                ⚠️ Use with Caution
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {grouped.B.map((lib) => (
                                    <ResultCard key={lib.id} library={lib} tier="B" variant="compact" />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Tier C - COMPACT (Only show if not AI mode) */}
                    {grouped.C.length > 0 && constraints.aiReliance !== 'ai' && (
                        <section>
                            <h2 className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2">
                                ☢️ Experimental
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {grouped.C.map((lib) => (
                                    <ResultCard key={lib.id} library={lib} tier="C" variant="compact" />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
