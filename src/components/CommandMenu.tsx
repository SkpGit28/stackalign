"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { libraries, Library } from "@/data/libraries"
import {
    ArrowRight,
    Sparkle,
    Layout,
    Textbox,
    Palette,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const router = useRouter()

    // Keyboard shortcuts
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        const handleOpen = () => setOpen(true)

        document.addEventListener("keydown", down)
        window.addEventListener("open-command-menu", handleOpen)
        return () => {
            document.removeEventListener("keydown", down)
            window.removeEventListener("open-command-menu", handleOpen)
        }
    }, [])

    const suggestions = [
        { icon: <Palette className="w-4 h-4 text-sky-400" />, label: "Button in Tailwind", id: "tailwind-css", keywords: ["button", "tailwind", "css"] },
        { icon: <Layout className="w-4 h-4 text-slate-400" />, label: "Input from Shadcn", id: "shadcn-ui", keywords: ["input", "form", "shadcn", "ui"] },
        { icon: <Sparkle className="w-4 h-4 text-blue-400" />, label: "MUI Components", id: "mui", keywords: ["mui", "material", "components"] },
        { icon: <Textbox className="w-4 h-4 text-teal-400" />, label: "Chakra UI Forms", id: "chakra-ui", keywords: ["chakra", "forms", "input"] },
        { icon: <Layout className="w-4 h-4 text-indigo-400" />, label: "Mantine Layouts", id: "mantine", keywords: ["mantine", "layout", "components"] },
    ]

    // Robust Search Logic
    const { filteredSuggestions, filteredLibraries } = React.useMemo(() => {
        const searchQuery = query.toLowerCase().trim()

        if (!searchQuery) {
            return { filteredSuggestions: suggestions, filteredLibraries: [] }
        }

        const matchedSuggestions = suggestions.filter(sug =>
            sug.label.toLowerCase().includes(searchQuery) ||
            sug.keywords.some(kw => kw.toLowerCase().includes(searchQuery))
        )

        const matchedLibraries = libraries.filter(lib =>
            lib.name.toLowerCase().includes(searchQuery) ||
            lib.keywords?.some(kw => kw.toLowerCase().includes(searchQuery)) ||
            lib.tags.contexts.some(ctx => ctx.toLowerCase().includes(searchQuery))
        ).slice(0, 10)

        return { filteredSuggestions: matchedSuggestions, filteredLibraries: matchedLibraries }
    }, [query])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl w-full p-0 overflow-hidden bg-slate-900 border-slate-800 shadow-2xl top-[120px] translate-y-0 pointer-events-auto">
                <Command className="w-full bg-transparent pointer-events-auto" shouldFilter={false}>
                    <CommandInput
                        placeholder="Search components or libraries..."
                        value={query}
                        onValueChange={setQuery}
                        className="h-14 text-base border-none focus:ring-0 bg-transparent text-slate-200 placeholder:text-slate-600"
                    />

                    <CommandList className="max-h-[450px] overflow-y-auto custom-scrollbar pointer-events-auto">
                        <CommandEmpty className="py-12 text-center text-slate-500 text-sm">
                            No results found for "{query}"
                        </CommandEmpty>

                        {filteredSuggestions.length > 0 && (
                            <CommandGroup heading={query ? "Top Matches" : "Suggestions"} className="p-2">
                                {filteredSuggestions.map((sug) => (
                                    <CommandItem
                                        key={sug.label}
                                        value={sug.label}
                                        onSelect={() => {
                                            setOpen(false)
                                            router.push(`/library/${sug.id}`)
                                        }}
                                        className="flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer aria-selected:bg-slate-800 hover:bg-slate-800/50 group transition-colors pointer-events-auto"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-slate-800 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                                {sug.icon}
                                            </div>
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                                {sug.label}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}

                        {filteredLibraries.length > 0 && (
                            <>
                                <CommandSeparator className="bg-slate-800 mx-2" />
                                <CommandGroup heading="Libraries" className="p-2">
                                    {filteredLibraries.map((lib) => (
                                        <CommandItem
                                            key={lib.id}
                                            value={lib.name}
                                            onSelect={() => {
                                                setOpen(false)
                                                router.push(`/library/${lib.id}`)
                                            }}
                                            className="flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer aria-selected:bg-slate-800 hover:bg-slate-800/50 group transition-colors pointer-events-auto"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-slate-800 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                                    <Layout className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                                        {lib.name}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                                                        Tier {lib.tier} • {lib.tags.contexts[0]}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>

                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-500 font-mono">
                                    ↑↓
                                </kbd>
                                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-tight">Navigate</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] text-slate-500 font-mono">
                                    ↵
                                </kbd>
                                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-tight">Select</span>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-700 font-medium">StackAlign Command</span>
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    )
}
