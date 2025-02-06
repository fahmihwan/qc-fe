import { IconAirPasangAbrasiSVG, IconBanjirSVG, IconCuacaEkstremSVG, IconErupsiGunungApiSVG, IconGempaBumiSVG, IconKarhutlaSVG, IconKekeringanSVG, IconMeninggalSVG, IconTanahLongsorSVG, IconTsunamiSVG } from "./IconSvg"

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date)
}

const SingleBencana = ({icon, jlhKejadian, title}) => {
    return (
        <div className="flex flex-row align-middle">
            {icon}
            <span className="text-green-custom text-base mr-[31px] ml-5">{jlhKejadian}</span>
            <span className="dark:text-white text-base">{title}</span>
        </div>
    )
}

const SingleDampakBencana = ({icon, jlhDampak, title}) => {
    return (
        <div className="flex flex-row space-x-[25px]">
            {icon}
            <span className="font-bold text-base text-green-custom">{jlhDampak}</span>
            <span className="text-base font-bold dark:text-white">{title}</span>
        </div>
    )
}

const TabelBencana = ({dataBencana}) => {
    return (
        <div className='h-[448px] border-t-[1px] flex flex-row dark:border-white'>
            <div className='border-r-[1px] w-2/5 h-full py-4 px-9'>
                <div className="mb-[30px]">
                    <div className='font-bold dark:text-white text-base text-center'>Jumlah Kejadian</div>
                    <div className='font-bold dark:text-white text-base text-center'>per Jenis Bencana</div>
                </div>
                
                <div className="flex flex-col gap-y-3">
                    <SingleBencana icon={<IconBanjirSVG/>} jlhKejadian={dataBencana.jlhKejadianBanjir} title={"Banjir"}/>
                    <SingleBencana icon={<IconCuacaEkstremSVG/>} jlhKejadian={dataBencana.jlhKejadianCuacaEkstrem} title={"Cuaca Ekstrem"}/>
                    <SingleBencana icon={<IconTanahLongsorSVG/>} jlhKejadian={dataBencana.jlhKejadianTanahLongsor} title={"Tanah Longsor"}/>
                    <SingleBencana icon={<IconKarhutlaSVG/>} jlhKejadian={dataBencana.jlhKejadianKarhutla} title={"Karhutla"}/>
                    <SingleBencana icon={<IconAirPasangAbrasiSVG/>} jlhKejadian={dataBencana.JlhKejadianAirPasangAbrasi} title={"Gelombang Pasang dan Abrasi"}/>
                    <SingleBencana icon={<IconGempaBumiSVG/>} jlhKejadian={dataBencana.jlhKejadianGempa} title={"Gempa Bumi"}/>
                    <SingleBencana icon={<IconKekeringanSVG/>} jlhKejadian={dataBencana.jlhKejadianKekeringan} title={"Kekeringan"}/>
                    <SingleBencana icon={<IconErupsiGunungApiSVG/>} jlhKejadian={dataBencana.jlhKejadianErupsiGunungApi} title={"Erupsi Gunung Api"}/>
                    <SingleBencana icon={<IconTsunamiSVG/>} jlhKejadian={dataBencana.jlhKejadianTsunami} title={"Tsunami"}/>
                </div>
            </div>

            <div className='flex flex-col w-full justify-between border-r-[1px]'>
                <div className="px-[63px] pt-5 pb-6">
                    <div className="align-top">
                        <div className="text-center text-base font-bold dark:text-white">Dampak Bencana Alam</div>
                        <div className="text-center text-base dark:text-dark-gray-custom text-light-gray-custom">Periode {formatDate(dataBencana.startDate)} - {formatDate(dataBencana.endDate)}</div>
                    </div>
                </div>
                <div className="px-[63px] pt-5 pb-6">
                    <div className="align-top">
                        <span className="text-center text-base font-bold dark:text-white">Dampak Bencana Alam</span>
                        <span className="text-center text-base dark:text-dark-gray-custom text-light-gray-custom">Periode {formatDate(dataBencana.startDate)} - {formatDate(dataBencana.endDate)}</span>
                    </div>
                    <div className="align-middle px-58 space-x-[100px]">
                        <span className="text-white">dataBencana.semuaKategori.dampakPadaManusia.meninggal</span>
                        <SingleDampakBencana icon={<IconMeninggalSVG/>} jlhDampak={dataBencana.semuaKategori.dampakPadaManusia.meninggal} title={"test"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabelBencana