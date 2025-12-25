"use client";

import { Library } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface ForensicAuditCardProps {
    library: Library;
}

export default function ForensicAuditCard({ library }: ForensicAuditCardProps) {
    // Determine tier colors and icons
    const getTierStyle = (tier: string) => {
        switch (tier) {
            case "S":
                return {
                    bgCard: "bg-emerald-950/30 border-emerald-500/20",
                    bgHeader: "bg-emerald-950/50",
                    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                    textColor: "text-emerald-100"
                };
            case "A":
                return {
                    bgCard: "bg-blue-950/30 border-blue-500/20",
                    bgHeader: "bg-blue-950/50",
                    icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
                    textColor: "text-blue-100"
                };
            case "B":
                return {
                    bgCard: "bg-yellow-950/30 border-yellow-500/20",
                    bgHeader: "bg-yellow-950/50",
                    icon: <ShieldAlert className="w-5 h-5 text-yellow-400" />,
                    textColor: "text-yellow-100"
                };
            case "C":
                return {
                    bgCard: "bg-red-950/30 border-red-500/20",
                    bgHeader: "bg-red-950/50",
                    icon: <ShieldX className="w-5 h-5 text-red-400" />,
                    textColor: "text-red-100"
                };
            default:
                return {
                    bgCard: "bg-slate-900/30 border-slate-700/20",
                    bgHeader: "bg-slate-900/50",
                    icon: <AlertTriangle className="w-5 h-5 text-slate-400" />,
                    textColor: "text-slate-100"
                };
        }
    };

    const style = getTierStyle(library.tier);

    return (
        <Card className={`${style.bgCard} border ${style.textColor}`}>
            <CardHeader className={`${style.bgHeader} pb-3`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {style.icon}
                        <h3 className="text-sm font-mono font-bold">🤖 AI Compatibility Audit</h3>
                    </div>
                    <Badge
                        variant={library.auditConfidence === "High" ? "default" : library.auditConfidence === "Medium" ? "secondary" : "destructive"}
                        className="text-xs font-mono"
                    >
                        {library.auditConfidence} Confidence
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
                {/* Safety Label */}
                <div>
                    <div className="text-xl font-bold mb-1">{library.safetyLabel}</div>
                </div>

                {/* AI Reasoning */}
                <div>
                    <h4 className="text-xs font-mono font-bold opacity-60 uppercase mb-1">Why This Rating?</h4>
                    <p className="text-sm leading-relaxed">{library.aiReasoning}</p>
                </div>

                {/* Failure Mode */}
                <div>
                    <h4 className="text-xs font-mono font-bold opacity-60 uppercase mb-1">Common AI Failure Modes</h4>
                    <p className="text-sm leading-relaxed">{library.failureMode}</p>
                </div>

                {/* Usage Rule */}
                <div className="bg-slate-950/50 border border-slate-800 rounded p-3">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-2">Usage Rule</h4>
                    <p className="text-sm leading-relaxed font-medium">{library.usageRule}</p>
                </div>
            </CardContent>

            <CardFooter className="flex-col items-start gap-3 text-xs opacity-60">
                <div>
                    <span className="font-mono font-bold">Audit Assumption:</span> {library.auditAssumption}
                </div>
                <div>
                    <span className="font-mono font-bold">Verified:</span> {new Date(library.verifiedAsOf).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <a
                    href={`https://github.com/SkpGit28/stackalign/issues/new?title=Hallucination+Report:+${encodeURIComponent(library.name)}&labels=hallucination`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-60 hover:opacity-100 hover:underline transition-opacity"
                >
                    Did AI hallucinate this stack? Report to GitHub →
                </a>
            </CardFooter>
        </Card>
    );
}
