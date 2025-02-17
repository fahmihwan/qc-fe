import { useState } from "react";

const DropdownCustomV2 = ({ title, listDropDown, selectedItem, setSelectedItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="pb-5 items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="border-[1px] bg-light-mode-bg dark:border-light-border border-dark-border dark:bg-dark-mode-bg w-96 rounded-[5px] text-sm p-[15px] text-center flex items-center dark:hover:bg-gray-hover hover:bg-gray-hover hover:text-white"
                type="button"
            >
                <div className={`flex flex-row justify-between items-center w-full ${selectedItem ? 'dark:text-white' : 'dark:text-gray-not-selected text-gray-not-selected'}`}>
                    {selectedItem || title}

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
                <div className="absolute mt-2 z-10 max-h-60 overflow-y-auto bg-dark-mode divide-y divide-gray-100 rounded-lg shadow-sm w-96 dark:bg-white">
                    <ul className="py-2 text-sm text-white dark:text-dark-mode">
                        {listDropDown.map((item, index) => (
                            <li key={index}>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-dark-mode dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        setSelectedItem(item); 
                                        setIsOpen(false);
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

export default DropdownCustomV2;
