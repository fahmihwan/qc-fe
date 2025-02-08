
import { useState } from "react";
import { NavbarEl } from "../component/NavbarEl";
import { Sidebar } from "../component/Sidebar";



export default function LayoutAdmin({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (

        <div className="dark:bg-dark-mode min-h-screen ">
            <NavbarEl handleDrawer={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />

            <div className="flex flex-row justify-start h-full dark:bg-dark-mode">
                <Sidebar handleDrawer={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
                <div className="flex-grow dark:bg-dark-mode-v2">
                    {children}
                </div>
            </div>
        </div>




    )
}

