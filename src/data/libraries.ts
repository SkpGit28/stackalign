export type SpeedLevel = "lightweight" | "standard" | "heavy";
export type AnimationLevel = "none" | "basic" | "complex";

export interface Library {
    id: string;
    name: string;

    // The Core "AI" Metrics
    baseAIScore: number;       // 0-100
    hallucinationRisk: "Low" | "Medium" | "High";

    // The "Context Prompt"
    contextPrompt: string;     // The exact string to feed the AI

    // The Filters
    tags: {
        speed: SpeedLevel;
        animation: AnimationLevel;
        contexts: string[];
    };

    // Display Info
    bestFor: string;
    worstFor: string;
    killerReason: string;
}

export const libraries: Library[] = [
    // --- TIER S (Safe / Native) ---
    {
        id: "tailwind-css",
        name: "Tailwind CSS",
        baseAIScore: 99,
        hallucinationRisk: "Low",
        contextPrompt: "Styling: Tailwind CSS. Use utility classes. Do not use custom CSS or arbitrary values unless necessary.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "Marketing Site", "SaaS", "Mobile Web"]
        },
        bestFor: "Rapid styling with zero bundle size overhead (at runtime).",
        worstFor: "Developers who prefer semantic class names.",
        killerReason: "LLMs are trained on billions of lines of Tailwind. It is the native language of AI styling."
    },
    {
        id: "radix-ui",
        name: "Radix UI Primitives",
        baseAIScore: 96,
        hallucinationRisk: "Low",
        contextPrompt: "Components: Radix UI Primitives. Ensure accessibility props are correctly set.",
        tags: {
            speed: "standard",
            animation: "none",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Headless, accessible interactive components.",
        worstFor: "Quick prototypes needing pre-styled elements.",
        killerReason: "Rock-solid accessibility and API stability make it easy for AI to implement correctly."
    },
    {
        id: "lucide-react",
        name: "Lucide React",
        baseAIScore: 98,
        hallucinationRisk: "Low",
        contextPrompt: "Icons: Lucide React. Import icons individually to enable tree-shaking.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "Marketing Site", "SaaS", "Mobile Web"]
        },
        bestFor: "Consistent, clean iconography.",
        worstFor: "Projects needing multi-color or complex illustrations.",
        killerReason: "The de-facto standard for modern React icons, replacing Feather."
    },
    {
        id: "date-fns",
        name: "date-fns",
        baseAIScore: 97,
        hallucinationRisk: "Low",
        contextPrompt: "Dates: date-fns. Use functional imports.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Date manipulation without Moment.js bloat.",
        worstFor: "Timezone heavy applications (use date-fns-tz).",
        killerReason: "Functional, immutable, and modular."
    },
    {
        id: "clsx",
        name: "clsx",
        baseAIScore: 99,
        hallucinationRisk: "Low",
        contextPrompt: "Utils: clsx. Use for conditional class names.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "Marketing Site", "SaaS", "Mobile Web"]
        },
        bestFor: "Constructing className strings conditionally.",
        worstFor: "N/A",
        killerReason: "Tiny utility essential for modern React."
    },

    // --- TIER A (Reliable) ---
    {
        id: "shadcn-ui",
        name: "shadcn/ui",
        baseAIScore: 94,
        hallucinationRisk: "Low",
        contextPrompt: "UI Lib: shadcn/ui. Assume components are in @/components/ui. Do not install as a package.",
        tags: {
            speed: "standard",
            animation: "basic",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Beautiful, copy-pasteable component primitives.",
        worstFor: "Projects that need a completely different design system base.",
        killerReason: "The gold standard for modern Next.js apps. AI knows the structure well."
    },
    {
        id: "react-hook-form",
        name: "React Hook Form",
        baseAIScore: 92,
        hallucinationRisk: "Low",
        contextPrompt: "Forms: React Hook Form. Use 'register' and 'handleSubmit'.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Performant forms with easy validation.",
        worstFor: "Extremely simple login forms (overkill).",
        killerReason: "Standard for React forms, reducing re-renders."
    },
    {
        id: "zod",
        name: "Zod",
        baseAIScore: 93,
        hallucinationRisk: "Low",
        contextPrompt: "Validation: Zod. Define schemas before using them in forms or API routes.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Schema validation and TypeScript inference.",
        worstFor: "Runtime-free validation requirements.",
        killerReason: "TypeScript-first schema declaration."
    },
    {
        id: "mui",
        name: "Material UI (MUI)",
        baseAIScore: 88,
        hallucinationRisk: "Medium",
        contextPrompt: "UI Lib: MUI. Use the 'sx' prop for styling overrides. Prefer 'Stack' and 'Box' for layout.",
        tags: {
            speed: "heavy",
            animation: "basic",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Enterprise dashboards with dense data.",
        worstFor: "Public-facing marketing sites (heavy bundle).",
        killerReason: "Massive ecosystem, but easy to bloat."
    },
    {
        id: "mantine",
        name: "Mantine",
        baseAIScore: 89,
        hallucinationRisk: "Medium",
        contextPrompt: "UI Lib: Mantine. Use built-in hooks and components.",
        tags: {
            speed: "heavy",
            animation: "basic",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Feature-rich applications needing complex hooks.",
        worstFor: "Minimalist projects.",
        killerReason: "Excellent hooks library included."
    },
    {
        id: "zustand",
        name: "Zustand",
        baseAIScore: 91,
        hallucinationRisk: "Low",
        contextPrompt: "State: Zustand. Create a store with 'create'.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["Dashboard", "SaaS", "Mobile Web"]
        },
        bestFor: "Global state management without Redux boilerplate.",
        worstFor: "Complex state machines (use XState).",
        killerReason: "Simple, unopinionated state management."
    },

    // --- TIER B (Tricky) ---
    {
        id: "framer-motion",
        name: "Framer Motion",
        baseAIScore: 82,
        hallucinationRisk: "Medium",
        contextPrompt: "Animation: Framer Motion. Use <AnimatePresence> for exits and 'initial', 'animate', 'exit' props.",
        tags: {
            speed: "heavy",
            animation: "complex",
            contexts: ["Marketing Site", "Mobile Web", "Immersive"]
        },
        bestFor: "Complex, physics-based animations.",
        worstFor: "Bundle-size critical applications.",
        killerReason: "Powerful, but API surface is large and AI can mix versions."
    },
    {
        id: "tanstack-table",
        name: "TanStack Table (React Table)",
        baseAIScore: 78,
        hallucinationRisk: "Medium",
        contextPrompt: "Tables: TanStack Table v8. Use 'useReactTable', 'getCoreRowModel'. Note: v8 API is different from v7.",
        tags: {
            speed: "standard",
            animation: "none",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Headless, highly customizable tables.",
        worstFor: "Simple data grids.",
        killerReason: "v7 vs v8 breaking changes often confuse LLMs."
    },
    {
        id: "recharts",
        name: "Recharts",
        baseAIScore: 80,
        hallucinationRisk: "Medium",
        contextPrompt: "Charts: Recharts. Use 'ResponsiveContainer' for sizing.",
        tags: {
            speed: "heavy",
            animation: "basic",
            contexts: ["Dashboard"]
        },
        bestFor: "Composable React charts.",
        worstFor: "High-performance canvas rendering (thousands of points).",
        killerReason: "Easy to use, but sometimes buggy responsive behavior."
    },
    {
        id: "gsap",
        name: "GSAP",
        baseAIScore: 76,
        hallucinationRisk: "Medium",
        contextPrompt: "Animation: GSAP. Use 'gsap.to' and 'gsap.from'. Ensure cleanup in useEffect.",
        tags: {
            speed: "heavy",
            animation: "complex",
            contexts: ["Marketing Site", "Immersive"]
        },
        bestFor: "High-performance, complex timelines.",
        worstFor: "Simple UI transitions.",
        killerReason: "Industry standard for web animation, but imperative nature can be tricky in React."
    },
    {
        id: "three-js",
        name: "Three.js (React Three Fiber)",
        baseAIScore: 75,
        hallucinationRisk: "High",
        contextPrompt: "3D: React Three Fiber. Use 'Canvas' and declarative mesh components.",
        tags: {
            speed: "heavy",
            animation: "complex",
            contexts: ["Marketing Site", "Immersive"]
        },
        bestFor: "3D experiences in the browser.",
        worstFor: "Standard 2D interfaces.",
        killerReason: "Complex 3D math and React reconciliation can confuse AI."
    },

    // --- TIER C (Experimental/Niche) ---
    {
        id: "tremor",
        name: "Tremor",
        baseAIScore: 72,
        hallucinationRisk: "High",
        contextPrompt: "UI Lib: Tremor. Use for rapid dashboard building. Check docs for latest component names.",
        tags: {
            speed: "standard",
            animation: "basic",
            contexts: ["Dashboard"]
        },
        bestFor: "Building dashboards extremely fast.",
        worstFor: "Custom design requirements.",
        killerReason: "Newer library, frequent API changes lead to hallucinations."
    },
    {
        id: "million-js",
        name: "Million.js",
        baseAIScore: 65,
        hallucinationRisk: "High",
        contextPrompt: "Optimization: Million.js. Use the block compiler.",
        tags: {
            speed: "lightweight",
            animation: "none",
            contexts: ["SaaS", "Mobile Web"]
        },
        bestFor: "Virtual DOM optimization.",
        worstFor: "Projects that don't have performance bottlenecks.",
        killerReason: "Niche optimization tool, AI often hallucinates usage patterns."
    },
    {
        id: "chakra-ui",
        name: "Chakra UI",
        baseAIScore: 74,
        hallucinationRisk: "Medium",
        contextPrompt: "UI Lib: Chakra UI. Use style props.",
        tags: {
            speed: "heavy",
            animation: "basic",
            contexts: ["Dashboard", "SaaS"]
        },
        bestFor: "Accessible, modular components.",
        worstFor: "Server Components (RSC) heavy apps (historically).",
        killerReason: "Transition to RSC support and styling engine changes can cause issues."
    },
    {
        id: "styled-components",
        name: "Styled Components",
        baseAIScore: 70,
        hallucinationRisk: "Medium",
        contextPrompt: "Styling: Styled Components. Create styled elements outside render.",
        tags: {
            speed: "heavy",
            animation: "none",
            contexts: ["SaaS"]
        },
        bestFor: "CSS-in-JS lovers.",
        worstFor: "Next.js App Router (setup complexity).",
        killerReason: "Configuration in App Router is tricky for AI to get right first try."
    }
];
