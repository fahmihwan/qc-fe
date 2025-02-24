import { IconAirPasangAbrasiSVG, IconBanjirSVG, IconCuacaEkstremSVG, IconErupsiGunungApiSVG, IconFasyenkesSVG, IconGempaBumiSVG, IconHilangSVG, IconKarhutlaSVG, IconKekeringanSVG, IconLukaSVG, IconMenderitaMengungsiSVG, IconMeninggalSVG, IconRumahIbadatSVG, IconRumahSVG, IconSatuanPendidikanSVG, IconTanahLongsorSVG, IconTsunamiSVG } from "./IconSvg"
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(dateString)
}

const SingleBencana = ({ icon, jlhKejadian, title }) => {
    return (
        <div className="flex flex-row align-middle">
            {icon}
            <span className="text-green-custom text-base mr-[31px] min-w-7 ml-5 text-center">{jlhKejadian}</span>
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
            <span className={`${title === 'Meninggal' || title === 'Hilang' ? 'min-w-[95px]' : ' min-w-[100px]'} text-left text-base dark:text-white`}>{title}</span>
        </div>
    )
}

const TabelBencana = ({ dataBencana, dataSummary, startDate, endDate }) => {
    // console.log("ini dari tabel bencana, data summary", dataSummary)
    // console.log("ini dari tabel bencana, data summary", dataBencana)

    const rusakRingan = dataSummary.rumah_rusak_ringan !== null && dataSummary.rumah_rusak_ringan !== undefined ? parseFloat(dataSummary.rumah_rusak_ringan) : 0
    const rusakSedang = dataSummary.rumah_rusak_sedang !== null && dataSummary.rumah_rusak_sedang !== undefined ? parseFloat(dataSummary.rumah_rusak_sedang) : 0
    const rusakBerat = dataSummary.rumah_rusak_berat !== null && dataSummary.rumah_rusak_berat !== undefined ? parseFloat(dataSummary.rumah_rusak_berat) : 0
    const totalRumahRusak = rusakRingan + rusakSedang + rusakBerat

    const satuanPendidikan = dataSummary.pendidikan_rusak !== null && dataSummary.pendidikan_rusak !== undefined ? parseFloat(dataSummary.pendidikan_rusak) : 0
    const rumahIbadat = dataSummary.peribadatan_rusak !== null && dataSummary.peribadatan_rusak !== undefined ? parseFloat(dataSummary.peribadatan_rusak) : 0
    const fasyankes = dataSummary.kesehatan_rusak !== null && dataSummary.kesehatan_rusak !== undefined ? parseFloat(dataSummary.kesehatan_rusak) : 0
    const totalFasilitasRusak = satuanPendidikan + rumahIbadat + fasyankes

    const allZeroBencana = dataBencana.length < 1
    const allZeroSummary = dataSummary.length < 1

    return (
        <div className='grid grid-cols-3 mb-5 pb-5 '>
            <motion.div 
                className='border rounded-[10px] overflow-ellipsis  grid py-4 px-9 col-span-1 ml-5 sm:mr-5 p-2 justify-center dark:border-dark-border border-light-border'
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: false, amount: 0.7}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="mb-[30px]">
                    <div className='font-bold dark:text-white text-base text-center'>Jumlah Kejadian</div>
                    <div className='font-bold dark:text-white text-base text-center'>per Jenis Bencana</div>
                </div>

                {allZeroBencana ? (
                    <div className="dark:text-gray-400 text-center text-xl mb-[10px]">Data belum tersedia</div>
                ) : (
                    <div className="flex flex-col gap-y-3">
                        <SingleBencana icon={<IconBanjirSVG />} jlhKejadian={dataBencana.banjir || 0} title={"Banjir"} />
                        <SingleBencana icon={<IconCuacaEkstremSVG />} jlhKejadian={dataBencana.angin || 0} title={"Cuaca Ekstrem"} />
                        <SingleBencana icon={<IconTanahLongsorSVG />} jlhKejadian={dataBencana.longsor || 0} title={"Tanah Longsor"} />
                        <SingleBencana icon={<IconKarhutlaSVG />} jlhKejadian={dataBencana.karhutla || 0} title={"Karhutla"} />
                        <SingleBencana icon={<IconAirPasangAbrasiSVG />} jlhKejadian={dataBencana.gpa || 0} title={"Gelombang Pasang dan Abrasi"} />
                        <SingleBencana icon={<IconGempaBumiSVG />} jlhKejadian={dataBencana.gempabumi || 0} title={"Gempa Bumi"} />
                        <SingleBencana icon={<IconKekeringanSVG />} jlhKejadian={dataBencana.kekeringan || 0} title={"Kekeringan"} />
                        <SingleBencana icon={<IconErupsiGunungApiSVG />} jlhKejadian={dataBencana.lga || 0} title={"Erupsi Gunung Api"} />
                        <SingleBencana icon={<IconTsunamiSVG />} jlhKejadian={dataBencana.tsunami || 0} title={"Tsunami"} />
                    </div>
                )}
            </motion.div>

            <div className='flex flex-col col-span-2 gap-4'>
                <motion.div 
                    className=" px-[115px] pt-5 pb-6 border rounded-[10px] ml-2 sm:mr-5 p-2 dark:border-dark-border border-light-border"
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{once: false, amount: 0.7}}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="align-top">
                        <div className="text-center text-base font-bold dark:text-white">Dampak Bencana Alam</div>
                        <div className="text-center text-base dark:text-dark-gray-custom text-light-gray-custom">Periode {formatDate(startDate)} - {formatDate(endDate)}</div>
                    </div>

                    {allZeroSummary ? (
                        <div className="dark:text-gray-400 text-center text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row space-x-[60px] xl:space-x-[120px] mt-5 px-[20px]">
                                <SingleDampakBencana icon={<IconMeninggalSVG />} jlhDampak={dataSummary.meninggal || 0} title={"Meninggal"} />
                                <SingleDampakBencana icon={<IconMenderitaMengungsiSVG />} jlhDampak={dataSummary.menderita_mengungsi || 0} isMenderita={true} title={"Menderita dan Mengungsi"} />
                            </div>

                            <div className="h-[1px] bg-dark-gray-custom mt-[14px]"></div>

                            <div className="flex flex-row space-x-[60px] xl:space-x-[120px] mt-[14px] px-[20px]">
                                <SingleDampakBencana icon={<IconHilangSVG />} jlhDampak={dataSummary.hilang || 0} title={"Hilang"} />
                                <SingleDampakBencana icon={<IconLukaSVG />} jlhDampak={dataSummary.terluka || 0} title={"Luka-luka"} />
                            </div>
                        </div>
                    )}
                </motion.div>

                <motion.div 
                    className="px-[63px] pt-5 pb-6 border rounded-[10px] ml-2 sm:mr-5 p-2 dark:border-dark-border border-light-border"
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{once: false, amount: 0.7}}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="align-top text-center text-base font-bold dark:text-white mb-[13px]">Dampak Kerusakan Bencana</div>

                    {allZeroSummary ? (
                        <div className="dark:text-gray-400 text-center text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="flex flex-row px-6 py-[11px] justify-between border-2 dark:border-white rounded-[10px] mb-[6px]">
                            <span className="font-bold text-base dark:text-white max-w-[70px]">Rumah Rusak</span>

                            <div className="flex flex-row justify-evenly">
                                <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                    <IconRumahSVG color={"#33A02C"}/>
                                    <div className="flex flex-col">
                                        <div className="text-[25px] text-green-custom">{dataSummary.rumah_rusak_ringan || 0}</div>
                                        <div className="text-base dark:text-white -mt-2">Rusak Ringan</div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                    <IconRumahSVG color={"#F4BE37"}/>
                                    <div className="flex flex-col">
                                        <div className="text-[25px] text-green-custom">{dataSummary.rumah_rusak_sedang || 0}</div>
                                        <div className="text-base dark:text-white -mt-2">Rusak Sedang</div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-[8px] mr-[22px] items-center">
                                    <IconRumahSVG color={"#E31A1C"}/>
                                    <div className="flex flex-col">
                                        <div className="text-[25px] text-green-custom">{dataSummary.rumah_rusak_berat || 0}</div>
                                        <div className="text-base dark:text-white -mt-2">Rusak Berat</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="font-bold text-base dark:text-white">Total Rusak</div>
                                <div className="font-bold text-3xl text-green-custom">{totalRumahRusak}</div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-row px-6 py-[11px] justify-between border-2 dark:border-white rounded-[10px]">
                        <span className="font-bold text-base dark:text-white max-w-[70px]">Fasilitas Rusak</span>

                        {allZeroSummary ? (
                            <div className="dark:text-gray-400 text-center text-xl mb-[10px]">Data belum tersedia</div>
                        ) : (
                            <>
                                <div className="flex flex-row justify-evenly items-start">
                                    <div className="flex flex-row gap-[8px] mr-[22px] items-center  max-w-[150px] min-w-[150px]">
                                        <IconSatuanPendidikanSVG className={"min-w-[40px] min-h-[34px] -mt-5"} />
                                        <div className="flex flex-col">
                                            <div className="text-[25px] text-green-custom">{dataSummary.pendidikan_rusak || 0}</div>
                                            <div className="text-base dark:text-white -mt-2">Satuan Pendidikan</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-[8px] mr-[22px] items-center max-w-[150px] min-w-[150px]">
                                        <IconRumahIbadatSVG className={"min-w-[40px] min-h-[34px]"} />
                                        <div className="flex flex-col">
                                            <div className="text-[25px] text-green-custom">{dataSummary.peribadatan_rusak || 0}</div>
                                            <div className="text-base dark:text-white -mt-2">Rumah Ibadat</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-[8px] mr-[22px] items-center max-w-[150px] min-w-[150px]">
                                        <IconFasyenkesSVG className={"min-w-[40px] min-h-[34px]"} />
                                        <div className="flex flex-col">
                                            <div className="text-[25px] text-green-custom">{dataSummary.kesehatan_rusak || 0}</div>
                                            <div className="text-base dark:text-white -mt-2">Fasyankes</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="font-bold text-base dark:text-white">Total Rusak</div>
                                    <div className="font-bold text-3xl text-green-custom">{totalFasilitasRusak}</div>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default TabelBencana