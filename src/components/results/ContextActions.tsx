"use client";

import { Library } from "@/types";
import { Copy, DownloadSimple, TerminalWindow, Info } from "@phosphor-icons/react";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContextActionsProps {
    libraries: Library[];
}

export default function ContextActions({ libraries }: ContextActionsProps) {
    const [copied, setCopied] = useState(false);

    const generateMasterPrompt = () => {
        const header = "SYSTEM CONTEXT:\n\n";
        const body = libraries
            .map((lib, index) => `${index + 1}. ${lib.name}: ${lib.contextPrompt}`)
            .join("\n");
        return header + body;
    };

    const handleCopy = async () => {
        const prompt = generateMasterPrompt();
        await navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const prompt = generateMasterPrompt();
        const blob = new Blob([prompt], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ".codingagentrules";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-4 mb-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                    <TerminalWindow className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-200">System Context Ready</h3>
                    <p className="text-xs text-slate-500">
                        {libraries.length} optimized libraries selected
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                {/* How it Works - Ghost Button with Tooltip */}
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-transparent hover:bg-slate-800/30 text-slate-400 hover:text-slate-200 text-sm font-medium rounded-lg transition-all border border-slate-700/30">
                                <Info className="w-4 h-4" />
                                How it Works?
                            </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-slate-800 text-slate-100 p-3">
                            <p className="text-xs">
                                <strong>Workflow Tip:</strong> Starting a new project? Use <strong>Download .codingagentrules</strong> for the full setup. Adding to an existing project? Copy individual library context below.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Copy Context Button */}
                <button
                    onClick={handleCopy}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-all border border-slate-700 hover:border-slate-600"
                >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Context"}
                </button>

                {/* Download .codingagentrules - Main CTA */}
                <button
                    onClick={handleDownload}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-emerald-900/20"
                >
                    <DownloadSimple className="w-4 h-4" />
                    Download .codingagentrules
                </button>
            </div>
        </div>
    );
}
