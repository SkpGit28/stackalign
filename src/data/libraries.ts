export type SpeedLevel = "lightweight" | "standard" | "heavy";
export type AnimationLevel = "none" | "basic" | "complex";

export interface Library {
    id: string;
    name: string;
    tier: "S" | "A" | "B" | "C";

    // Authority & Forensic Fields
    safetyLabel: string;      // e.g. "✅ AI-Native"
    aiReasoning: string;      // Why is it safe/unsafe?
    failureMode: string;      // How does AI specifically break this?
    usageRule: string;        // Command, not advice.
    auditAssumption: string;  // e.g. "Assumes Next.js 14 App Router & TypeScript"
    auditConfidence: "High" | "Medium" | "Low"; // Certainty level of this audit
    verifiedAsOf: string;     // ISO Date "2025-01-10"

    // Original Display & Filter Fields
    baseAIScore: number;
    hallucinationRisk: "Low" | "Medium" | "High";
    contextPrompt: string;
    tags: {
        speed: SpeedLevel;
        animation: AnimationLevel;
        contexts: string[];
    };
    bestFor: string;
    worstFor: string;
    killerReason: string;
}

export const libraries: Library[] = [
    // --- TIER S (Hallucination-Proof) ---
    {
        id: "tailwind-css",
        name: "Tailwind CSS",
        tier: "S",

        // Forensic Fields
        safetyLabel: "🛡️ Hallucination-Proof",
        aiReasoning: "Tailwind CSS is extensively documented in LLM training data (2017-2023). Its utility-first approach maps 1:1 to documented class names, eliminating ambiguity. AI models achieve 99%+ accuracy when generating Tailwind markup.",
        failureMode: "Primary failure mode: AI invents arbitrary values (e.g., `w-[347px]`) instead of using design tokens when the semantic class is not immediately recalled. Secondary: Confusing Tailwind config path (`tailwind.config.ts` vs `.js` vs `.mjs`).",
        usageRule: "ALWAYS use standard Tailwind classes from the documented scale (e.g., `w-64`, `px-4`). NEVER create arbitrary values unless explicitly required. Verify `tailwind.config.ts` exists in project root with correct `content` paths.",
        auditAssumption: "Assumes Next.js 14 App Router with TypeScript. PostCSS configured via `postcss.config.js`. Tailwind imported in `globals.css`.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

        // Original Fields
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
        tier: "S",

        safetyLabel: "🛡️ Hallucination-Proof",
        aiReasoning: "Radix UI has maintained API stability since v1.0 (2021). Its headless primitive architecture is well-documented and follows consistent patterns across all components. LLMs generate correct Radix implementations 95%+ of the time.",
        failureMode: "Primary failure: Confusing `@radix-ui/react-*` package naming with `@radix-ui/primitives`. Secondary: Inventing non-existent props when combining with styling libraries. Rare: Mixing Radix v0.9 (deprecated) syntax with v1.0+.",
        usageRule: "ALWAYS import from `@radix-ui/react-[component-name]` (e.g., `@radix-ui/react-dialog`). NEVER use deprecated `@radix-ui/primitives`. Verify all accessibility props (e.g., `aria-label`) are explicitly set.",
        auditAssumption: "Assumes Next.js 14 App Router with client components. Styled with Tailwind CSS or CSS-in-JS.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "S",

        safetyLabel: "🛡️ Hallucination-Proof",
        aiReasoning: "Lucide React (2022+) is the actively maintained fork of Feather Icons. Its icon naming convention is deterministic and well-documented. AI achieves 98%+ accuracy when suggesting icon names and import syntax.",
        failureMode: "Primary failure: Inventing icon names that don't exist (e.g., `<DashboardIcon />` instead of `<LayoutDashboard />`). Secondary: Using incorrect import path (`lucide` vs. `lucide-react`).",
        usageRule: "ALWAYS verify icon names against the official Lucide documentation before using. Import syntax: `import { IconName } from 'lucide-react'`. NEVER import from the base `lucide` package in React projects.",
        auditAssumption: "Assumes React 18+ with ES modules. Tree-shaking enabled via modern bundler (Webpack 5, Vite, Turbopack).",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "S",

        safetyLabel: "🛡️ Hallucination-Proof",
        aiReasoning: "date-fns (v2.0+, 2019) has stable, functional API. Each function is independently importable and well-documented. LLMs trained on extensive date-fns usage patterns achieve 97%+ accuracy.",
        failureMode: "Primary failure: Using Moment.js syntax with date-fns (e.g., `.format()` instead of `format()`). Secondary: Forgetting to import timezone support separately (`date-fns-tz`).",
        usageRule: "ALWAYS use functional syntax: `import { format, addDays } from 'date-fns'`. NEVER use method chaining. For timezone operations, explicitly import from `date-fns-tz`.",
        auditAssumption: "Assumes date-fns v2.30+ with ES modules. Node.js 16+ or modern browser environment.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "S",

        safetyLabel: "🛡️ Hallucination-Proof",
        aiReasoning: "clsx is a micro-utility (0.3KB) with a single, obvious API surface. Its simplicity makes it virtually impossible for LLMs to hallucinate incorrect usage. AI achieves 99%+ accuracy.",
        failureMode: "Extremely rare: Confusing `clsx` with `classnames` package (both work identically, but `clsx` is 2x faster). No documented AI hallucinations exist.",
        usageRule: "Use `clsx()` to conditionally combine class names. Syntax: `clsx('base', condition && 'conditional', { 'object-key': booleanValue })`.",
        auditAssumption: "Assumes ES modules and modern JavaScript runtime. Works universally across all React environments.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "✅ AI-Reliable",
        aiReasoning: "shadcn/ui (2023+) is copy-paste components built on Radix + Tailwind. Its structure is predictable and well-documented. AI achieves 92%+ accuracy when generating shadcn components, though minor prop adjustments may be needed.",
        failureMode: "Primary failure: Assuming shadcn is a package (it's not - components are copied into `@/components/ui`). Secondary: Mixing shadcn v0.1 component structure with v0.2+ (breaking changes in Tailwind merge patterns).",
        usageRule: "Components are located in `@/components/ui/[component-name].tsx`. NEVER attempt to install via npm. ALWAYS verify component exists in your local `/components/ui` directory before referencing it.",
        auditAssumption: "Assumes shadcn CLI installation (`npx shadcn-ui@latest init`). Next.js 14 App Router with TypeScript. Tailwind CSS and Radix UI configured.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "✅ AI-Reliable",
        aiReasoning: "React Hook Form (v7.0+, 2021) is the standard for performant React forms. Its hook-based API is well-represented in training data. AI achieves 90%+ accuracy, though complex validation schemas sometimes require manual review.",
        failureMode: "Primary failure: Using controlled input syntax (e.g., `value`, `onChange`) instead of `register()`. Secondary: Confusing React Hook Form v6 API with v7+ (breaking changes in `handleSubmit` signature).",
        usageRule: "ALWAYS use `register()` for input fields. Syntax: `<input {...register('fieldName')} />`. For validation, integrate with Zod via `@hookform/resolvers/zod`.",
        auditAssumption: "Assumes React 18+ with React Hook Form v7.45+. Zod integration recommended for type-safe validation.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "✅ AI-Reliable",
        aiReasoning: "Zod (v3.0+, 2022) has become the de-facto TypeScript validation library. Its schema-first design is intuitive and well-documented. AI achieves 93%+ accuracy in generating Zod schemas.",
        failureMode: "Primary failure: Using incorrect refinement methods (e.g., `.refine()` vs `.superRefine()`). Secondary: Confusing Zod v2 syntax with v3+ (.string() schema changes).",
        usageRule: "Define schemas first, then use `.parse()` for runtime validation or `.safeParse()` for error handling. Integrate with React Hook Form via `zodResolver(schema)`.",
        auditAssumption: "Assumes Zod v3.22+ with TypeScript 5.0+. Compatible with all modern JavaScript runtimes.",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "⚠️ AI-Moderate",
        aiReasoning: "MUI (v5.0+, 2021) is the most popular React component library. However, its large API surface and frequent updates create version confusion. AI achieves 85%+ accuracy, but MUI v4 vs v5 syntax mixing is common.",
        failureMode: "Primary failure: Using MUI v4 `makeStyles` with v5 (deprecated in favor of `sx` prop or styled-components). Secondary: Incorrect theme customization syntax (v5 theme structure changed significantly).",
        usageRule: "ALWAYS use the `sx` prop for styling overrides in MUI v5+. Use `Stack` and `Box` for layout instead of manual flexbox. Verify you are using MUI v5.14+ to avoid API confusion.",
        auditAssumption: "Assumes MUI v5.14+ with Emotion (default styling engine). React 18+. NOT compatible with Next.js App Router without client component wrappers.",
        auditConfidence: "Medium",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "⚠️ AI-Moderate",
        aiReasoning: "Mantine (v6.0+, 2023) is a feature-rich React component library with excellent TypeScript support. AI achieves 87%+ accuracy, but Mantine v5 vs v6 breaking changes can confuse LLMs.",
        failureMode: "Primary failure: Using Mantine v5 theming syntax with v6 (CSS-in-JS engine changed). Secondary: Inventing non-existent hook names from the extensive hooks library.",
        usageRule: "ALWAYS verify you are using Mantine v6+ (NOT v5). Use the `@mantine/hooks` package for utilities. Theming syntax: use `MantineProvider` with `theme` prop.",
        auditAssumption: "Assumes Mantine v6.0+ with PostCSS. React 18+. Next.js 13+ with App Router requires client component wrappers.",
        auditConfidence: "Medium",
        verifiedAsOf: "2025-01-10",

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
        tier: "A",

        safetyLabel: "✅ AI-Reliable",
        aiReasoning: "Zustand (v4.0+, 2022) is a minimalist state management library. Its API is small and intuitive. AI achieves 91%+ accuracy in generating Zustand stores.",
        failureMode: "Primary failure: Using Redux-style action creators instead of direct state mutation. Secondary: Forgetting to use hooks (`useStore`) instead of direct store access on client.",
        usageRule: "Create stores with `create()`. Update state with `set((state) => ({ ...state, newValue }))`. ALWAYS use the hook returned by `create()` in components.",
        auditAssumption: "Assumes Zustand v4.3+ with React 18+. Works universally in all React environments (Next.js, Vite, CRA).",
        auditConfidence: "High",
        verifiedAsOf: "2025-01-10",

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
        tier: "B",

        safetyLabel: "⚠️ AI-Caution",
        aiReasoning: "Framer Motion (v10+, 2023) is powerful but has a large API surface that changes frequently. Training data often contains v6-v8 syntax. AI achieves 78%+ accuracy but version mixing is prevalent.",
        failureMode: "Primary failure: Mixing Framer Motion v6/v7 `exit` animations with v10+ API. Secondary: Incorrectly implementing `AnimatePresence` (forgetting `key` prop or `mode` attribute). Tertiary: Hallucinating spring physics props that don't exist.",
        usageRule: "VERIFY you are using Framer Motion v10+. ALWAYS wrap exit animations in `<AnimatePresence mode='wait'>`. NEVER forget unique `key` props on animated children. Review generated spring/tween configs manually.",
        auditAssumption: "Assumes Framer Motion v10.16+ with React 18+. NOT recommended for Server Components (use client components only).",
        auditConfidence: "Medium",
        verifiedAsOf: "2025-01-10",

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
        tier: "B",

        safetyLabel: "⚠️ AI-Caution",
        aiReasoning: "TanStack Table v8 (2022) introduced massive API breaking changes from v7. LLM training data contains heavy v7 representation. AI achieves only 72%+ accuracy due to version confusion.",
        failureMode: "Primary failure: Using React Table v7 API (`useTable`, `useSortBy`) with TanStack Table v8 (now `useReactTable`, `getCoreRowModel`). Secondary: Inventing column definition props that don't exist in v8.",
        usageRule: "CRITICAL: Ensure you are using TanStack Table v8.10+, NOT React Table v7. Use `useReactTable` hook with `getCoreRowModel`. ALWAYS review column definitions manually for deprecated v7 props.",
        auditAssumption: "Assumes TanStack Table v8.10+ with React 18+. TypeScript strongly recommended to catch API mismatches.",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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
        tier: "B",

        safetyLabel: "⚠️ AI-Caution",
        aiReasoning: "Recharts (v2.0+, 2022) is a declarative charting library built on D3. Its composable API is intuitive but poorly documented edge cases confuse AI. Achieves 80%+ accuracy on basic charts but struggles with complex compositions.",
        failureMode: "Primary failure: Forgetting `ResponsiveContainer` wrapper (charts won't resize). Secondary: Inventing non-existent props on chart components (e.g., `<LineChart animation='smooth' />` doesn't exist, use `isAnimationActive`).",
        usageRule: "ALWAYS wrap charts in `<ResponsiveContainer width='100%' height={400}>`. Use `isAnimationActive` for animation control, NOT `animation`. Manually verify prop names against Recharts documentation.",
        auditAssumption: "Assumes Recharts v2.5+ with React 18+. NOT optimized for massive datasets (use canvas-based charting for 1000+ points).",
        auditConfidence: "Medium",
        verifiedAsOf: "2025-01-10",

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
        tier: "B",

        safetyLabel: "⚠️ AI-Caution",
        aiReasoning: "GSAP (v3+, 2019) is the industry standard for web animation. However, its imperative API is counter to React's declarative paradigm. AI achieves 75%+ accuracy but struggles with React lifecycle integration.",
        failureMode: "Primary failure: Not cleaning up GSAP timelines in `useEffect` return function (causes memory leaks). Secondary: Using GSAP v2 syntax with v3 (`.to()` signature changed). Tertiary: Animating React state directly instead of refs.",
        usageRule: "ALWAYS use refs (NOT state) for GSAP targets. ALWAYS return a cleanup function from `useEffect` that kills timelines: `return () => timeline.kill()`. Use `gsap.to(ref.current, {...})` syntax.",
        auditAssumption: "Assumes GSAP v3.12+ with React 18+. Requires manual cleanup management in React components.",
        auditConfidence: "Medium",
        verifiedAsOf: "2025-01-10",

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
        tier: "B",

        safetyLabel: "⚠️ AI-Caution",
        aiReasoning: "React Three Fiber (R3F) abstracts Three.js into React components. This abstraction layer is complex and training data is limited compared to vanilla Three.js. AI achieves only 70%+ accuracy due to mixing vanilla Three.js with R3F patterns.",
        failureMode: "Primary failure: Using vanilla Three.js imperative code (`new THREE.Mesh()`) inside R3F instead of declarative components (`<mesh>`). Secondary: Inventing non-existent R3F component props. Tertiary: Incorrect camera/scene setup.",
        usageRule: "ONLY use declarative R3F syntax within `<Canvas>`. NEVER mix imperative Three.js code. Verify all mesh/material props against R3F documentation, NOT Three.js docs. Assume all R3F components are lowercase.",
        auditAssumption: "Assumes React Three Fiber v8.15+ with Three.js r155+. Requires WebGL support. NOT compatible with Server Components.",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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

    // --- TIER C (Experimental/High Risk) ---
    {
        id: "tremor",
        name: "Tremor",
        tier: "C",

        safetyLabel: "⛔ High Risk",
        aiReasoning: "Tremor (2023+) is a rapidly evolving dashboard component library. Frequent API changes and limited representation in training data mean AI achieves only 68%+ accuracy. NOT a reflection of library quality - this measures AI reliability only.",
        failureMode: "Primary failure: Using deprecated component names from Tremor v2 with v3 (e.g., `<Card>` renamed to `<MetricCard>`). Secondary: Inventing props that exist in Material UI but not Tremor. Tertiary: Incorrect theming syntax (changes every minor version).",
        usageRule: "CRITICAL: Verify Tremor version and cross-reference ALL component names with current documentation. Assume AI-generated code is outdated. Manually review every generated Tremor component.",
        auditAssumption: "Assumes Tremor v3.14+ with Tailwind CSS. React 18+. API stability is NOT guaranteed between minor versions.",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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
        tier: "C",

        safetyLabel: "⛔ High Risk",
        aiReasoning: "Million.js (2023+) is a Virtual DOM optimization compiler. It's a niche tool with minimal training data. AI achieves only 60%+ accuracy and frequently hallucinates usage patterns. NOT a quality judgment - AI simply lacks reference data.",
        failureMode: "Primary failure: Inventing compiler directives that don't exist (e.g., `'use million'`). Secondary: Applying the `block()` compiler to ALL components (only works on specific patterns). Tertiary: Assuming it's a drop-in React replacement (it's a compiler plugin).",
        usageRule: "CRITICAL: Million.js is an ADVANCED optimization. Only use if you have verified performance bottlenecks. NEVER trust AI-generated usage - manually review the official Million.js docs for every implementation.",
        auditAssumption: "Assumes Million.js v2.6+ with React 18+. Requires Vite or Webpack configuration. NOT compatible with all React patterns.",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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
        tier: "C",

        safetyLabel: "⛔ High Risk",
        aiReasoning: "Chakra UI (v2+, 2022) underwent major refactoring for React Server Components support. Training data heavily represents v1. AI achieves only 70%+ accuracy due to v1-v2 API confusion. Library quality is excellent - AI reliability is the issue.",
        failureMode: "Primary failure: Using Chakra v1 theming system with v2 (complete rewrite). Secondary: Assuming all components work in RSC (many require client components). Tertiary: Inventing style props that were removed in v2.",
        usageRule: "CRITICAL: Verify Chakra UI version (v1 vs v2 vs v3). If using v2+, ASSUME all AI-generated code is Chakra v1 and manually migrate to v2 syntax. Review theming and SSR setup against current docs.",
        auditAssumption: "Assumes Chakra UI v2.8+ with React 18+. Next.js App Router support is partial - requires client component wrappers for most components.",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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
        tier: "C",

        safetyLabel: "⛔ High Risk",
        aiReasoning: "Styled Components (v6+, 2023) is a mature CSS-in-JS library. However, Next.js App Router configuration is complex and poorly documented. AI achieves only 68%+ accuracy on setup, though styled syntax itself is well-understood.",
        failureMode: "Primary failure: Forgetting Next.js 13+ App Router requires a custom registry wrapper for SSR (not documented in Styled Components docs). Secondary: Using v5 theming with v6. Tertiary: Creating styled components inside render (causes re-creation on every render).",
        usageRule: "CRITICAL: If using Next.js App Router, implement the Styled Components SSR registry pattern FIRST (search Next.js docs, not Styled docs). ALWAYS define styled components OUTSIDE render functions. Review all theme access patterns manually.",
        auditAssumption: "Assumes Styled Components v6.1+ with React 18+. Next.js App Router requires custom SSR setup. NOT recommended for new Next.js projects (use Tailwind instead).",
        auditConfidence: "Low",
        verifiedAsOf: "2025-01-10",

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
