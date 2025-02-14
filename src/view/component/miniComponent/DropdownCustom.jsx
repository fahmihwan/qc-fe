import { useState } from "react";

const DropdownCustom = ({ listDropDown, onSelect, isProvinceClicked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Pilih Tahun");

    return (
        <div className={`pb-5 items-center ${!isProvinceClicked ? 'mt-5':''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white w-44 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                <div className="flex flex-row justify-between items-center w-full">
                    {selectedItem}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
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
