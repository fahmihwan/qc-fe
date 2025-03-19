import BarChartTumpukCustomizeable from "../component/allCharts/BarChartTumpukCustomizeable"
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import PieChartPercentageCustomizable from "../component/allCharts/customizable/PieChartPercentageCustomizable";
import CountDoughnutChartPercentageCustomizable from "../component/allCharts/customizable/CountDoughnutChartPercentageCustomizable";

const OtherDashboardSurvey = () => {
    const dummyData = {
        "data": [
            {
                "year": 2020,
                "data": {
                    "Sawah Irigasi Teknis": 122,
                    "Sawah Tadah Hujan": 34,
                    "Lahan Rawa / Pasang Surut": 32,
                    "Lahan Kering / Tegalan": 24,
                    "Lainnya": 23
                }
            },
            {
                "year": 2021,
                "data": {
                    "Sawah Irigasi Teknis": 132,
                    "Sawah Tadah Hujan": 90,
                    "Lahan Rawa / Pasang Surut": 39,
                    "Lahan Kering / Tegalan": 9,
                    "Lainnya": 3
                }
            },
            {
                "year": 2022,
                "data": {
                    "Sawah Irigasi Teknis": 122,
                    "Sawah Tadah Hujan": 34,
                    "Lahan Rawa / Pasang Surut": 32,
                    "Lahan Kering / Tegalan": 24,
                    "Lainnya": 23
                }
            },
            {
                "year": 2023,
                "data": {
                    "Sawah Irigasi Teknis": 132,
                    "Sawah Tadah Hujan": 90,
                    "Lahan Rawa / Pasang Surut": 39,
                    "Lahan Kering / Tegalan": 9,
                    "Lainnya": 3
                }
            },
            {
                "year": 2024,
                "data": {
                    "Sawah Irigasi Teknis": 122,
                    "Sawah Tadah Hujan": 34,
                    "Lahan Rawa / Pasang Surut": 32,
                    "Lahan Kering / Tegalan": 24,
                    "Lainnya": 23
                }
            }
        ]
    }

    const labels = dummyData.data ? dummyData.data.map(item => item.year) : []
    console.log("ini labels", labels)

    //ini sesuaikan dengan key pada dummyData.data[0].data
    const labelsMauDitumpuk = ["Sawah Irigasi Teknis", "Sawah Tadah Hujan", "Lahan Rawa / Pasang Surut", "Lahan Kering / Tegalan", "Lainnya"]
    const colors = [
        'rgba(0, 177, 0, 1)', 
        'rgba(0, 168, 255, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(251, 93, 37, 1)',
        'rgba(255, 0, 0, 1)'
    ]

    const datasets = labelsMauDitumpuk.map((labelTumpuk, index) => ({
        label: labelTumpuk,
        data: dummyData.data ? dummyData.data.map(item => item.data[labelTumpuk]) : [],
        backgroundColor: colors[index],
        borderWidth: 0
    }))

    console.log("ini datasets", datasets)

    const chartDummyData = {labels, datasets: datasets}
    console.log("ini chartDummyData", chartDummyData)

    const legendItems = labelsMauDitumpuk.map((item, index) => ({
        label: item,
        color: colors[index] || 'rgba(192, 192, 192, 1)'
    }))
    
    return (
        <motion.div 
            className='mt-5 ml-5 w-fit border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once: true, amount: 0.5}}
        >
            <BarChartTumpukCustomizeable 
                data={chartDummyData} 
                title={"Test 123"} 
                legendItems={legendItems}
                width={"800px"}
            />

            <PieChartPercentageCustomizable
                data={{
                    "Ya": 3184,
                    "Tidak": 1298
                }}
                colors={[
                    "rgba(0, 177, 0, 1)",
                    "rgba(251, 93, 37, 1)"
                ]}
                labels={["Ya", "Tidak"]}
            />

            <CountDoughnutChartPercentageCustomizable
                data={{
                    "Ya": 3184,
                    "Tidak": 1298
                }}
                colors={[
                    "rgba(0, 177, 0, 1)",
                    "rgba(251, 93, 37, 1)"
                ]}
                labels={["Ya", "Tidak"]}
            />
        </motion.div>
    )
}

export default OtherDashboardSurvey