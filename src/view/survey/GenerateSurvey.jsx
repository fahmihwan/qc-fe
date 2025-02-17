import { useState } from "react"
import LayoutAdmin from "../layout/LayoutAdmin"
import DropdownCustomV2 from "../component/miniComponent/DropdownCustomV2"

const GenerateSurvey = () => {
    const categories = {
        'Food Estate': {
            subCategories: ['Padi', 'Jagung', 'Kedelai', 'Tebu', 'Singkong', 'Batas Hutan'],
            topics: {
                'Padi': [
                    { id: '1', name: 'Statistik Luas Lahan' },
                    { id: '2', name: 'Statistik Produktivitas' },
                    { id: '3', name: 'Statistik Produksi' },
                    { id: '4', name: 'Statistik Luas Irigasi' },
                    { id: '5', name: 'Statistik Jumlah Pupuk' },
                    { id: '6', name: 'Statistik Persentase Hama' },
                    { id: '7', name: 'Statistik Lahan Kosong' },
                    { id: '8', name: 'Ketersediaan Komoditas' },
                    { id: '9', name: 'Realisasi Pembangunan Lahan untuk Produksi' },
                    { id: '10', name: 'Realisasi Distribusi Pangan ke Penduduk Sekitar' },
                    { id: '11', name: 'Efektivitas Program Bantuan Pangan' },
                    { id: '12', name: 'Perubahan Pola Konsumsi Masyarakat' },
                    { id: '13', name: 'Keberlanjutan Produksi Pangan' },
                ],
                'Jagung': [
                    { id: '1', name: 'Statistik Luas Lahan' },
                    { id: '2', name: 'Statistik Produktivitas' },
                    { id: '3', name: 'Statistik Produksi' },
                    { id: '4', name: 'Statistik Luas Irigasi' },
                    { id: '5', name: 'Statistik Jumlah Pupuk' },
                    { id: '6', name: 'Statistik Persentase Hama' },
                    { id: '7', name: 'Statistik Lahan Kosong' },
                    { id: '8', name: 'Ketersediaan Komoditas' },
                    { id: '9', name: 'Realisasi Pembangunan Lahan untuk Produksi' },
                    { id: '10', name: 'Realisasi Distribusi Pangan ke Penduduk Sekitar' },
                    { id: '11', name: 'Efektivitas Program Bantuan Pangan' },
                    { id: '12', name: 'Perubahan Pola Konsumsi Masyarakat' },
                    { id: '13', name: 'Keberlanjutan Produksi Pangan' },
                ],
                'Kedelai': [
                    { id: '1', name: 'Statistik Luas Lahan' },
                    { id: '2', name: 'Statistik Produktivitas' },
                    { id: '3', name: 'Statistik Produksi' },
                    { id: '4', name: 'Statistik Luas Irigasi' },
                    { id: '5', name: 'Statistik Jumlah Pupuk' },
                    { id: '6', name: 'Statistik Persentase Hama' },
                    { id: '7', name: 'Statistik Lahan Kosong' },
                    { id: '8', name: 'Ketersediaan Komoditas' },
                    { id: '9', name: 'Realisasi Pembangunan Lahan untuk Produksi' },
                    { id: '10', name: 'Realisasi Distribusi Pangan ke Penduduk Sekitar' },
                    { id: '11', name: 'Efektivitas Program Bantuan Pangan' },
                    { id: '12', name: 'Perubahan Pola Konsumsi Masyarakat' },
                    { id: '13', name: 'Keberlanjutan Produksi Pangan' },
                ],
                'Tebu': [
                    { id: '1', name: 'Statistik Luas Lahan' },
                    { id: '2', name: 'Statistik Produktivitas' },
                    { id: '3', name: 'Statistik Produksi' },
                    { id: '4', name: 'Statistik Luas Irigasi' },
                    { id: '5', name: 'Statistik Jumlah Pupuk' },
                    { id: '6', name: 'Statistik Persentase Hama' },
                    { id: '7', name: 'Statistik Lahan Kosong' },
                    { id: '8', name: 'Ketersediaan Komoditas' },
                    { id: '9', name: 'Realisasi Pembangunan Lahan untuk Produksi' },
                    { id: '10', name: 'Realisasi Distribusi Pangan ke Penduduk Sekitar' },
                    { id: '11', name: 'Efektivitas Program Bantuan Pangan' },
                    { id: '12', name: 'Perubahan Pola Konsumsi Masyarakat' },
                    { id: '13', name: 'Keberlanjutan Produksi Pangan' },
                ],
                'Singkong': [
                    { id: '1', name: 'Statistik Luas Lahan' },
                    { id: '2', name: 'Statistik Produktivitas' },
                    { id: '3', name: 'Statistik Produksi' },
                    { id: '4', name: 'Statistik Luas Irigasi' },
                    { id: '5', name: 'Statistik Jumlah Pupuk' },
                    { id: '6', name: 'Statistik Persentase Hama' },
                    { id: '7', name: 'Statistik Lahan Kosong' },
                    { id: '8', name: 'Ketersediaan Komoditas' },
                    { id: '9', name: 'Realisasi Pembangunan Lahan untuk Produksi' },
                    { id: '10', name: 'Realisasi Distribusi Pangan ke Penduduk Sekitar' },
                    { id: '11', name: 'Efektivitas Program Bantuan Pangan' },
                    { id: '12', name: 'Perubahan Pola Konsumsi Masyarakat' },
                    { id: '13', name: 'Keberlanjutan Produksi Pangan' },
                ],
                'Batas Hutan': [
                    { id: '14', name: 'Pemanfaatan Lahan di Sekitar Batas Hutan' },
                    { id: '15', name: 'Potensi Konflik di Sekitar Batas Hutan' },
                    { id: '16', name: 'Pelestarian dan Keberlanjutan Batas Hutan' },
                ]
            }
        }
    }

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
        setSelectedSubCategory('')
        setSelectedTopic('')
    }
    
    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory)
        setSelectedTopic('')
    }

    let subCategories = selectedCategory ? categories[selectedCategory].subCategories : [];
    let topics = selectedSubCategory ? categories[selectedCategory].topics[selectedSubCategory] : [];

    return (
        <LayoutAdmin>
            <div className="w-full">
                <div className="overflow-hidden flex flex-col border dark:border-dark-border border-light-border rounded-[10px] mx-5 my-5 px-5 py-5 justify-center dark:bg-dark-mode-bg">
                    <div className="dark:text-white text-2xl font-bold text-center items-center">DASHBOARD 360</div>
                    <div className="dark:text-white text-2xl font-bold text-center items-center">SURVEY MASYARAKAT</div>
                </div>
            </div>

            <div className="w-full px-20 py-20 min-h-[calc(100vh-69px)] bg-[url('/assets/img/background.png')] bg-contain">
                <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:lg:grid-cols-2 justify-between">
                    <div className="col-span-1">
                        <div className="font-bold dark:text-white text-[32px]">
                            Pilih Kategori, Sub Kategori & Topik Untuk Mengisi Survey
                        </div>
                        <div className=" mt-[30px]">
                            <div className="grid grid-cols-3 items-center justify-center">
                                <div className="col-span-1 -mt-4 text-gray-900 dark:text-white text-sm text-left">
                                    Kategori Survey
                                </div>
                                <div className="col-span-2">
                                    <DropdownCustomV2 
                                        title={"Pilih Kategori Survey"}
                                        listDropDown={Object.keys(categories)} 
                                        selectedItem={selectedCategory} 
                                        setSelectedItem={handleCategoryChange} 
                                    />
                                </div>
                            </div>


                            {selectedCategory &&
                                <div className="grid grid-cols-3 items-center justify-between">
                                    <div className="col-span-1 -mt-4 dark:text-white text-sm text-left">
                                        Sub Kategori Survey
                                    </div>
                                    <div className="col-span-2">
                                        <DropdownCustomV2 
                                            title={"Pilih Sub Kategori Survey"}
                                            listDropDown={subCategories} 
                                            selectedItem={selectedSubCategory} 
                                            setSelectedItem={handleSubCategoryChange} 
                                        />
                                    </div>
                                </div>
                            }


                            {selectedSubCategory &&
                                <div className="grid grid-cols-3 items-center justify-between">
                                    <div className="col-span-1 -mt-4 dark:text-white text-sm text-left">
                                        Topik Survey
                                    </div>
                                    <div className="col-span-2">
                                        <DropdownCustomV2 
                                            title={"Pilih Topik Survey"}
                                            listDropDown={topics.map(topic => topic.name)} 
                                            selectedItem={selectedTopic} 
                                            setSelectedItem={setSelectedTopic} 
                                        />
                                    </div>
                                </div>
                            }

                            {selectedTopic &&
                                <div className="grid grid-cols-3 items-center justify-between">
                                    <div className="col-span-1 -mt-4 dark:text-white text-sm text-left"></div>
                                    <div className="col-span-2">
                                    <button
                                        onClick={() => {}}
                                        className="text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[30px] py-4 text-center inline-flex items-center dark:focus:ring-blue-800"
                                        type="button"
                                    >
                                        <div className="items-center text-center text-sm w-[324px]">
                                            Tampilkan pertanyaan & QR code
                                        </div>
                                    </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </LayoutAdmin>
    );
};

export default GenerateSurvey;