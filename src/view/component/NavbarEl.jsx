import { useEffect, useState } from "react"
import { IconDarkModeSVG, IconLightModeSVG } from "./IconSvg";

import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const NavbarEl = () => {
    const [theme, setTheme] = useState('dark');
    const [dropdownProfile, setDropdownProfile] = useState(true)
    console.log(dropdownProfile);
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
        <nav className="bg-white dark:bg-dark-mode w-full z-20 top-0 start-0 border-b border-b-gray-400 dark:border-gray-600">
            <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center ml-11 space-x-6 rtl:space-x-reverse"
                >
                    <img
                        src="/assets/img/logo2.png"
                        className="h-16"
                        alt="BIN Logo"
                    />
                    <div className="flex flex-col items-start">
                        <div className="text-lg font-bold whitespace-nowrap dark:text-white">
                            BINMAP
                        </div>
                        <div className="text-sm font-bold whitespace-nowrap dark:text-white">
                            Badan Intelijen Negara
                        </div>
                        <div className="text-sm font-bold whitespace-nowrap dark:text-white">
                            Monitoring & Analytic Platform
                        </div>
                    </div>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


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
                                    onClick={() => setDropdownProfile(!dropdownProfile)}
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                >
                                    Dropdown
                                    <svg
                                        className="w-2.5 h-2.5 ms-2.5"
                                        aria-hidden="true"
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
                                {/* Dropdown menu */}
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





                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >

                </div>
            </div>
        </nav>

    )
}
