import React, { useEffect, useRef, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Checkbox, Modal } from "flowbite-react";
import { getDropdownNamakategori, getDropdownSubkatgeori, getDropdownTopik } from '../../api/otherApi';
import CreatableSelect from 'react-select/creatable';
import QRCode from 'react-qr-code';
import { deleteQrcode, getAllQrcode, storeQRcode } from '../../api/qrcode';
import { InputReactSelectEl } from '../component/InputCompt';
// import SidebarProvider from '../../context/SidebarContext'

const QRcode = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalQRcode, setOpenModalQRcode] = useState(false);

    const [listQrcode, setListQrcode] = useState([])
    const [selectedQR, setSelectedQR] = useState(null)

    const [listFilterKategori, setListFilterKategori] = useState([]);
    const [listFilterSubKategori, setListFilterSubKategori] = useState([]);
    const [listFilterTopik, setListFilterTopik] = useState([]);






    const [listKategori, setListKategori] = useState([]);
    const [listSubKategori, setListSubKategori] = useState([]);
    const [listTopik, setListTopik] = useState([]);


    const [selectedKategori, setSelectedKategori] = useState({ value: 0, label: '' })
    const [selectedSubKategori, setSelectedSubKategori] = useState({ value: 0, label: '' })
    const [selectedTopik, setSelectedTopik] = useState({ value: 0, label: '' })




    const fetchQRcode = async () => {
        try {
            const response = await getAllQrcode()
            setListQrcode(response.data);
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

    const handleDelete = async (kodeqr) => {
        let isConfirm = confirm("apakah anda yakin ingin menghapus?")
        if (isConfirm) {
            await deleteQrcode(kodeqr).then((res) => {
                fetchQRcode()
            })
        }
    }




    return (

        <>
            <div className='p-10'>
                <div className='flex justify-between items-center mb-5'>
                    <h1 className='text-3xl text-white  font-bold'>QRcode Survey</h1>
                    <div className='flex items-center justify-between '>
                        <Button onClick={() => setOpenModal(true)}>Buat QRcode</Button>


                    </div>

                </div>

                <div className='md:w-full lg:flex'>
                    <div className={`md:w-12/12 ${selectedQR ? 'lg:w-9/12 ' : 'w-full'} mr-5`}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        kategori
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        sub kategori
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        topik
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listQrcode?.length > 0 && listQrcode?.map((d, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700 border-gray-200">

                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">{d.nama_kategori}</td>
                                            <td className="px-6 py-4">{d.nama_sub_kategori}</td>
                                            <td className="px-6 py-4">{d.topik} </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedQR({
                                                                topik: d.topik,
                                                                kode_qr: d.kode_qr
                                                            })
                                                        }}
                                                        type="button"
                                                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                                                    // className="hidden xl:block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                                    >
                                                        {/* preview  */}
                                                        <svg
                                                            className="text-gray-800 dark:text-white  "
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={24}
                                                            height={24}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                            />
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            />
                                                        </svg>

                                                    </button>

                                                </div>
                                                <div className='md:flex lg:hidden'>
                                                    <Button
                                                        className='mr-2'
                                                        size='xs'
                                                        onClick={() => {
                                                            setSelectedQR({
                                                                topik: d.topik,
                                                                kode_qr: d.kode_qr
                                                            })
                                                            setOpenModalQRcode(true)
                                                        }}>Detail QRcode</Button>
                                                    <Button size="sm" color='failure' onClick={() => handleDelete(d.kode_qr)}>Delete</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedQR && (

                        <div
                            className="w-3/12 p-6 h-fit bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                {selectedQR?.topik}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                <div className='flex justify-center'>
                                    <div className='w-[300px] '>
                                        <QRCode
                                            size={250}
                                            style={{ height: "100%", width: "100%" }}
                                            value={`${window.location.origin}/survey-masyarakat/${selectedQR?.kode_qr}`}
                                            viewBox={`0 0 25 25`}
                                        />
                                    </div>
                                </div>
                            </p>
                            <div className="flex justify-center py-5" role="group">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white  dark:focus:ring-blue-500 dark:focus:text-white"
                                    onClick={() => handleDelete(selectedQR?.kode_qr)}
                                >

                                    Delete
                                </button>
                                <a
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white"
                                    href={`${window.location.origin}/survey-masyarakat/${selectedQR?.kode_qr}`} target='_blank'>
                                    survey</a>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900  border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white  dark:focus:ring-blue-500 dark:focus:text-white"
                                >
                                    Downloads
                                </button>
                            </div>


                        </div>



                    )}

                </div>

            </div>
            <Modal show={openModalQRcode} onClose={() => setOpenModalQRcode(false)}>
                <Modal.Header>{selectedQR?.topik}</Modal.Header>
                <Modal.Body>

                    <div className='flex justify-center'>
                        <div className='w-[300px] '>
                            <QRCode
                                size={250}
                                style={{ height: "100%", width: "100%" }}
                                value={`${window.location.origin}/survey-masyarakat/${selectedQR?.kode_qr}`}
                                viewBox={`0 0 25 25`}
                            />
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModalQRcode(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModalQRcode(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>

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
    const link = `${window.location.origin}/survey-masyarakat/${kodeQr}`

    return (
        <div
            onClick={(e) => handleChange(e)}
            className={` rounded-xl p-4  cursor-pointer box-border ${selectedQR == kodeQr ? " border-4 bg-[#91919180] border-yellow-200 " : "bg-[#E7E7E780]"} `}>
            <div className='bg-red-200 h-20 mb-5 p-2'>
                <p className='mb-2 text-sm'>{topik}</p>
            </div>
            <div className="w-full flex ">
                <div className='w-6/12 bg-white p-2 rounded-lg'>
                    <QRCode
                        // size={256}
                        style={{ height: "100%", width: "100%" }}
                        value={link}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='w-6/12 pl-4 text-black text-sm'>
                    <div className='text-sm'>
                        <div className='mb-2 '>
                            <b className=''>Kategori</b> <br />
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