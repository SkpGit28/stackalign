export default function NextUIUserRender() {
    return (
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                JD
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-100">Jane Doe</span>
                <span className="text-xs text-slate-400">@janedoe</span>
            </div>
        </div>
    );
}
