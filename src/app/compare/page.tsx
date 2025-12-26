"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { libraries, Library } from "@/data/libraries"
import { LiveComponentCard } from "@/components/compare/LiveComponentCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    ShieldWarning,
    ShieldSlash,
    ArrowLeft,
    Copy,
    CheckCircle,
    XCircle
} from "@phosphor-icons/react"
import { useState } from "react"

export default function ComparePage() {
    const searchParams = useSearchParams()
    const libIds = searchParams.get("libs")?.split(",") || []
    const componentType = searchParams.get("q") || "button"

    const [copiedId, setCopiedId] = useState<string | null>(null)

    const selectedLibraries = libraries.filter(lib => libIds.includes(lib.id))

    const handleCopyContext = (library: Library) => {
        navigator.clipboard.writeText(library.contextPrompt)
        setCopiedId(library.id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const getSafetyIcon = (status: string) => {
        switch (status) {
            case "Safe":
                return <ShieldCheck className="w-6 h-6 text-emerald-400" />
            case "Caution":
                return <ShieldWarning className="w-6 h-6 text-yellow-400" />
            case "Risk":
                return <ShieldSlash className="w-6 h-6 text-red-400" />
            default:
                return <ShieldCheck className="w-6 h-6 text-slate-400" />
        }
    }

    if (selectedLibraries.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No libraries selected</h1>
                    <Link href="/result">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Results
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 w-full bg-zinc-950/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/result">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Results
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-lg font-bold">Component Comparison Arena</h1>
                            <p className="text-xs text-slate-500">Comparing {selectedLibraries.length} libraries</p>
                        </div>
                        {/* Component Selector */}
                        <select
                            value={componentType}
                            onChange={(e) => {
                                const newType = e.target.value
                                const newUrl = `/compare?libs=${libIds.join(",")}&q=${newType}`
                                window.location.href = newUrl
                            }}
                            className="h-9 rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            <option value="button">Button</option>
                            <option value="input">Input</option>
                            <option value="card">Card</option>
                        </select>
                    </div>
                    <div className="w-24" /> {/* Spacer for centering */}
                </div>
            </div>

            {/* Comparison Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedLibraries.map((library) => {
                        const snippet = library.componentSnippets?.[componentType] || library.componentSnippets?.["button"]

                        if (!snippet) {
                            return (
                                <div key={library.id} className="p-6 rounded-lg border border-slate-800 bg-slate-900/30">
                                    <div className="text-center text-slate-500">
                                        <p className="text-sm">No {componentType} snippet available for {library.name}</p>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={library.id} className="flex flex-col gap-4 p-6 rounded-lg border border-slate-800 bg-slate-900/30">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-100">{library.name}</h2>
                                        <p className="text-xs text-slate-400 mt-1">{library.safetyLabel}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getSafetyIcon(library.modelCompatibility?.gpt || "Safe")}
                                        <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                                            Tier {library.tier}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Live Component Arena */}
                                <LiveComponentCard
                                    code={snippet}
                                    dependencies={library.sandpackConfig?.dependencies}
                                    externalResources={library.sandpackConfig?.externalResources}
                                    height="250px"
                                />

                                {/* Forensic Stats */}
                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-md p-3 border border-slate-800">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-400 mb-1">Best For</p>
                                                <p className="text-xs text-slate-200">{library.bestFor}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-md p-3 border border-slate-800">
                                        <div className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-400 mb-1">Worst For</p>
                                                <p className="text-xs text-slate-200">{library.worstFor}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-950/30 rounded-md p-3 border border-emerald-900/30">
                                        <p className="text-xs text-emerald-400 mb-1">AI Score</p>
                                        <p className="text-lg font-bold text-emerald-300">{library.baseAIScore}%</p>
                                    </div>
                                </div>

                                {/* Copy Context Button */}
                                <Button
                                    onClick={() => handleCopyContext(library)}
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                                >
                                    {copiedId === library.id ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy Context
                                        </>
                                    )}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
