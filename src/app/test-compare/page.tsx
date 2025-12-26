export default function TestComparePage() {
    const components = [
        { name: "Tailwind Button", path: "/render/tailwind/button", library: "Tailwind", color: "blue" },
        { name: "Shadcn Button", path: "/render/shadcn/button", library: "Shadcn", color: "zinc" },
        { name: "Mantine Badge", path: "/render/mantine/badge", library: "Mantine", color: "blue" },
        { name: "Chakra Switch", path: "/render/chakra/switch", library: "Chakra", color: "teal" },
        { name: "NextUI User", path: "/render/nextui/user", library: "NextUI", color: "pink" },
        { name: "DaisyUI Alert", path: "/render/daisyui/alert", library: "DaisyUI", color: "blue" },
        { name: "Flowbite Tabs", path: "/render/flowbite/tabs", library: "Flowbite", color: "blue" },
        { name: "Radix Tooltip", path: "/render/radix/tooltip", library: "Radix", color: "slate" },
        { name: "Ant Design Button", path: "/render/antd/button", library: "AntD", color: "slate" },
        { name: "MUI Slider", path: "/render/mui/slider", library: "MUI", color: "blue" },
        { name: "Tailwind Toggle", path: "/render/tailwind/toggle", library: "Tailwind", color: "slate" },
        { name: "Shadcn Card", path: "/render/shadcn/card", library: "Shadcn", color: "zinc" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10 md:p-20">
            <h1 className="text-3xl font-bold mb-4 text-center">Remote Engine Stress Test</h1>
            <p className="text-slate-400 text-center mb-12">
                Verifying 12 isolated rendering engines running concurrently.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {components.map((comp) => (
                    <div key={comp.path} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30 hover:border-slate-700 transition-colors group">
                        <div className="bg-slate-900 p-3 border-b border-slate-800 flex justify-between items-center">
                            <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">{comp.path}</span>
                            <span className={cn(
                                "text-[10px] uppercase px-2 py-0.5 rounded font-bold tracking-wider",
                                comp.color === "blue" && "bg-blue-500/10 text-blue-400",
                                comp.color === "zinc" && "bg-zinc-500/10 text-zinc-400",
                                comp.color === "teal" && "bg-teal-500/10 text-teal-400",
                                comp.color === "pink" && "bg-pink-500/10 text-pink-400",
                                comp.color === "slate" && "bg-slate-500/10 text-slate-400",
                            )}>
                                {comp.library}
                            </span>
                        </div>
                        <div className="h-[200px] bg-white/[0.02] relative flex items-center justify-center">
                            <iframe
                                src={comp.path}
                                className="w-full h-full border-none pointer-events-auto"
                                title={comp.name}
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
