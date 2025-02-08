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
            <Navbar fluid rounded className="dark:!bg-dark-mode border-b ">
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
            {/* <nav className="bg-white dark:bg-dark-mode w-full z-20 top-0 start-0 
        border-gray-400">

                <div className="w-full flex  items-center justify-between mx-auto p-4 ">
                    <button
                        onClick={() => handleDrawer(true)}
                        type="button"
                        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

                    <a
                        href="https://flowbite.com/"
                        className="items-center ml-11 space-x-6 rtl:space-x-reverse hidden md:flex"
                    >
                        <img
                            src="/assets/img/logo2.png"
                            className="h-16"
                            alt="BIN Logo"
                        />
                        <div className="flex flex-col items-start">
                            <div className="text-lg font-bold whitespace-nowrap dark:text-white">
                                DASHBOARD 360
                            </div>
                            <div className="text-sm font-bold whitespace-nowrap dark:text-white">
                                Asisgo
                            </div>
                            <div className="text-sm font-bold whitespace-nowrap dark:text-white">
                                Monitoring & Analytic Platform
                            </div>
                        </div>
                    </a>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                        <ul className="flex">
                            <li className="mr-5">
                                <label htmlFor="draft" className="peer/draft cursor-pointer">
                                    <input
                                        id="draft"
                                        type="checkbox"
                                        className="peer hidden "
                                        onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
                                    />
                                    <IconLightModeSVG />
                                    <IconDarkModeSVG />

                                </label>
                            </li>
                            <li className=" ">
                                <div className="relative">

                                    <button
                                        data-dropdown-toggle="dropdownNavbar"
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                        onClick={() => setDropdownProfile(!dropdownProfile)}>
                                        <IconMenuSVG />
                                    </button>

                                    <div
                                        id="dropdownNavbar"
                                        className={`z-10 ${dropdownProfile && 'hidden'} right-0 top-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
                                    >
                                        <ul
                                            className="py-2 text-sm text-gray-700 dark:text-gray-400"
                                            aria-labelledby="dropdownLargeButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Earnings
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a
                                                onClick={() => handleLogout()}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>

                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="navbar-sticky"
                    >

                    </div>
                </div>
            </nav> */}
        </>
    )
}

