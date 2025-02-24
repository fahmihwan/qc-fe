import React, { useEffect, useRef, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Modal } from "flowbite-react";
import { getDropdownNamakategori, getDropdownSubkatgeori, getDropdownTopik } from '../../api/otherApi';
import CreatableSelect from 'react-select/creatable';
import QRCode from 'react-qr-code';
import { deleteQrcode, getAllQrcode, storeQRcode } from '../../api/qrcode';
import { InputReactSelectEl } from '../component/InputCompt';
// import SidebarProvider from '../../context/SidebarContext'

const QRcode = () => {
    const [openModal, setOpenModal] = useState(false);

    const [listQrcode, setListQrcode] = useState([])
    const [selectedQR, setSelectedQR] = useState(null)



    const [listKategori, setListKategori] = useState([]);
    const [listSubKategori, setListSubKategori] = useState([]);
    const [listTopik, setListTopik] = useState([]);


    const [selectedKategori, setSelectedKategori] = useState({ value: 0, label: '' })
    const [selectedSubKategori, setSelectedSubKategori] = useState({ value: 0, label: '' })
    const [selectedTopik, setSelectedTopik] = useState({ value: 0, label: '' })


    // flow
    // 1. isi kategori survey
    // 2. isi sub kategori survey
    // 3. cek apakah topik ada di db berdasarkan id sub_kategori
    // jika tidak ada jan tampilkan 
    // jika ada tampilkan


    const fetchQRcode = async () => {
        // getAllQrcode().then((res)=> console.log(res))
        try {
            const response = await getAllQrcode()
            setListQrcode(response.data);
            // const response = await apiClient.get(`/qrcodes`)
            // return response.data 
        } catch (error) {
            console.error("error fetching data: ", error)
            throw error
        }
    }

    useEffect(() => {
        fetchQRcode()
    }, [])

    useEffect(() => {
        if (openModal == false) {
            setListKategori([])
            setListSubKategori([])
            setListTopik([])

            setSelectedKategori({ value: 0, label: '' })
            setSelectedSubKategori({ value: 0, label: '' })
            setSelectedTopik({ value: 0, label: '' })
        } else {
            getDropdownNamakategori().then((res) => {
                console.log(res.data);
                setListKategori(res.data)
            })
        }
        setSelectedQR(null)

    }, [openModal])




    useEffect(() => {

        if (selectedKategori?.value != 0) {
            getDropdownSubkatgeori(selectedKategori?.value).then((res) => {
                setListSubKategori(res.data)
            })
        }
        if (selectedSubKategori?.value != 0) {
            getDropdownTopik(selectedSubKategori?.value).then((res) => {
                setListTopik(res.data)
            })
        }
    }, [selectedKategori, selectedSubKategori])



    const handleSubmit = async () => {
        await storeQRcode({
            user_id: 1,
            topik_id: selectedTopik?.value
        }).then((res) => fetchQRcode())
        setOpenModal(false)
    }

    const handleDelete = async () => {

        let isConfirm = confirm("apakah anda yakin ingin menghapus?")
        if (isConfirm) {
            await deleteQrcode(selectedQR).then((res) => {
                fetchQRcode()
            })
        }
    }

    // buat button submit 
    return (

        <>
            <div className='p-10'>
                <div className='flex justify-between items-center mb-5'>
                    <h1 className='text-3xl text-white  font-bold'>QRcode Survey</h1>
                    <div className='flex items-center justify-between '>

                        {
                            selectedQR != null && (
                                <>
                                    <button
                                        onClick={() => handleDelete()}
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Delete
                                    </button>
                                    {/* <button
                                        type="button"
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-5 dark:focus:ring-yellow-900"
                                    >
                                        Yellow
                                    </button> */}
                                </>
                            )
                        }

                        <Button onClick={() => setOpenModal(true)}>Buat QRcode</Button>


                    </div>

                </div>


                <div className=''>
                    <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listQrcode?.map((d, i) => (
                            <CardQRcodeEl
                                key={i}
                                id={d?.id}
                                namaKategori={d.nama_kategori}
                                kodeQr={d.kode_qr}
                                namaSubKategori={d.nama_sub_kategori}
                                topik={d.topik}
                                selectedQR={selectedQR}
                                // setSelectedQR={setSelectedQR}
                                handleChange={() => {
                                    setSelectedQR(d.kode_qr)
                                }}
                            />
                        ))}

                        {/* const host = window.location.host; */}
                    </div>
                </div>

            </div>
            <CreateQRcode openModal={openModal} setOpenModal={setOpenModal}
                setSelectedKategori={setSelectedKategori}
                selectedKategori={selectedKategori}
                listKategori={listKategori}
                setSelectedSubKategori={setSelectedSubKategori}
                selectedSubKategori={selectedSubKategori}
                listSubKategori={listSubKategori}
                setSelectedTopik={setSelectedTopik}
                selectedTopik={selectedTopik}
                listTopik={listTopik}

                handleSubmit={handleSubmit}
            />

        </>
    )
}

export default QRcode


const CardQRcodeEl = ({
    // id,
    namaKategori,
    namaSubKategori,
    kodeQr,
    topik,
    selectedQR,
    handleChange
}) => {




    const link = `${window.location.origin}/survey-masyarakat?kodeqr=${kodeQr}`

    return (
        <div
            onClick={(e) => handleChange(e)}
            className={` rounded-xl p-4  cursor-pointer box-border ${selectedQR == kodeQr ? " border-4 bg-[#91919180] border-yellow-200 " : "bg-[#E7E7E780]"} `}>
            <div className="w-full flex">
                <div className='w-6/12 bg-white p-2 rounded-lg'>
                    <QRCode
                        // size={256}
                        style={{ height: "100%", width: "100%" }}
                        value={link}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='w-6/12 pl-4 text-black text-sm'>
                    <div>
                        <div className='mb-2'>
                            <b>Topik</b> <br />
                            <p>{topik}</p>
                        </div>
                        <div className='mb-2'>
                            <b>Kategori</b> <br />
                            <p>{namaKategori}</p>
                        </div>
                        <div className='mb-2'>
                            <b>Sub Kategori</b> <br />
                            <p>{namaSubKategori}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const CreateQRcode = ({ openModal, setOpenModal,
    setSelectedKategori,
    selectedKategori,
    listKategori,
    setSelectedSubKategori,
    selectedSubKategori,
    listSubKategori,
    setSelectedTopik,
    selectedTopik,
    listTopik,
    handleSubmit

}) => {

    // const refKategori = useRef(null);
    // const refSubKategori = useRef(null);
    // const refTopik = useRef(null);

    // console.log(refKategori);

    return (
        <Modal show={openModal}
            position={"center"}
            size="2xl" popup onClose={() => setOpenModal(false)} initialFocus={null}

        >
            <Modal.Header>
                <div className='p-5 text-white text-2xl font-bold '>
                    Buat QRcode
                </div>

            </Modal.Header>

            <Modal.Body className=''>
                <div className='w-full h-[500px] '>
                    <div className='w-full py-5  '>

                        <div className='mb-5'>

                            <InputReactSelectEl
                                handleChange={(e) => {
                                    console.log(e?.value != selectedKategori);
                                    if (e?.value != selectedKategori) {
                                        setSelectedSubKategori({ value: 0, label: '' })
                                        setSelectedTopik({ value: 0, label: '' })
                                    }
                                    setSelectedKategori({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })

                                }}
                                value={selectedKategori.value != 0 ? selectedKategori : ''}
                                placeholder={"Kategori Survey"}
                                options={listKategori}
                            />
                        </div>


                        {listSubKategori.length != 0 && (
                            <div className='mb-5'>
                                <InputReactSelectEl
                                    handleChange={(e) => {
                                        if (e?.value != selectedSubKategori) {
                                            setSelectedTopik({ value: 0, label: '' })
                                        }
                                        setSelectedSubKategori({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })
                                    }}
                                    value={selectedSubKategori.value != 0 ? selectedSubKategori : ''}
                                    placeholder={"Sub Kategori Survey"}
                                    isClearable options={listSubKategori}
                                />

                            </div>
                        )}




                        {
                            listTopik.length != 0 && (
                                <>
                                    <div>
                                        <InputReactSelectEl
                                            handleChange={(e) => setSelectedTopik({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                            value={selectedTopik.value != 0 ? selectedTopik : ''}
                                            placeholder={"Topik"}
                                            isClearable options={listTopik}
                                        />
                                    </div>
                                </>
                            )
                        }

                        {
                            selectedTopik?.value != 0 && (
                                <button
                                    onClick={() => handleSubmit()}
                                    type="button"
                                    className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Submit
                                </button>
                            )
                        }

                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )

}