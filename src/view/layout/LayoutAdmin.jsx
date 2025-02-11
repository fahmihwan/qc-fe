
import { useState } from "react";
import { NavbarEl } from "../component/NavbarEl";
import { Sidebar } from "../component/Sidebar";



export default function LayoutAdmin({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (

        <div className="min-h-screen dark:bg-dark-mode-v2">
            <NavbarEl handleDrawer={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
            <div className="flex flex-row justify-start h-full dark:dark-mode-bg">
                <Sidebar handleDrawer={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
                <div className="flex-grow dark:bg-dark-mode-bg">
                    {children}
                </div>
            </div>
        </div>




    )
}

