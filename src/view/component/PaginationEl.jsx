export const PaginationEl = ({ generatePageNumbers, paginatePage, setPaginatePage, paginateTotalPage, paginateTotalItem }) => {

    const LINK_PAGEINATE_ACTIVE = "z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border  border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-mode-v2 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "
    const LINK_PAGINATE_DEACTIVE = "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

    return (
        <div className="py-5 flex justify-between items-center">
            <div className="dark:text-white">Total : {paginateTotalItem}</div>
            <nav aria-label="Page navigation example">
                <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                        <button
                            disabled={paginatePage === 1}
                            onClick={() => setPaginatePage(paginatePage - 1)}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </button>
                    </li>
                    {generatePageNumbers.map((page, i) => (
                        <li key={i} onClick={() => setPaginatePage(page)} disabled={page === paginatePage}>
                            <a aria-current="page" className={page == paginatePage ? LINK_PAGEINATE_ACTIVE : LINK_PAGINATE_DEACTIVE}>{page}</a>
                        </li>
                    ))}
                    <li>
                        <button
                            disabled={paginatePage === paginateTotalPage}
                            onClick={() => setPaginatePage(paginatePage + 1)}
                            className="flex items-center  justify-center px-4 h-10 leading-tight text-gray-500 bg-white border  border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-3 h-3 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>


        </div>
    )

}