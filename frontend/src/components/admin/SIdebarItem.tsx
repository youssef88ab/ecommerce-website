import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SidebarItemProps {
    icon: any; // Replace 'any' with the correct icon type if available, e.g. IconDefinition from FontAwesome
    label: string;
    collapsed: boolean;
    isActive: boolean;
    onClick: () => void;
    route: string
}

export default function SidebarItem({ icon, label, collapsed, isActive, onClick }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors w-full
        ${isActive
                    ? 'bg-gray-100 text-black border border-gray-200 shadow-sm'
                    : 'text-black hover:bg-gray-50 hover:text-black'
                }`}
        >
            <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
                <FontAwesomeIcon icon={icon} size="lg" className="min-w-[20px] text-gray-700" />
                {!collapsed && <span className="font-semibold ml-4">{label}</span>}
            </div>
        </button>
    );
}
