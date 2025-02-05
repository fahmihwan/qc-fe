import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import menu from '../../data/menu'
export const Sidebar = () => {
    const [dropDown, setDropDown] = useState(null);

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className="top-0 left-0 z-40  transition-transform -translate-x-full sm:translate-x-0 border"
            aria-label="Sidebar"
        >
            <div className="border-r  w-[273px] h-[100%] overflow-y-auto bg-gray-50 dark:bg-dark-mode">
                <ul className="space-y-2 font-medium px-6 pt-[25px]">
                    {
                        menu?.map((d, i) => {
                            return (<div key={i}>
                                {d?.submenu == null ? (
                                    <li key={i} style={{ marginBottom: "20px" }}>
                                        <Link
                                            to={d?.link}
                                            className="flex items-center 
                                        border
                                        border-black dark:border-white
                                        p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            {d?.icon}
                                            <span className="ml-3 text-sm">{d?.title}</span>
                                        </Link>
                                    </li>
                                ) : (
                                    <li className=''
                                        key={i}
                                        style={{ marginBottom: "20px" }}
                                        onClick={() => d?.title == dropDown ? setDropDown(null) : setDropDown(d?.title)}
                                    >
                                        <button
                                            type="button"
                                            className="flex 
                                        border
                                        border-black dark:border-white
                                        items-center w-full p-2 text-sm text-gray-900 transition duration-75 rounded-lg group  dark:text-white "
                                            aria-controls="dropdown-example"
                                            data-collapse-toggle="dropdown-example"
                                        >
                                            {d?.icon}
                                            <span className="flex-1 ml-3 text-left rtl:text-right whitespace-nowrap">
                                                {d?.title}
                                            </span>
                                            <svg
                                                className="w-3 h-3"
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

                                        <ul id="dropdown-example" className={`${d?.title == dropDown ? 'block' : 'hidden'} py-2 space-y-2   `}>
                                            {d?.submenu?.length != 0 && d?.submenu?.map((x, index) => {
                                                return (
                                                    <li key={index} onClick={() => setDropDown(d?.title)}>
                                                        <Link
                                                            to={x.link}
                                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                        >
                                                            {x?.icon}
                                                            &nbsp;
                                                            {x?.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                    </li>
                                )}
                            </div>)
                        })
                    }

                </ul>
            </div>

        </aside >
    )
}
