export default function RadixTooltipRender() {
    return (
        <div className="relative group">
            <button className="px-4 py-2 bg-slate-800 text-slate-200 rounded-md border border-slate-700 hover:bg-slate-700 transition-colors">
                Hover for Tooltip
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-950 text-white text-xs rounded shadow-xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Radix Tooltip Content
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-950"></div>
            </div>
        </div>
    );
}
