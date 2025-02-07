const SingleHeatMapTable = ({ data, dataBe, titleBe }) => {
    const items = Object.entries(data).filter(([key]) => key !== "satuan")

    const getColor = (value, max) => {
        const lightness = 30 + (1 - value / max) * 50;
        return `hsl(100, 50%, ${lightness}%)`;
    }

    const maxValue = Math.max(...items.map(([, value]) => value))

    console.log(dataBe);


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-900 dark:bg-white">
                        <th className="border border-gray-400 text-white dark:text-dark-mode px-4 py-2 ">Komoditas</th>
                        <th className="border border-gray-400 text-white dark:text-dark-mode px-4 py-2">Nilai ({data.satuan})</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataBe?.map((d, i) => {
                            if (d.nama_subdata == titleBe) {
                                return (
                                    <tr key={i} className="text-center">
                                        <td className="border border-gray-400 px-4 py-2 capitalize">{d?.nama_sub_kategori}</td>
                                        <td
                                            className="border border-gray-400 px-4 py-2 font-semibold"
                                        // style={{ backgroundColor: getColor(value, maxValue) }}
                                        >
                                            {d?.total}
                                        </td>
                                    </tr>
                                )
                            }

                        })
                    }
                    {/* {items.map(([name, value]) => (
                        <tr key={name} className="text-center">
                            <td className="border border-gray-400 px-4 py-2 capitalize">{name}</td>
                            <td
                                className="border border-gray-400 px-4 py-2 font-semibold"
                                style={{ backgroundColor: getColor(value, maxValue) }}
                            >
                                {value.toLocaleString()}
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    )

}

export default SingleHeatMapTable