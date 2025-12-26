export default function ShadcnCardRender() {
    return (
        <div className="w-64 rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-sm">
            <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold leading-none tracking-tight text-slate-100">Project Alpha</h3>
                <p className="text-sm text-slate-500">Deployment successful.</p>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="text-xs font-medium text-blue-400 hover:underline">View Logs</button>
            </div>
        </div>
    );
}
