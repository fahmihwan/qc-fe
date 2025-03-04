const LineChartBarChartCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width,
    height
}) => {
    const isDataEmpty = !data || data.length < 1

    return (
        <div className="flex flex-col h-full">
            {
                isDataEmpty ? (
                    <div className="flex flex-col">
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    </div>
                ) : (
                    <div>LineChartBarChartCustomizable</div>
                )
            }
        </div>
    )
}

export default LineChartBarChartCustomizable