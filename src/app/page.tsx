import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <div className="max-w-3xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Stop Fighting <br />
                        <span className="text-emerald-400">
                            AI Hallucinations.
                        </span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg text-slate-400 md:text-xl">
                        Pick the Tech Stack that ChatGPT actually knows how to write.
                    </p>
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/wizard"
                        className="group inline-flex h-12 items-center justify-center rounded-md bg-slate-100 px-8 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                    >
                        Find My Safe Stack
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm text-slate-500 border-t border-slate-800 pt-8">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="rounded-full bg-slate-900 p-2 ring-1 ring-slate-800">
                            <span className="text-xl">🛡️</span>
                        </div>
                        <p>Hallucination-Proof</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="rounded-full bg-slate-900 p-2 ring-1 ring-slate-800">
                            <span className="text-xl">⚡</span>
                        </div>
                        <p>Production Ready</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="rounded-full bg-slate-900 p-2 ring-1 ring-slate-800">
                            <span className="text-xl">🤖</span>
                        </div>
                        <p>AI-Native Context</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
