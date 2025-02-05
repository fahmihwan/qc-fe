import { useEffect, useState } from "react"
import { IconDarkModeSVG, IconLightModeSVG } from "./IconSvg";


export const Navbar = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        theme === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
    }, [theme]);


    return (
        <nav className="bg-white dark:bg-dark-mode w-full z-20 top-0 start-0 border-b border-b-gray-400 dark:border-gray-600">
            <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center ml-11 space-x-6 rtl:space-x-reverse"
                >
                    <img
                        src="src\assets\img\logo.png"
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
