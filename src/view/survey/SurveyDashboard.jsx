import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectDetailSurvey, useEffectSurvey } from '../../hook/useEffectSurvey'

import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";

const SurveyDashboard = () => {
    const { response } = useEffectSurvey()
    const [openModal, setOpenModal] = useState(false);
    const { responseD, fetchData } = useEffectDetailSurvey(null);

    const openDetailResponden = async (kode_responden) => {

        await setOpenModal(true)
        await fetchData(kode_responden)

    }

    return (
        <LayoutAdmin>
            <ModalDetailSurveyEl setOpenModal={setOpenModal} openModal={openModal} responseD={responseD} />

            <div className='p-10'>
                <h1 className='text-3xl text-white mb-5 font-bold'>List Survey</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kode Response
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
                                response?.map((d, i) => (
                                    <>
                                        <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {i + 1}
                                            </th>
                                            <td className="px-6 py-4">{d.kode_responden}</td>
                                            <td className="px-6 py-4">{d.nama_subdata}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openDetailResponden(d.kode_responden)}
                                                    type="button"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Detail
                                                </button>



                                            </td>
                                        </tr>

                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </LayoutAdmin>
    )
}

export default SurveyDashboard

const ModalDetailSurveyEl = ({ setOpenModal, openModal, responseD }) => {



    return (
        <>
            <div className="flex flex-wrap gap-4">

                {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            </div>
            <Modal show={openModal} size={'4xl'} onClose={() => setOpenModal(false)}>
                <Modal.Header>Small modal</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Color
                                        </th>
                                    </tr>
                                </thead>
                                {responseD?.map((d, i) => (
                                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                                        <th
                                            style={{ width: "100px" }}
                                            scope="row"
                                            className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                        >
                                            {d?.title}
                                        </th>
                                        <td className="px-6 py-4  bg-dark-mode-bg"> : {d?.value}</td>
                                    </tr>

                                ))}
                                <tbody>

                                </tbody>
                            </table>
                        </div>




                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}