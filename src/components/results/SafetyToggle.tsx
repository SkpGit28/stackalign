"use client";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock } from "lucide-react";

interface SafetyToggleProps {
    isLocked: boolean;
    isActive: boolean;
}

export default function SafetyToggle({ isLocked, isActive }: SafetyToggleProps) {
    return (
        <TooltipProvider>
            <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
                <span className="text-sm font-mono text-slate-400">Strict Mode</span>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={isActive}
                                disabled={isLocked}
                                className="data-[state=checked]:bg-emerald-500"
                            />
                            {isLocked && (
                                <Lock className="w-4 h-4 text-slate-500" />
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 border-slate-800 text-slate-200">
                        <p className="max-w-xs">
                            {isLocked
                                ? "Locked for AI Safety. We filter out beta libraries to ensure 100% hallucination-free code."
                                : "Enable to filter out experimental libraries."}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}
