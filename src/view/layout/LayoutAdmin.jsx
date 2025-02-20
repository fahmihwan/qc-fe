
import { useState } from "react";
import { NavbarEl } from "../component/NavbarEl";
import { Sidebar } from "../component/Sidebar";
import { useSidebar } from "../../context/SidebarContext";
import { Outlet } from "react-router-dom";



export default function LayoutAdmin() {
    const { isDrawerOpen, toggleDrawer } = useSidebar();

    return (

        <div className="min-h-screen dark:bg-dark-mode-v2 ">
            <NavbarEl handleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
            <div className="flex flex-row justify-start h-full bg-[#f6f6f6] dark:dark-mode-bg">
                <Sidebar />
                <div className="flex-grow dark:bg-dark-mode-bg bg-light-mode-bg">
                    <Outlet />
                </div>
            </div>
        </div>




    )
}

