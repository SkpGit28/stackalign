export default function FlowbiteTabsRender() {
    return (
        <div className="border-b border-slate-800">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-slate-400">
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 text-blue-500 border-b-2 border-blue-500 rounded-t-lg active">Profile</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-slate-300 hover:border-slate-700">Dashboard</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-slate-300 hover:border-slate-700">Settings</a>
                </li>
            </ul>
        </div>
    );
}
