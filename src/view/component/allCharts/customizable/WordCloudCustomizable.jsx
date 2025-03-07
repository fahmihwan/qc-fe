import WordCloud from 'react-d3-cloud'

const WordCloudCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width,
    height
}) => {
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    console.log("is data empty word cloud", isDataEmpty)
    console.log("data word cloud", data)

    const fontSizeMapper = (word) => Math.max(Math.log2(word.value) * 10, 12)
    // const rotate = () => (Math.random() > 0.5 ? 0 : 90)

    const rotate = () => 0

    return (
        <div className='w-full'>
            {
                isDataEmpty ? (
                    <div className="flex flex-col h-full justify-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
                ) : (
                    <WordCloud
                        font={"Poppins"}
                        data={data.map(({ text, value }) => ({ text, value }))}
                        width={400}
                        height={400}
                        fontSize={fontSizeMapper}
                        rotate={rotate}
                        padding={5}
                        fill={() => `hsl(${Math.random() * 360}, 100%, 60%)`}
                    />
                )
            }
        </div>
    )
}

export default WordCloudCustomizable