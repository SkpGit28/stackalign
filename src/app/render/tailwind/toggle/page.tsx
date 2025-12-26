export default function TailwindToggleRender() {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-6 flex items-center bg-slate-800 rounded-full p-1 cursor-pointer group">
                <div className="bg-white w-4 h-4 rounded-full shadow-md transform group-hover:translate-x-1 transition-transform"></div>
            </div>
            <span className="text-sm font-medium text-slate-400">Tailwind Toggle</span>
        </div>
    );
}
