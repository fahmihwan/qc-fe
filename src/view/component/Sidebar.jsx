import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import menu from '../../data/menu';
import { Drawer } from "flowbite-react";
import { useSidebar } from '../../context/SidebarContext';

export const Sidebar = () => {
    const { isDrawerOpen, toggleDrawer, dropDown, toggleDropdown } = useSidebar();
    const location = useLocation()

    return (
        <>
            <aside
                className="top-0 left-0 z-40 transition-transform -translate-x-full sm:translate-x-0  
                           lg:block hidden border-r dark:border-dark-mode-border bg-white dark:bg-dark-mode-v2"
                aria-label="Sidebar"
            >
                <div className="w-[273px] min-h-[calc(100vh-69px)] overflow-y-auto bg-white dark:bg-dark-mode-v2">
                    <MenuEl menu={menu} dropDown={dropDown} toggleDropdown={toggleDropdown} />
                </div>
            </aside>

            <Drawer open={isDrawerOpen} onClose={toggleDrawer} className="dark:!bg-dark-mode border-r">
                <Drawer.Header title="Menu" />
                <Drawer.Items>
                    <MenuEl menu={menu} dropDown={dropDown} toggleDropdown={toggleDropdown} />
                </Drawer.Items>
            </Drawer>
        </>
    );
};

export const MenuEl = ({ menu, dropDown, toggleDropdown }) => {
    return (
        <ul className="space-y-2 font-medium px-6 pt-[25px]">
            {menu.map((d, i) => (
                <div key={i}>
                    {d?.submenu == null ? (
                        <li style={{ marginBottom: "20px" }}>
                            <Link
                                to={d?.link}
                                className={`flex flex-row gap-3 items-center border border-black dark:border-white p-2 
                                rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                                ${location.pathname === d.link ? "bg-gray-200 hover:text-gray-900 dark:bg-gray-hover" : "text-gray-900"} `}
                                onClick={() => toggleDropdown(null)}
                            >
                                {d?.icon}
                                <span className="text-sm">{d?.title}</span>
                            </Link>
                        </li>
                    ) : (
                        <li
                            style={{ marginBottom: "20px" }}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleDropdown(d?.title)
                            }}
                        >
                            <button
                                type="button"
                                className={`flex border border-black dark:border-white items-center w-full p-2 text-sm text-gray-900 
                                transition duration-75 rounded-lg group dark:text-white`}
                            >
                                {d?.icon}
                                <span className="flex-1 ml-3 text-left rtl:text-right whitespace-nowrap">
                                    {d?.title}
                                </span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-300 ${
                                        d?.title === dropDown ? "rotate-0" : "-rotate-90"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            <ul className={`${d?.title === dropDown ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden py-0 space-y-2 transform transition-all duration-300 ease-in-out`}>
                                {d?.submenu?.map((x, index) => (
                                    <li key={index} className={`${index === 0 ? "mt-2" : ""}`}>
                                        <Link
                                            to={x.link}
                                            className={`flex flex-row gap-3 items-center p-2 transition duration-75 rounded-lg ml-8 
                                            group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700
                                            ${location.pathname === x.link ? "bg-gray-200 hover:text-gray-900 dark:bg-gray-hover" : "text-gray-900"}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >

                                            {x?.icon}
                                            {x?.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </div>
            ))}
        </ul>
    );
};
