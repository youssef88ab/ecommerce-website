type NavbarProps = { onToggleSidebar: () => void; };

export default function Navbar({ onToggleSidebar } : NavbarProps) {
    return (
        <header className="w-full shadow-sm px-4 py-2 flex justify-between items-center border-b bg-white border-gray-200 text-black transition-colors" style={{ minHeight: 56 }}>
            <div>
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className=" block md:hidden p-2 rounded hover:bg-gray-100"
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>
            </div>
            <div className="flex items-center">
                <div className="flex items-center ms-3 relative">
                </div>
            </div>
        </header>
    );
}