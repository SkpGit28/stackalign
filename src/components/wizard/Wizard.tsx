"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Layout,
    Megaphone,
    Buildings,
    DeviceMobile,
    Lightning,
    Scales,
    Cube,
    Prohibit,
    Play,
    FilmStrip,
    Keyboard,
    Robot,
    ShieldWarning
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { UserConstraints, SpeedLevel, AnimationLevel } from "@/types";

import { useWizard } from "@/context/WizardContext";

const STEPS = [
    {
        id: "context",
        title: "What are you building?",
        options: [
            { value: "dashboard", label: "Dashboard", icon: Layout },
            { value: "marketing", label: "Marketing Site", icon: Megaphone },
            { value: "saas", label: "SaaS Platform", icon: Buildings },
            { value: "mobile", label: "Mobile Web App", icon: DeviceMobile },
        ],
    },
    {
        id: "speed",
        title: "How critical is initial load speed?",
        options: [
            { value: "lightweight", label: "Lightweight (Speed First)", icon: Lightning },
            { value: "standard", label: "Standard (Balanced)", icon: Scales },
            { value: "heavy", label: "Heavy (Feature Rich)", icon: Cube },
        ],
    },
    {
        id: "animation",
        title: "How much animation do you need?",
        options: [
            { value: "none", label: "None (Static)", icon: Prohibit },
            { value: "basic", label: "Basic (Micro-interactions)", icon: Play },
            { value: "complex", label: "Immersive (Scrollytelling)", icon: FilmStrip },
        ],
    },
    {
        id: "aiReliance",
        title: "How will you write the code?",
        options: [
            { value: "manual", label: "I code manually", icon: Keyboard },
            { value: "ai", label: "I use AI 100% (Cursor/ChatGPT)", icon: Robot },
        ],
    },
];

export default function Wizard() {
    const router = useRouter();
    const { selections, setSelections, setCompleted } = useWizard();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelect = async (value: string) => {
        if (isSubmitting) return;

        const stepId = STEPS[currentStep].id;
        const newSelections = { ...selections, [stepId]: value };
        setSelections(newSelections);

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step
            setIsSubmitting(true);
            setCompleted(true);

            // Artificial delay to let the user see the "Strict Mode" badge and selection state
            await new Promise(resolve => setTimeout(resolve, 1500));

            const queryParams = new URLSearchParams(newSelections as Record<string, string>);
            router.push(`/result?${queryParams.toString()}`);
        }
    };

    const stepData = STEPS[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="mb-8 text-center relative">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Step {currentStep + 1} of {STEPS.length}
                </span>
                <h2 className="mt-2 text-3xl font-bold text-slate-100">
                    {stepData.title}
                </h2>

                {/* Strict Mode Badge */}
                {stepData.id === 'aiReliance' && selections.aiReliance === 'ai' && (
                    <div
                        className="absolute -top-8 right-0 md:-right-12 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        title="We filter out beta/new libraries to ensure Shadcn compatibility."
                    >
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-900/20 cursor-help">
                            <ShieldWarning className="w-3 h-3" />
                            🔒 Strict Mode Active
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stepData.options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selections[stepData.id as keyof UserConstraints] === option.value;

                    return (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            disabled={isSubmitting}
                            className={cn(
                                "flex flex-col items-center justify-center p-8 rounded-xl border-2 transition-all duration-200 relative overflow-hidden",
                                isSelected
                                    ? "bg-slate-800 border-slate-400 ring-2 ring-slate-400/20"
                                    : "bg-slate-900/50 hover:bg-slate-800/80 border-slate-800 hover:border-slate-600",
                                "group focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950",
                                isSubmitting && !isSelected && "opacity-50 cursor-not-allowed",
                                isSubmitting && isSelected && "cursor-wait"
                            )}
                        >
                            {option.value === 'ai' && (
                                <div className="absolute top-3 right-3">
                                    <span className="flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                </div>
                            )}

                            <Icon className={cn(
                                "w-12 h-12 mb-4 transition-colors",
                                isSelected ? "text-slate-100" : "text-slate-400 group-hover:text-slate-100"
                            )} />
                            <span className={cn(
                                "text-lg font-medium transition-colors",
                                isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                            )}>
                                {option.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {currentStep > 0 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            )}
        </div>
    );
}
