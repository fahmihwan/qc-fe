import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'

const Gempa = () => {
    const onProvinceClick = ({namaProvinsi, kodeProvinsi}) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }
    
    return (
        <LayoutAdmin>
            Gempa
        </LayoutAdmin>
    )
}

export default Gempa