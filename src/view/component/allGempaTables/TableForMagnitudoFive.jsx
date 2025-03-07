export const TableForMagnitudoFive = ({data, handleOpenModal}) => {
    console.log("ini dari table for magnitudofive", data)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-dark-mode-v2 dark:text-white border-y dark:border-white">
                    <tr className="rounded-full">
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            #
                        </th>
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            Waktu
                        </th>
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            Magnitudo
                        </th>
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            Kedalaman
                        </th>
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            Koordinat
                        </th>
                        <th scope="col" className="dark:border-white border-r px-6 py-3 text-center">
                            Wilayah
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Detail
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((datum, index) => {
                        return (
                            <tr key={index} className="odd:bg-white odd:dark:bg-dark-mode-bg even:bg-gray-50 even:dark:bg-dark-mode-v2 border-b dark:border-gray-700 border-gray-200 dark:border-none">
                                <th scope="row" className="dark:border-white border-r px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    {index + 1}
                                </th>
                                <td className="dark:border-white border-r px-6 py-4 text-center">
                                    {datum.Tanggal} - {datum.Jam}
                                </td>
                                <td className="dark:border-white border-r px-6 py-4 text-center">
                                    {datum.Magnitude}
                                </td>
                                <td className="dark:border-white border-r px-6 py-4 text-center">
                                    {datum.Kedalaman}
                                </td>
                                <td className="dark:border-white border-r px-6 py-4 text-center capitalize">
                                    {datum.Lintang} - {datum.Bujur}
                                </td>
                                <td className="dark:border-white border-r px-6 py-4 text-center">
                                    {datum.Wilayah}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => handleOpenModal(datum)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Lihat
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}