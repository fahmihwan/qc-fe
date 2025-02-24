import { useState } from "react";

const DropdownCustom = ({ listDropDown, onSelect, isProvinceClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Pilih Tahun");

    return (
        <div className={` items-center ${!isProvinceClicked ? '':''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-44 text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[10px] py-[10px] text-center inline-flex items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                type="button"
            >
                <div className="flex flex-row justify-between items-center w-full">
                    {selectedItem}
                    {isOpen ? 
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 5 4-4 4 4" />
                        </svg>
                        :
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    }
                </div>
            </button>

            {isOpen && (
                <div className="absolute mt-2 z-10 bg-dark-mode divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-white">
                    <ul className="py-2 text-sm text-white dark:text-dark-mode">
                        {listDropDown.map((item, index) => (
                            <li key={index}>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-dark-mode dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        setSelectedItem(item)
                                        setIsOpen(false);
                                        onSelect(item)
                                    }}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownCustom;
