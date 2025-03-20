import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { IconDownloadSVG, IconSortFilterSVG2 } from "./IconSvg";

import { motion } from 'framer-motion';
import { fadeIn } from "../../variants";

import * as XLSX from "xlsx";

export const TableForTabularBencana = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 10;

    const onPageChange = (page) => setCurrentPage(page);

    const filteredData = data.filter((item) => {
        return (
            item.provinsi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kabkot?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.kib?.toString().includes(searchTerm) ||
            item.id_kab?.toString().includes(searchTerm) ||
            item.tanggal_status?.toString().includes(searchTerm)
        );
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;
    
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];
    
        if (sortColumn === "tanggal_status") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        } else {
            if (!isNaN(parseFloat(aValue))) aValue = parseFloat(aValue);
            if (!isNaN(parseFloat(bValue))) bValue = parseFloat(bValue);
        }
    
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    
        return 0;
    });

    const handleSort = (column) => {
        setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
        setSortColumn(column);
    };

    const handleDownloadExcel = () => {
        const headers = [
            // "Kode Identitas Bencana",
            // "ID Kabupaten",
            "Jenis Kejadian",
            "Tanggal Kejadian",
            "Kabupaten / Kota",
            "Provinsi",
            "Meninggal",
            "Hilang",
            "Terluka",
            "Menderita dan Mengungsi",
            "Rumah Rusak Ringan",
            "Rumah Rusak Sedang",
            "Rumah Rusak Berat",
            "Rumah Terendam",
            "Satuan Pendidikan Rusak",
            "Rumah Ibadat Rusak",
            "Fasyankes Rusak",
            "Kantor Rusak"
        ]

        const keys = [
            // "kib",
            // "id_kab",
            "kejadian",
            "tanggal_status",
            "kabkot",
            "provinsi",
            "meninggal",
            "hilang",
            "terluka",
            "menderita_mengungsi",
            "rumah_rusak_ringan",
            "rumah_rusak_sedang",
            "rumah_rusak_berat",
            "terendam",
            "pendidikan_rusak",
            "peribadatan_rusak",
            "kesehatan_rusak",
            "kantor_rusak"
        ];

        const dataToExport = [headers, ...data.map(row => keys.map(key => row[key] || '-'))]

        const worksheet = XLSX.utils.aoa_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Bencana")

        XLSX.writeFile(workbook, "Data_Bencana.xlsx")
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    const isDataEmpty = !data || data.length === 0;

    return (
        <div className="">
            <div className="dark:text-white font-bold text-[32px] mt-14 mb-[30px]">Tabel Bencana</div>
            {isDataEmpty ? (
                <div className="flex flex-col justify-center">
                    <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                </div>
            ) : (
                <>
                    <div className="mb-4 w-full flex flex-row justify-between gap-4">
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-dark-mode-border dark:focus:text-white dark:border-light-border px-4 py-2 dark:bg-dark-mode-bg w-full rounded shadow-none outline-none focus:outline-none focus:ring-0"
                        />
                        <motion.button 
                            whileTap={{ scale: 0.8 }}
                            className="relative overflow-hidden items-center justify-center min-w-[200px] mr-5 py-4 px-[30px] border rounded-[10px] 
                            dark:border-dark-border border-light-border transition-all duration-300 group"
                            onClick={handleDownloadExcel}
                        >
                            <span className="absolute inset-0 bg-blue-custom w-0 h-full transition-all duration-500 ease-in-out group-hover:w-full"></span>

                            <div className='relative z-10 flex items-center justify-center'>
                                <span className="relative dark:text-white font-bold text-base z-10 items-center">Unduh Data</span>
                            </div>
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-12 overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-dark-mode-v2 dark:text-white border-y dark:border-white">
                                <tr className="rounded-full">
                                    <th
                                        className="dark:border-white font-bold border-r px-6 py-3 text-center cursor-pointer"
                                    >
                                        #
                                    </th>
                                    {[
                                        // { key: "kib", label: "Kode Identitas Bencana" },
                                        // { key: "id_kab", label: "ID Kabupaten" },
                                        { key: "kejadian", label: "Jenis Kejadian"},
                                        { key: "tanggal_status", label: "Tanggal Kejadian" },
                                        { key: "kabkot", label: "Kabupaten / Kota" },
                                        { key: "provinsi", label: "Provinsi" },
                                        { key: "meninggal", label: "Meninggal" },
                                        { key: "hilang", label: "Hilang" },
                                        { key: "terluka", label: "Terluka" },
                                        { key: "menderita_mengungsi", label: "Menderita dan Mengungsi" },
                                        { key: "rumah_rusak_ringan", label: "Rumah Rusak Ringan" },
                                        { key: "rumah_rusak_sedang", label: "Rumah Rusak Sedang" },
                                        { key: "rumah_rusak_berat", label: "Rumah Rusak Berat" },
                                        { key: "terendam", label: "Rumah Terendam" },
                                        { key: "pendidikan_rusak", label: "Satuan Pendidikan Rusak" },
                                        { key: "peribadatan_rusak", label: "Rumah Ibadat Rusak" },
                                        { key: "kesehatan_rusak", label: "Fasyankes Rusak" },
                                        { key: "kantor_rusak", label: "Kantor Rusak" }
                                    ].map((col) => (
                                        <th
                                            key={col.key}
                                            className="dark:border-white border-r px-6 py-3 text-center cursor-pointer"
                                            onClick={() => handleSort(col.key)}
                                        >
                                            <div className="flex flex-row items-center gap-3 justify-center">
                                                {col.label} <IconSortFilterSVG2 />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((datum, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-dark-mode-bg even:bg-gray-50 even:dark:bg-dark-mode-v2 border-b dark:border-gray-700 border-gray-200 dark:border-none"
                                    >
                                        <th scope="row" className="dark:border-white border-r px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
                                            {startIndex + index + 1}
                                        </th>
                                        {[
                                            // "kib",
                                            // "id_kab",
                                            "kejadian",
                                            "tanggal_status",
                                            "kabkot",
                                            "provinsi",
                                            "meninggal",
                                            "hilang",
                                            "terluka",
                                            "menderita_mengungsi",
                                            "rumah_rusak_ringan",
                                            "rumah_rusak_sedang",
                                            "rumah_rusak_berat",
                                            "terendam",
                                            "pendidikan_rusak",
                                            "peribadatan_rusak",
                                            "kesehatan_rusak",
                                            "kantor_rusak"
                                        ].map((key) => (
                                            <td key={key} className="dark:border-white border-r px-6 py-4 text-center break-words">
                                                {datum[key] ? datum[key] : "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center my-5">
                        <Pagination
                            layout="pagination"
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                            onPageChange={onPageChange}
                            previousLabel="Prev"
                            nextLabel="Next"
                            showIcons
                        />
                    </div>
                </>
            )}
        </div>
    );
};
