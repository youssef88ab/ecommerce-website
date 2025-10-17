import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./SIdebarItem";
import { menuItems } from "../../config/menuItems";
import { faTimes, faAngleLeft, faAngleRight, } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {

    // * Collspase sidebar State 
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });

    // * Remember sidebar state in localStorage
    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", collapsed.toString());
    }, [collapsed]);

    // * Navigation 
    const navigate = useNavigate();

    // * Current Route 
    const location = useLocation();

    // * Toggle SideBar 
    const toggleSidebar = () => setCollapsed((prev) => !prev);

    return (
        <aside
            className={`fixed sm:sticky top-0 h-screen bg-white text-black border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col sm:translate-x-0 z-50
            ${collapsed ? "w-20" : "w-48"}
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            role="navigation"
            aria-label="Main navigation"
        >
            <nav className="flex flex-col h-full" tabIndex={0}>
                {/* Top section: Logo + Collapse Button */}
                <div className="flex items-center justify-between px-6 pt-2 pb-3 relative">
                    <div className="flex items-center">
                        <img
                            className="w-8 h-8"
                            src="https://cdn.prod.website-files.com/61241693df6a919162546d4e/612d214b1c0a550f86c31148_Frame%20223.png"
                            alt="Logo"
                            loading="lazy"
                        />
                        {!collapsed && (
                            <span className="ml-2 px-2 font-bold text-2xl transition-all duration-500 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                                Bewize
                            </span>
                        )}
                        <button
                            onClick={toggleSidebar}
                            className="py-2  rounded-full focus:outline-none hover:bg-gray-50 transition-colors"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <FontAwesomeIcon
                                icon={collapsed ? faAngleRight : faAngleLeft}
                                className="text-gray-500 hover:text-gray-700"
                            />
                        </button>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => (document.querySelector("[data-sidebar-toggle]") as HTMLElement | null)?.click()
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors sm:hidden absolute top-4 right-4"
                        aria-label="Close sidebar"
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>
                {/* Sidebar Items (scrollable) */}
                <div className="flex-1 overflow-y-auto p-4">
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.route}
                                icon={item.icon}
                                label={item.label}
                                collapsed={collapsed}
                                route={item.route}
                                isActive={location.pathname === item.route}
                                onClick={() => navigate(item.route)}
                            />
                        ))}
                    </ul>
                </div>
            </nav>
        </aside>
    );
}
