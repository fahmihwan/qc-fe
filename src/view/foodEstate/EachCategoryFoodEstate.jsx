import { useEffect, useRef, useState } from 'react'
import { useEffectFoodEstate } from '../../hook/useEffectFoodEstate'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'

const EachCategoryFoodEstate = ({ category }) => {
    const listDropDown = [2024, 2023, 2022, 2021, 2020]
    // console.log("ini kategori:", category)

    const { response, error } = useEffectFoodEstate(category);
    const [isLoading, setIsLoading] = useState(true)

    const [dataLuasPanenToParse, setDataLuasPanenToParse] = useState({})
    const [dataProduktivitasToParse, setDataProduktivitasToParse] = useState({})
    const [allData, setAllData] = useState({})

    const [isProvinceClicked, setIsProvinceClicked] = useState(false)

    useEffect(() => {
        if (response) {
            // console.log('response dari api: ', response);
            // console.log('response dari api: ', response.luasPanen);
            setDataLuasPanenToParse(formatChartData(response, 'Luas Panen (ha)'))
            setDataProduktivitasToParse(formatChartData(response, 'Produktivitas (ku/ha)'))

            setTimeout(() => {
                setAllData(response);
                // console.log("ini alldatas", response);
                // console.log("data ", dataLuasPanenToParse)
                // console.log("data ", dataProduktivitasToParse)
                setIsLoading(false);
            }, 1500);
        }
    }, [response]);

    const formatChartData = (response, title) => {
        // console.log("ini kepanggil")
        if (!response) {
            return { labels: [], datasets: [] }
        }

        const isLuasPanen = title === "Luas Panen (ha)"
        const dataKey = isLuasPanen ? "luasPanen" : "produktivitas"

        const dataList = response[dataKey] || []

        const sortedData = [...dataList].sort((a, b) => a.year - b.year)

        return {
            labels: sortedData.map(item => item.year),
            datasets: [
                {
                    data: sortedData.map(item => parseFloat(item.value)),
                    backgroundColor: isLuasPanen ? "rgba(178, 223, 138, 1)" : "rgba(244, 190, 55, 1)",
                    borderWidth: 0,
                }
            ]
        }
    }

    const dummyData = (title) => {
        return {
            labels: [2020, 2021, 2022, 2023, 2024],
            datasets: [
                {
                    data: [1000000, 2034424, 1021242, 3080382, 1249124],
                    backgroundColor: title == "Luas Panen (ton)" ? "rgba(178, 223, 138, 1)" : "rgba(244, 190, 55, 1)",
                    borderWidth: 0
                }
            ]
        }
    }
    const onProvinceClick = ({ namaProvinsi, kodeProvinsi }) => {
        setIsProvinceClicked(true)
        // console.log('Ini provinsi diklik  test');
    }

    return (
        <LayoutAdmin>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen text-white text-2xl">
                    Loading...
                </div>
            ) : (
                <div className='w-full xl:grid lg:grid-cols-7 '>
                    <div className='col-span-12 lg:col-span-5 '>

                        {/* header */}
                        <div className=" flex border dark:border-dark-mode-border ml-5 my-5 px-5 bg-white dark:bg-dark-mode-v2">
                            <div className="grid grid-cols-3 gap-4 lg:py-5  items-center w-full ">
                                <div className="rounded flex  items-">
                                    <div className="flex-col justify-center block lg:hidden items-center text-white">
                                        <div className="text-black dark:text-white text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                        <div className="text-black dark:text-white text-xs lg:text-2xl  font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className=" text-white rounded ">
                                    <div className="text-center h-20  flex-col justify-center hidden lg:block">
                                        <div className="text-black dark:text-white text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                        <div className="text-black dark:text-white text-xs lg:text-2xl text-center font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                                    </div>
                                </div>
                                {/* <div className=" text-white flex justify-end">
                                    <DropdownCustom listDropDown={listDropDown} />
                                </div> */}
                            </div>
                        </div>

                        {/* <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                                <div className="dark:text-white text-2xl font-bold">DASHBOARD 360</div>
                                <div className="dark:text-white text-2xl font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                            </div>

                            <div className="ml-auto">
                                <DropdownCustom listDropDown={listDropDown} />
                            </div>
                        </div> */}

                        <div className='border ml-5 p-2 flex justify-center dark:border-dark-mode-border bg-white dark:bg-dark-mode-v2' >
                            <div className='w-[100%] h-[500px] '>
                                <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} />
                            </div>
                        </div>

                        <marquee className="mx-6 my-4 dark:bg-dark-mode align-middle">
                            <span className="text-red-custom text-xl">Di sini</span>
                            <span className="dark:text-white text-xl font-bold">Akan ada </span>
                            <span className="text-green-custom text-xl">Running Text </span>
                        </marquee>
                    </div>
                    {!isLoading && response && (
                        <>
                            <div className='w-full xl:col-span-2'>
                                <div className='bg-white dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                                    <BarChartEachFoodEstate title={"Luas Panen (ha)"} data={dataLuasPanenToParse} />
                                </div>
                                <div className='bg-white dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                                    <BarChartEachFoodEstate title={"Produktivitas (ku/ha)"} data={dataProduktivitasToParse} />
                                </div>
                            </div>
                        </>
                    )}

                </div>
            )
            }
        </LayoutAdmin >


    )
}

export default EachCategoryFoodEstate