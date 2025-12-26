"use client"

import { Sandpack } from "@codesandbox/sandpack-react"
import { useState } from "react"
import { Code } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface LiveComponentCardProps {
    code: string
    dependencies?: Record<string, string>
    externalResources?: string[]
    height?: string
}

export function LiveComponentCard({
    code,
    dependencies = {},
    externalResources = [],
    height = "250px"
}: LiveComponentCardProps) {
    const [showCode, setShowCode] = useState(false)

    return (
        <div className="relative rounded-lg overflow-hidden border border-slate-800">
            {/* Show Code Toggle */}
            <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs"
                onClick={() => setShowCode(!showCode)}
            >
                <Code className="w-3 h-3 mr-1" />
                {showCode ? "Hide" : "Show"} Code
            </Button>

            {/* Sandpack Integration */}
            <div style={{ height }}>
                <Sandpack
                    template="react"
                    theme="dark"
                    files={{
                        "/App.js": code
                    }}
                    customSetup={{
                        dependencies: {
                            "react": "latest",
                            "react-dom": "latest",
                            ...dependencies
                        }
                    }}
                    options={{
                        showNavigator: false,
                        showTabs: false,
                        showLineNumbers: false,
                        showInlineErrors: true,
                        editorHeight: showCode ? "50%" : "0%",
                        editorWidthPercentage: 0,
                        externalResources: externalResources,
                        layout: showCode ? "preview" : "preview",
                    }}
                />
            </div>
        </div>
    )
}
