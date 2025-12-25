"use client";

import { Library } from "@/types";
import { cn } from "@/lib/utils";
import { Copy, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
    library: Library;
    tier: string;
    variant?: 'hero' | 'standard' | 'compact';
}

export default function ResultCard({ library, tier, variant = 'standard' }: ResultCardProps) {
    const [copied, setCopied] = useState(false);

    const getTierColor = (tier: string) => {
        switch (tier) {
            case "S":
                return "border-emerald-500/20 bg-slate-900/50";
            case "A":
                return "border-slate-800 bg-slate-950/50";
            case "B":
                return "border-yellow-500/20 bg-amber-950/5";
            default:
                return "border-red-500/20 bg-red-950/5";
        }
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case "S":
                return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
            case "A":
                return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
            case "B":
                return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            default:
                return <XCircle className="w-5 h-5 text-red-400" />;
        }
    };

    const handleCopyContext = async () => {
        await navigator.clipboard.writeText(library.contextPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isCompact = variant === 'compact';

    return (
        <Card className={cn(
            "relative transition-all hover:bg-slate-900/80 flex flex-col",
            isCompact ? "p-4" : "p-6",
            getTierColor(tier)
        )}>
            <div className={cn("flex justify-between items-start gap-3", isCompact ? "mb-2" : "mb-4")}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {getTierIcon(tier)}
                    <div className="min-w-0">
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <h3 className="font-bold text-slate-100 text-lg truncate">
                                        {library.name}
                                    </h3>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{library.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <Badge variant="outline" className={cn(
                    "font-mono whitespace-nowrap flex-shrink-0",
                    tier === 'S' ? "border-emerald-500/30 text-emerald-400" :
                        tier === 'A' ? "border-blue-500/30 text-blue-400" :
                            tier === 'B' ? "border-yellow-500/30 text-yellow-400" : "border-red-500/30 text-red-400"
                )}>
                    {library.baseAIScore}% Safe
                </Badge>
            </div>

            <p className={cn("text-slate-400 leading-relaxed flex-grow", isCompact ? "text-xs mb-3" : "text-sm mb-4")}>
                {library.bestFor}
            </p>

            <div className="mt-auto space-y-2">
                <button
                    onClick={handleCopyContext}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors border border-slate-700/50"
                >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Context"}
                </button>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-transparent hover:bg-slate-800/30 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors border border-slate-700/30">
                            <Shield className="w-4 h-4" />
                            View AI Audit
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-950 border-slate-800 text-slate-100 max-w-2xl h-[80vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-4 border-b border-slate-800 bg-slate-900/50">
                            <DialogTitle className="flex items-center gap-2 text-xl">
                                🤖 AI Compatibility Audit: {library.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Safety Label */}
                            <div>
                                <div className="text-2xl font-bold mb-1">{library.safetyLabel}</div>
                                <Badge
                                    variant={library.auditConfidence === "High" ? "default" : library.auditConfidence === "Medium" ? "secondary" : "destructive"}
                                    className="text-xs font-mono"
                                >
                                    {library.auditConfidence} Confidence
                                </Badge>
                            </div>

                            {/* AI Reasoning */}
                            <div>
                                <h4 className="text-xs font-mono font-bold opacity-60 uppercase mb-2">Why This Rating?</h4>
                                <p className="text-sm leading-relaxed">{library.aiReasoning}</p>
                            </div>

                            {/* Failure Mode */}
                            <div>
                                <h4 className="text-xs font-mono font-bold opacity-60 uppercase mb-2">Common AI Failure Modes</h4>
                                <p className="text-sm leading-relaxed">{library.failureMode}</p>
                            </div>

                            {/* Usage Rule */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded p-4">
                                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-2">Usage Rule</h4>
                                <p className="text-sm leading-relaxed font-medium">{library.usageRule}</p>
                            </div>

                            {/* Metadata */}
                            <div className="text-xs opacity-60 space-y-2 pt-4 border-t border-slate-800">
                                <div>
                                    <span className="font-mono font-bold">Audit Assumption:</span> {library.auditAssumption}
                                </div>
                                <div>
                                    <span className="font-mono font-bold">Verified:</span> {new Date(library.verifiedAsOf).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-4 border-t border-slate-800 bg-slate-900/50 flex-row justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="ghost" size="sm">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                size="sm"
                                onClick={() => window.open(`https://github.com/SkpGit28/stackalign/issues/new?title=Hallucination+Report:+${encodeURIComponent(library.name)}&labels=hallucination`, '_blank')}
                                className="gap-2"
                            >
                                <Github className="w-4 h-4" />
                                Report Hallucination
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
}
