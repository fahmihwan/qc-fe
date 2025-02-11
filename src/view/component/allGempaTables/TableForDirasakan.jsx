import { SkalaMMI } from "../miniComponent/SkalaMMI";

export const TableForDirasakan = ({data, handleOpenModal}) => {

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 bg-gray-50 dark:bg-black dark:text-white border-y dark:border-white">
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
                        console.log(datum.Dirasakan)
                        return (
                            <tr className="odd:bg-white odd:dark:bg-dark-mode even:bg-gray-50 even:dark:bg-black border-b dark:border-gray-700 border-gray-200 dark:border-none">
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
                                <td className="dark:border-white border-r px-6 py-4 text-left   ">
                                    <div>{datum.Wilayah}</div>
                                    <div className="flex justify-start gap-1 flex-wrap">
                                        {(typeof datum.Dirasakan === "string" ? datum.Dirasakan.split(/,\s*/) : []).map((area, idx) => {
                                            const match = area.match(/^([IVXLCDM+-]+)/); // Ambil hanya angka Romawi + tanda tambahan
                                            const skala = match ? match[1] : ""; // Jika ada match, ambil skala MMI

                                            return <SkalaMMI key={idx} skala={skala} tulisan={area} />;
                                        })}

                                    </div>
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