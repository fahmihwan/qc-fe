import React, { useEffect, useRef, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Modal } from "flowbite-react";
import { getDropdownNamakategori, getDropdownSubkatgeori, getDropdownTopik } from '../../api/otherApi';
import CreatableSelect from 'react-select/creatable';
import QRCode from 'react-qr-code';
import { getAllQrcode, storeQRcode } from '../../api/qrcode';
import { InputReactSelectEl } from '../component/InputCompt';

const QRcode = () => {
    const [openModal, setOpenModal] = useState(false);

    const [listQrcode, setListQrcode] = useState([])




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


    const fetchQRcode = async (params) => {
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

    }, [openModal])




    useEffect(() => {



        // console.log(selectedKategori?.value != '' && listKategori.length != 0);
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
        })
        setOpenModal(false)
    }

    // buat button submit 
    return (
        <LayoutAdmin>
            <div className='p-10'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl text-white mb-5 font-bold'>QRcode Survey</h1>
                    <Button onClick={() => setOpenModal(true)}>Buat QRcode</Button>
                </div>


                <div className=''>
                    <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {listQrcode?.map((d, i) => (
                            <CardQRcodeEl
                                key={i}
                                namaKategori={d.nama_kategori}
                                kodeQr={d.kode_qr}
                                namaSubKategori={d.nama_sub_kategori}
                                topik={d.topik}
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

            {/* <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={null}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create QRcode</h3>

                        <div className='w-full mb-3'>
                         
                        </div>
                        <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}
        </LayoutAdmin>
    )
}

export default QRcode


const CardQRcodeEl = ({

    namaKategori,
    namaSubKategori,
    kodeQr,
    topik
}) => {



    const link = `${window.location.host}/survey-masyarakat?kodeqr=${kodeQr}`

    return (
        <div className="bg-[#E7E7E780] rounded-xl p-4 ">
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