import { IconAirPasangAbrasiSVG, IconBanjirSVG, IconCuacaEkstremSVG, IconErupsiGunungApiSVG, IconFasyenkesSVG, IconGempaBumiSVG, IconHilangSVG, IconKarhutlaSVG, IconKekeringanSVG, IconLukaSVG, IconMenderitaMengungsiSVG, IconMeninggalSVG, IconRumahIbadatSVG, IconRumahSVG, IconSatuanPendidikanSVG, IconTanahLongsorSVG, IconTsunamiSVG } from "./IconSvg"

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(date)
}

const SingleBencana = ({ icon, jlhKejadian, title }) => {
    return (
        <div className="flex flex-row align-middle">
            {icon}
            <span className="text-green-custom text-base mr-[31px] ml-5">{jlhKejadian}</span>
            <span className="dark:text-white text-base">{title}</span>
        </div>
    )
}

const SingleDampakBencana = ({ icon, jlhDampak, title, isMenderita }) => {
    return (
        <div className="flex flex-row items-center space-x-[25px]">
            <div className="w-[40px] items-center align-middle">
                {icon}
            </div>
            <span className="font-bold text-base text-left text-green-custom  min-w-[40px]">{jlhDampak}</span>
            <span className={`${title === 'Meninggal' || title === 'Hilang' ? 'min-w-[95px]' : ' min-w-[90px]'} text-left text-base dark:text-white`}>{title}</span>
        </div>
    )
}

const TabelBencana = ({ dataBencana }) => {
    return (
        <div className='border-t-[1px] flex flex-row dark:border-white'>
            <div className='border-r-[1px] min-w-[369px] py-4 px-9'>
                <div className="mb-[30px]">
                    <div className='font-bold dark:text-white text-base text-center'>Jumlah Kejadian</div>
                    <div className='font-bold dark:text-white text-base text-center'>per Jenis Bencana</div>
                </div>

                <div className="flex flex-col gap-y-3">
                    <SingleBencana icon={<IconBanjirSVG />} jlhKejadian={dataBencana.jlhKejadianBanjir} title={"Banjir"} />
                    <SingleBencana icon={<IconCuacaEkstremSVG />} jlhKejadian={dataBencana.jlhKejadianCuacaEkstrem} title={"Cuaca Ekstrem"} />
                    <SingleBencana icon={<IconTanahLongsorSVG />} jlhKejadian={dataBencana.jlhKejadianTanahLongsor} title={"Tanah Longsor"} />
                    <SingleBencana icon={<IconKarhutlaSVG />} jlhKejadian={dataBencana.jlhKejadianKarhutla} title={"Karhutla"} />
                    <SingleBencana icon={<IconAirPasangAbrasiSVG />} jlhKejadian={dataBencana.JlhKejadianAirPasangAbrasi} title={"Gelombang Pasang dan Abrasi"} />
                    <SingleBencana icon={<IconGempaBumiSVG />} jlhKejadian={dataBencana.jlhKejadianGempa} title={"Gempa Bumi"} />
                    <SingleBencana icon={<IconKekeringanSVG />} jlhKejadian={dataBencana.jlhKejadianKekeringan} title={"Kekeringan"} />
                    <SingleBencana icon={<IconErupsiGunungApiSVG />} jlhKejadian={dataBencana.jlhKejadianErupsiGunungApi} title={"Erupsi Gunung Api"} />
                    <SingleBencana icon={<IconTsunamiSVG />} jlhKejadian={dataBencana.jlhKejadianTsunami} title={"Tsunami"} />
                </div>
            </div>

            <div className='flex flex-col border-r-[1px]'>
                <div className="px-[115px] pt-5 pb-6">
                    <div className="align-top">
                        <div className="text-center text-base font-bold dark:text-white">Dampak Bencana Alam</div>
                        <div className="text-center text-base dark:text-dark-gray-custom text-light-gray-custom">Periode {formatDate(dataBencana.startDate)} - {formatDate(dataBencana.endDate)}</div>
                    </div>

                    <div className="flex flex-col justify-start">
                        <div className="flex flex-row px-58 space-x-[80px] mt-5 px-[59px]">
                            <SingleDampakBencana icon={<IconMeninggalSVG />} jlhDampak={dataBencana.semuaKategori.dampakPadaManusia.meninggal} title={"Meninggal"} />
                            <SingleDampakBencana icon={<IconMenderitaMengungsiSVG />} jlhDampak={dataBencana.semuaKategori.dampakPadaManusia.menderitaMengungsi} isMenderita={true} title={"Menderita dan Mengungsi"} />
                        </div>

                        <div className="h-[1px] bg-dark-gray-custom mt-[14px]"></div>

                        <div className="flex flex-row px-58 space-x-[80px] mt-[14px] px-[59px]">
                            <SingleDampakBencana icon={<IconHilangSVG />} jlhDampak={dataBencana.semuaKategori.dampakPadaManusia.hilang} title={"Hilang"} />
                            <SingleDampakBencana icon={<IconLukaSVG />} jlhDampak={dataBencana.semuaKategori.dampakPadaManusia.luka} title={"Luka-luka"} />
                        </div>
                    </div>
                </div>

                <div className="px-[63px] pt-5 pb-6 border-t-[1px] border-white">
                    <div className="align-top text-center text-base font-bold dark:text-white mb-[13px]">Dampak Kerusakan Bencana</div>

                    <div className="flex flex-row px-6 py-[11px] justify-between border-2 dark:border-white rounded-[10px] mb-[6px]">
                        <span className="font-bold text-base dark:text-white max-w-[70px]">Rumah Rusak</span>

                        <div className="flex flex-row justify-evenly">
                            <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                <IconRumahSVG color={"#33A02C"}/>
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.rumahRusak.rusakRingan}</div>
                                    <div className="text-base dark:text-white -mt-2">Rusak Ringan</div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                <IconRumahSVG color={"#F4BE37"}/>
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.rumahRusak.rusakSedang}</div>
                                    <div className="text-base dark:text-white -mt-2">Rusak Sedang</div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                <IconRumahSVG color={"#E31A1C"}/>
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.rumahRusak.rusakBerat}</div>
                                    <div className="text-base dark:text-white -mt-2">Rusak Berat</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="font-bold text-base dark:text-white">Total Rusak</div>
                            <div className="font-bold text-3xl dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.rumahRusak.totalRusak}</div>
                        </div>
                    </div>

                    <div className="flex flex-row px-6 py-[11px] justify-between border-2 dark:border-white rounded-[10px]">
                        <span className="font-bold text-base dark:text-white max-w-[70px]">Fasilitas Rusak</span>

                        <div className="flex flex-row justify-evenly items-start">
                            <div className="flex flex-row gap-[8px] mr-[22px] items-center  max-w-[150px] min-w-[150px]">
                                <IconSatuanPendidikanSVG className={"min-w-[40px] min-h-[34px] -mt-5"} />
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.fasilitasRusak.satuanPendidikan}</div>
                                    <div className="text-base dark:text-white -mt-2">Satuan Pendidikan</div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[8px] mr-[22px] items-center max-w-[150px] min-w-[150px]">
                                <IconRumahIbadatSVG className={"min-w-[40px] min-h-[34px]"} />
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.fasilitasRusak.rumahIbadat}</div>
                                    <div className="text-base dark:text-white -mt-2">Rumah Ibadat</div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-[8px] mr-[22px] items-center max-w-[150px] min-w-[150px]">
                                <IconFasyenkesSVG className={"min-w-[40px] min-h-[34px]"} />
                                <div className="flex flex-col">
                                    <div className="text-[25px] dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.fasilitasRusak.fasyenkes}</div>
                                    <div className="text-base dark:text-white -mt-2">Fasyankes</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="font-bold text-base dark:text-white">Total Rusak</div>
                            <div className="font-bold text-3xl dark:text-white">{dataBencana.semuaKategori.dampakKerusakan.fasilitasRusak.totalRusak}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabelBencana