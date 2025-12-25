import { Library } from "@/types";
import { cn } from "@/lib/utils";
import { Copy, ShieldCheck, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultCardProps {
    library: Library;
    tier: string;
    variant?: 'hero' | 'standard' | 'compact';
}

export default function ResultCard({ library, tier, variant = 'standard' }: ResultCardProps) {
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

    const isCompact = variant === 'compact';

    return (
        <Card className={cn(
            "relative transition-all hover:bg-slate-900/80",
            isCompact ? "p-4" : "p-6",
            getTierColor(tier)
        )}>
            <div className={cn("flex justify-between items-start", isCompact ? "mb-2" : "mb-4")}>
                <div className="flex items-center gap-3">
                    {getTierIcon(tier)}
                    <div>
                        <h3 className="font-bold text-slate-100 text-lg">
                            {library.name}
                        </h3>
                    </div>
                </div>
                <Badge variant="outline" className={cn(
                    "font-mono",
                    tier === 'S' ? "border-emerald-500/30 text-emerald-400" :
                        tier === 'A' ? "border-blue-500/30 text-blue-400" :
                            tier === 'B' ? "border-yellow-500/30 text-yellow-400" : "border-red-500/30 text-red-400"
                )}>
                    {library.baseAIScore}% Safe
                </Badge>
            </div>

            <p className={cn("text-slate-400 leading-relaxed", isCompact ? "text-xs mb-3" : "text-sm mb-4")}>
                {library.bestFor}
            </p>

            {!isCompact && (
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium transition-colors border border-slate-700/50">
                        <Copy className="w-4 h-4" />
                        Copy Context
                    </button>
                </div>
            )}
        </Card>
    );
}
