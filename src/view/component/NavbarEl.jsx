import { useEffect, useState } from "react"
import { IconDarkModeSVG, IconLightModeSVG, IconMenuSVG, IconUserSvg } from "./IconSvg";


import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from "react-redux";


export const NavbarEl = ({ isDrawerOpen, handleDrawer }) => {
    const user = useSelector((state) => state.user)


    const [theme, setTheme] = useState('dark');


    const navigate = useNavigate();

    useEffect(() => {
        theme === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
    }, [theme]);

    const handleLogout = () => {
        localStorage.clear()
        Cookies.remove('token')
        Cookies.remove('token_id')
        navigate('/', { replace: true })
    }


    return (
        <>
            <Navbar fluid rounded className="dark:!bg-dark-mode-v2 border-b dark:border-dark-mode-border">
                <button
                    onClick={() => handleDrawer(true)}
                    type="button"
                    className="inline-flex
                    items-center p-2 mt-2 ms-0 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    </svg>
                </button>

                {/* <Link></Link> */}
                <Link
                    to="/dashboard"
                    // href="https://flowbite.com/"
                    className="items-center  space-x-2 md:space-x-4s rtl:space-x-reverse flex"
                >
                    <img
                        src="/assets/img/logo2.png"
                        className="h-10 md:h-12"
                        alt="BIN Logo"
                    />
                    <div className="flex flex-col items-start">
                        <div className="text-xs md:text-lg font-bold whitespace-nowrap dark:text-white">
                            DASHBOARD 360
                        </div>
                        <div className="text-xs  font-bold whitespace-nowrap dark:text-white">
                            Monitoring & Analytic Platform
                            {/* | Monitoring & Analytic Platform */}
                        </div>

                    </div>
                </Link>


                <div className="flex md:order-2 items-center">
                    <label htmlFor="draft" className="peer/draft cursor-pointer mr-2 md:mr-5">
                        <input
                            id="draft"
                            type="checkbox"
                            className="peer hidden "
                            onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
                        />
                        <IconLightModeSVG />
                        <IconDarkModeSVG />

                    </label>

                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <IconUserSvg />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user?.firstName} {user?.lastName}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={() => handleLogout()}
                        >Sign out</Dropdown.Item>
                    </Dropdown>
                </div>
            </Navbar>
        </>
    )
}

