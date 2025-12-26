import { libraries } from "@/data/libraries";
import LibraryProfile from "@/components/library/LibraryProfile";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return libraries.map((lib) => ({
        slug: lib.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const library = libraries.find((lib) => lib.id === params.slug);

    if (!library) {
        return {
            title: "Library Not Found | StackAlign",
        };
    }

    return {
        title: `${library.name} - Forensic AI Audit | StackAlign`,
        description: `Is ${library.name} safe for AI? View the forensic audit, failure modes, and usage rules for ${library.name}.`,
        openGraph: {
            title: `${library.name} - Visual Intelligence Profile`,
            description: library.killerReason,
            type: "website",
        },
    };
}

export default function LibraryPage({ params }: PageProps) {
    const library = libraries.find((lib) => lib.id === params.slug);

    if (!library) {
        notFound();
    }

    return <LibraryProfile library={library} />;
}
