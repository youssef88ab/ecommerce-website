import React, { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";
interface DashboardLayoutProps {
    children: ReactNode; 
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-light-background">
            <Sidebar isOpen={isSidebarOpen} /> 
            <div className="flex-1 flex flex-col">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
