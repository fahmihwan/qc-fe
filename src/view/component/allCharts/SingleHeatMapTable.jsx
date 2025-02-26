import { useEffect, useState } from "react"
import { formatCurrency } from "../../../utils/generateUtil"

const SingleHeatMapTable = ({ data, dataBe, titleBe }) => {
    const items = Object.entries(data).filter(([key]) => key !== "satuan")
    const [maxValueLuasPanen, setMaxValueLuasPanen] = useState(1)
    const [maxValueProduktivitas, setMaxValueProduktivitas] = useState(1)

    useEffect(() => {
        if(dataBe && dataBe.length > 0){
            setMaxValueLuasPanen(Math.max(...dataBe
                .filter((item) => item.nama_subdata == "Luas Panen")
                .map((item) => parseFloat(item.total))
            ))
            setMaxValueProduktivitas(Math.max(...dataBe
                .filter((item) => item.nama_subdata == "Produktivitas")
                .map((item) => parseFloat(item.total))
            ))
        }
    }, [dataBe])

    const getColor = (value, max = maxValueLuasPanen, type) => {
        if (type == "produktivitas") {
            // if (value === 0) return `hsl(283, 100%, 90%)`; 
        
            const lightness = 90 - (parseFloat(value) / max) * 40; // dari 90 turun ke 50
            return `hsl(283, 100%, ${Math.max(lightness, 50)}%)`;
        }
        // if (value === 0) return `hsl(100, 50%, 90%)`;
    
        const lightness = 90 - (parseFloat(value) / max) * 40; // dari 90 turun ke 50
        return `hsl(203, 100%, ${Math.max(lightness, 50)}%)`;
    }

    const getColorText = (value, max = maxValueLuasPanen) => {
        const lightness = value > (max / 2) ? 100 : 10.6
        return `hsl(0, 0%, ${lightness}%)`;
    }
    // console.log(dataBe);


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
                                        <td className="border border-gray-400 p-2 font-semibold">
                                            <div 
                                                className="p-2"
                                                style={{ 
                                                    backgroundColor: getColor(
                                                        d?.total, 
                                                        titleBe == "Luas Panen" ? maxValueLuasPanen : maxValueProduktivitas, 
                                                        titleBe == "Luas Panen" ? "produktivitas" : "luas_panen"
                                                    ), 
                                                    color: getColorText(
                                                        d?.total, 
                                                        titleBe == "Luas Panen" ? maxValueLuasPanen : maxValueProduktivitas
                                                    )
                                                }}
                                            >
                                                {formatCurrency(d?.total)}
                                            </div>
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