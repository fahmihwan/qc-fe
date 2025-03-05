const LineChartBarChartCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width,
    height
}) => {
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    return (
        <div className="flex flex-col">
            {
                isDataEmpty ? (
                    <div className="flex flex-col h-full justify-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
                ) : (
                    <div>LineChartBarChartCustomizable</div>
                )
            }
        </div>
    )
}

export default LineChartBarChartCustomizable