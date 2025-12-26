"use client";

import { Library } from "@/types";
import {
    Shield,
    Copy,
    ArrowSquareOut,
    ArrowLeft,
    TerminalWindow,
    CheckCircle,
    Warning,
    XCircle,
    Lightning,
    Layout,
    TextT,
    CursorClick,
    MagnifyingGlass,
    Command
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LibraryProfileProps {
    library: Library;
}

export default function LibraryProfile({ library }: LibraryProfileProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyContext = async () => {
        await navigator.clipboard.writeText(library.contextPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case "S": return <CheckCircle className="w-6 h-6 text-emerald-400" />;
            case "A": return <CheckCircle className="w-6 h-6 text-blue-400" />;
            case "B": return <Warning className="w-6 h-6 text-yellow-400" />;
            default: return <XCircle className="w-6 h-6 text-red-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-slate-100 pb-20">
            {/* Sticky Action Bar */}
            <div className="sticky top-0 z-50 w-full bg-zinc-950/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Wizard
                            </Button>
                        </Link>
                        <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                            <span className="font-bold text-sm text-slate-200">{library.name}</span>
                            <Badge variant="outline" className="text-[10px] uppercase tracking-wider h-5">
                                {library.tier} Tier
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <Button
                            onClick={handleCopyContext}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            {copied ? "Copied!" : "Copy Context"}
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300" asChild>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(library.name + ' documentation')}`} target="_blank" rel="noopener noreferrer">
                                <ArrowSquareOut className="w-4 h-4 mr-2" />
                                Docs
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pt-8 space-y-12">
                {/* Vibe Hero */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-zinc-950 border border-slate-800 p-8 md:p-12">
                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            {getTierIcon(library.tier)}
                            <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                                {library.safetyLabel}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                                {library.baseAIScore}% AI Safety Score
                            </Badge>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                            {library.name}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed mb-8">
                            {library.killerReason}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-800 text-xs font-mono text-slate-400">
                                <Lightning className="w-3 h-3 text-yellow-400" />
                                {library.tags.speed.toUpperCase()}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-800 text-xs font-mono text-slate-400">
                                <Layout className="w-3 h-3 text-blue-400" />
                                {library.tags.animation.toUpperCase()} ANIMATION
                            </div>
                        </div>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                </section>

                {/* Component Grid Placeholder (Visual Vibe) */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Visual Profile</h2>
                            <p className="text-sm text-slate-500">A forensic look at the component aesthetics</p>
                        </div>
                        <Badge variant="outline" className="text-slate-500 border-slate-800">
                            Gallery Preview
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
                        {/* Bento Grid Gallery */}
                        <div className="md:col-span-2 md:row-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center gap-6 group hover:border-emerald-500/30 transition-colors overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-full max-w-xs space-y-4 relative z-10">
                                <div className="h-12 w-full bg-slate-800 rounded-lg animate-pulse" />
                                <div className="h-12 w-3/4 bg-slate-800 rounded-lg animate-pulse" />
                                <div className="h-40 w-full bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-center">
                                    <Layout className="w-12 h-12 text-slate-700" />
                                </div>
                            </div>
                            <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">Main Layout Pattern</span>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-slate-800 rounded" />
                                <div className="h-2 w-2/3 bg-slate-800 rounded" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-600 uppercase">Window Primitive</span>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                                <CursorClick className="w-6 h-6 text-slate-600" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-600 uppercase text-center">Interactive States</span>
                        </div>

                        <div className="md:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-center gap-6 hover:border-orange-500/30 transition-colors">
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-full bg-slate-800 rounded" />
                                <div className="h-4 w-5/6 bg-slate-800 rounded" />
                                <div className="h-4 w-4/6 bg-slate-800 rounded" />
                            </div>
                            <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center">
                                <TextT className="w-8 h-8 text-slate-700" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Forensic Dashboard */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Forensic AI Audit</h2>
                            <p className="text-sm text-slate-500">Deep analysis of LLM compatibility and failure modes</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-slate-900/50 border-slate-800 p-6 space-y-4">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Shield className="w-5 h-5" />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">AI Reasoning</h3>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {library.aiReasoning}
                                </p>
                            </Card>

                            <Card className="bg-slate-900/50 border-slate-800 p-6 space-y-4">
                                <div className="flex items-center gap-2 text-red-400">
                                    <Warning className="w-5 h-5" />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Failure Modes</h3>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {library.failureMode}
                                </p>
                            </Card>
                        </div>

                        <Card className="bg-emerald-950/20 border-emerald-500/20 p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <TerminalWindow className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-lg font-bold text-emerald-100">The Usage Rule</h3>
                            </div>
                            <p className="text-emerald-50/80 font-medium leading-relaxed italic border-l-2 border-emerald-500/50 pl-4">
                                "{library.usageRule}"
                            </p>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
                            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase mb-4">Audit Metadata</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-slate-600 uppercase mb-1">Assumption</p>
                                    <p className="text-xs text-slate-300">{library.auditAssumption}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-600 uppercase mb-1">Confidence</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full",
                                                    library.auditConfidence === 'High' ? "bg-emerald-500 w-full" :
                                                        library.auditConfidence === 'Medium' ? "bg-yellow-500 w-2/3" : "bg-red-500 w-1/3"
                                                )}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-400">{library.auditConfidence}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-600 uppercase mb-1">Last Verified</p>
                                    <p className="text-xs text-slate-300">
                                        {new Date(library.verifiedAsOf).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-blue-950/10 border border-blue-500/20">
                            <h3 className="text-sm font-bold text-blue-100 mb-2">Best For</h3>
                            <p className="text-xs text-blue-300/80 leading-relaxed mb-4">
                                {library.bestFor}
                            </p>
                            <h3 className="text-sm font-bold text-red-100 mb-2">Worst For</h3>
                            <p className="text-xs text-red-300/80 leading-relaxed">
                                {library.worstFor}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
