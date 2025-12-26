export default function EngineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
            {/* Strips global layout/navbars for iframe content */}
            {children}
        </div>
    );
}
