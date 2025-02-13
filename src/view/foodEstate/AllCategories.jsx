
import { useEffect, useState } from 'react'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import BarChartTumpukEachFoodEstate from '../component/allCharts/BarChartTumpukEachFoodEstate'
import PieChartAfterFilteredByProvinceAllFoodEstate from '../component/allCharts/PieChartAfterFilteredByProvinceAllFoodEstate'
import TableForFoodEstate from '../component/allCharts/TableForFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectOtherApi } from '../../hook/useEffectOtherApi'
import { useEffectAllFoodEstate } from '../../hook/useEffectAllFoodEstate'
import { useEffectYears } from '../../hook/useEffectYears'
import { useEffectAllFoodEstateEachProvinceEachYear } from '../../hook/useEffectAllFoodEstateEachProvince'
import { getAllFoodEstateByProvinceIdAndYear } from '../../api/foodEstate'

const AllCategories = () => {
    const dummyDataForTable = {
        "message": "data fetch successfully",
        "data": {
            "startDate": "2024-01-01T00:00:00Z",
            "endDate": "2024-01-29T23:59:59Z",
            "provinceName": "all",
            "totalLahan": {
                "satuan": "ha",
                "padi": 10024212,
                "jagung": 1241353,
                "kedelai": 13892735,
                "tebu": 93935983,
                "singkong": 87982783
            },
            "produktivitas": {
                "satuan": "ku/ha",
                "padi": 298383,
                "jagung": 124,
                "kedelai": 329,
                "tebu": 93872,
                "singkong": 9827
            }
        }
    }

    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null)
    const [listDropDown, setListDropDown] = useState([])    

    const [isProvinceClicked, setIsProvinceClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [pieChartData, setPieChartData] = useState(null)
    const [errorPieChartData, setErrorPieChartData] = useState(null)

    const { response, error } = useEffectOtherApi(selectedYear);
    const { response: responseSideBarChart, error: errorSideBarChart } = useEffectAllFoodEstate();
    const { response: responseListYear, error: errorListYear} = useEffectYears()

    useEffect(() => {
        if (responseListYear) {
            const years = responseListYear.map(item => parseInt(item.year));
            setListDropDown(years); 
            console.log("ini years",years)
            setSelectedYear(years[0])
        }
    }, [responseListYear]);


    useEffect(() => {
        if (responseSideBarChart) {
            console.log("Data yang diterima:", responseSideBarChart);
        } else if (errorSideBarChart) {
            console.error("Error fetching data:", errorSideBarChart);
        }
    }, [responseSideBarChart, errorSideBarChart]);

    useEffect(() => {
        console.log(pieChartData)
    }, [pieChartData])

    useEffect(() => {
        if (selectedProvinceCode && selectedYear) {
            fetchData(selectedProvinceCode, selectedYear).then((res) => {
                setPieChartData(res);
            });
        }
    }, [selectedYear, selectedProvinceCode]);

     const fetchData = async (province_id, year) => {
        try{
            if(!province_id && !year) return;
            const response = await getAllFoodEstateByProvinceIdAndYear(province_id, year)
            if (response.data) {
                console.log("Data yang diterima test:", response);
                return response
            } else {
                // setError("Data dari API kosong!");
            }
        } catch (error) {
            // setError(error)
        }
    }

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {

        // setSelectedProvinceName(namaProvinsi);
        // setSelectedProvinceCode(kodeProvinsi)
        // console.log("masih bisa nih, year: ", selectedYear)

        console.log('wkwkwkwk')
       await fetchData(kodeProvinsi, selectedYear).then((res)=>{
        console.log(res)
        setPieChartData(res)
        setSelectedProvinceName(namaProvinsi)
        setSelectedProvinceCode(kodeProvinsi)
        // console.log("pie  chart: ", pieChartData)
        setIsProvinceClicked(true);
       })

        // const { response: responsePieChart, error: errorPieChart } = useEffectAllFoodEstateEachProvinceEachYear(kodeProvinsi, selectedYear)
        // console.log("pie chart response", responsePieChart)
        // setPieChartData(dummyDataForSpecifiedProvince)
        // setErrorPieChartData(errorPieChart)
    };

    const onSelect = async(year) => {
        setSelectedYear(year)
        await fetchData(selectedProvinceCode, selectedYear).then((res)=>{
            console.log(res)
            setPieChartData(res)
        })
    }

    const resetSelection = () => {
        setIsProvinceClicked(false);
        setSelectedProvinceName('');
        setSelectedProvinceCode(null);
    };

    const crops = ["Padi", "Jagung", "Singkong", "Kedelai", "Tebu"];
    const colors = [
        'rgba(178, 223, 138, 1)',  // Padi
        'rgba(244, 190, 55, 1)',   // Jagung
        'rgba(21, 93, 33, 1)',     // Singkong
        'rgba(15, 44, 64, 1)',     // Kedelai
        'rgba(138, 28, 114, 1)'    // Tebu
    ];

    const labels = responseSideBarChart ? responseSideBarChart.map(item => item.year) : [];
    const datasetsLuasPanen = crops.map((crop, index) => ({
        label: crop,
        data: responseSideBarChart ? responseSideBarChart.map(item => item.luas_panen[crop]) : [],
        backgroundColor: colors[index],
        borderWidth: 0,
    }));

    const datasetsProduktivitas = crops.map((crop, index) => ({
        label: crop,
        data: responseSideBarChart ? responseSideBarChart.map(item => item.produktivitas[crop]) : [],
        backgroundColor: colors[index],
        borderWidth: 0,
    }));

    const chartDataLuasPanen = { labels, datasets: datasetsLuasPanen };
    const chartDataProduktivitas = { labels, datasets: datasetsProduktivitas };

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
                        <div className=" flex border border-dark-mode-border ml-5 my-5 px-5 dark:bg-dark-mode">
                            <div className="grid grid-cols-3 gap-4 lg:py-5  items-center w-full ">
                                <div className=" rounded flex  items-centers ">

                                    <div className="flex-col justify-center block lg:hidden items-center text-white">
                                        <div className="text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                        <div className="text-xs lg:text-2xl  font-bold">SEMUA FOOD ESTATE</div>
                                    </div>
                                </div>
                                <div className=" text-white rounded ">
                                    <div className="text-center flex-col justify-center hidden lg:block">
                                        <div className=" text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                        <div className=" text-xs lg:text-2xl text-center font-bold">SEMUA FOOD ESTATE</div>
                                    </div>
                                </div>
                                <div className=" text-white flex items-center justify-end">
                                    <div className='flex flex-col items-center align-middle'>
                                        <DropdownCustom listDropDown={listDropDown} onSelect={onSelect}/>

                                        {isProvinceClicked &&
                                            <button
                                                onClick={resetSelection}
                                                className="text-white w-36 lg:w-44 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                type="button"
                                            >
                                                <div className="flex flex-row justify-between items-center w-full">
                                                    Seluruh Indonesia
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border ml-5 p-2 flex justify-center border-dark-mode-border '>
                            <div className=' w-[100%] h-[500px]'>
                                <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} />
                            </div>
                        </div>

                        {!isProvinceClicked &&
                            <div className='grid md:grid-cols-2 ml-5 mt-5  p-2 dark:bg-dark-mode-bg'>
                                <div className=' mb-10 md:mb-0  col-span-1 dark:text-white px-6 pt-4 border border-dark-mode-border mr-5'>
                                    <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Luas Panen"} year={selectedYear}/>
                                </div>
                                <div className=' col-span-1 dark:text-white px-6 py-4  border border-dark-mode-border '>
                                    <TableForFoodEstate title={"Produktivitas (ku/ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Produktivitas"} year={selectedYear}/>
                                </div>
                            </div>
                        }
                    </div>

                    {/* grafik samping kanan */}
                    {isProvinceClicked ?
                        <div className='w-full xl:col-span-2 '>
                            <PieChartAfterFilteredByProvinceAllFoodEstate title={`Luas Panen (ha) Provinsi ${selectedProvinceName}`} data={pieChartData} year={selectedYear} />
                            <PieChartAfterFilteredByProvinceAllFoodEstate title={`Produktivitas (ku/ha) Provinsi ${selectedProvinceName}`} data={pieChartData} year={selectedYear} />
                        </div> :
                        <div className='w-full xl:col-span-2  '>
                            <div className='dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                                <BarChartTumpukEachFoodEstate title={"Luas Panen (ha)"} data={chartDataLuasPanen} />
                            </div>
                            <div className='dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                                <BarChartTumpukEachFoodEstate title={"Produktivitas (ku/ha)"} data={chartDataProduktivitas} />
                            </div>
                        </div>
                    }
                </div>
            )}
        </LayoutAdmin>
    );
}

export default AllCategories