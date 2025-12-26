export default function MUISliderRender() {
    return (
        <div className="w-48 px-4 py-8">
            <div className="relative w-full h-1 bg-blue-900/30 rounded-full">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
            <span className="block mt-4 text-center text-xs text-slate-400 font-medium">MUI Slider (50%)</span>
        </div>
    );
}
