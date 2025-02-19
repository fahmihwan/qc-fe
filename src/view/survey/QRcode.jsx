import React, { useEffect, useRef, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { InputReactSelectAsyncEl, InputReactSelectEl, TextInputEl } from '../component/InputCompt';
import { useEffectDropdownTopik } from '../../hook/useEffectYears';
import { getDropdownNamakategori, getDropdownSubkatgeori, getDropdownTopik } from '../../api/otherApi';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import QRCode from 'react-qr-code';

const QRcode = () => {
    const [openModal, setOpenModal] = useState(true);
    const [listSubdata, setListSubData] = useState([]);





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




    useEffect(() => {
        getDropdownNamakategori().then((res) => {
            console.log(res.data);
            setListKategori(res.data)
        })
    }, [])



    useEffect(() => {
        if (selectedKategori?.value != '') {
            getDropdownSubkatgeori(selectedKategori?.value).then((res) => {
                setListSubKategori(res.data)
            })


        }
        if (selectedSubKategori?.value != '') {
            getDropdownTopik(selectedSubKategori?.value).then((res) => {
                setListTopik(res.data)
            })
        }
    }, [selectedKategori, selectedSubKategori])



    useEffect(() => {
        if (openModal == false) {
            setListKategori([])
            setListSubKategori([])
            setListTopik([])

            setSelectedKategori({ value: 0, label: '' })
            setSelectedSubKategori({ value: 0, label: '' })
            setSelectedTopik({ value: 0, label: '' })


        }

    }, [openModal])


    // buat button submit 
    return (
        <LayoutAdmin>
            <div className='p-10'>
                <h1 className='text-3xl text-white mb-5 font-bold'>QRcode Survey</h1>
                <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>


                <div className=''>
                    <div className="grid grid-cols-4 gap-6">
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />

                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />
                        <CardQRcodeEl />

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


const CardQRcodeEl = (params) => {

    return (
        <div className="bg-[#E7E7E780] rounded-xl p-4 ">
            <div className="w-full flex">
                <div className='w-6/12 bg-white p-2 rounded-lg'>
                    <QRCode
                        // size={256}
                        style={{ height: "100%", width: "100%" }}
                        value={"w"}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='w-6/12 pl-4 text-black text-sm'>
                    <div>
                        <div className='mb-2'>
                            <b>Topik</b> <br />
                            <p>Statistik Luas Panen</p>
                        </div>
                        <div className='mb-2'>
                            <b>Kategori</b> <br />
                            <p>Food Estate</p>
                        </div>
                        <div className='mb-2'>
                            <b>Sub Kategori</b> <br />
                            <p>Padi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className="bg-dark-mode-v2 p-4 ">
    //         <div className="w-full flex">
    //             <div className='w-6/12 bg-dark-mode-bg p-2'>
    //                 <QRCode
    //                     // size={256}
    //                     style={{ height: "100%", width: "100%" }}
    //                     value={"w"}
    //                     viewBox={`0 0 256 256`}
    //                 />
    //             </div>
    //             <div className='w-6/12 pl-4 text-white text-sm'>
    //                 <div>
    //                     <div className='mb-2'>
    //                         <b>Topik</b> <br />
    //                         <p>Statistik Luas Panen</p>
    //                     </div>
    //                     <div className='mb-2'>
    //                         <b>Kategori</b> <br />
    //                         <p>Food Estate</p>
    //                     </div>
    //                     <div className='mb-2'>
    //                         <b>Sub Kategori</b> <br />
    //                         <p>Padi</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
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
    listTopik

}) => {

    return (
        <Modal show={openModal}
            position={"center"}
            size="2xl" popup onClose={() => setOpenModal(false)} initialFocus={null}>
            <Modal.Header>
                <div className='p-5 text-white text-2xl font-bold '>
                    Survey
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className='w-full  '>
                    <div className='w-full py-5  '>

                        <div className='mb-5'>
                            <CreatableSelect
                                onChange={(e) => setSelectedKategori({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                value={selectedKategori.value != 0 ? selectedKategori : ''}
                                placeholder={"Kategori Survey"}
                                isClearable options={listKategori} />
                        </div>


                        {listSubKategori.length != 0 && (
                            <div className='mb-5'>
                                <CreatableSelect
                                    onChange={(e) => setSelectedSubKategori({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                    value={selectedSubKategori.value != 0 ? selectedSubKategori : ''}
                                    placeholder={"Sub Kategori Survey"}
                                    isClearable options={listSubKategori} />
                            </div>
                        )}




                        {
                            listTopik.length != 0 && (
                                <>
                                    <div>
                                        <CreatableSelect
                                            onChange={(e) => setSelectedTopik({ value: e?.value ? e.value : 0, label: e?.label ? e.label : '' })}
                                            value={selectedTopik.value != 0 ? selectedTopik : ''}
                                            placeholder={"Sub Kategori Survey"}
                                            isClearable options={listTopik} />
                                    </div>


                                    <button
                                        type="button"
                                        className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Submit
                                    </button></>
                            )
                        }


                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )

}