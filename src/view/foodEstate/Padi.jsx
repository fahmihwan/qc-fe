import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import IndonesiaMap from '../component/IndonesiaMap'

const Padi = () => {
    return (
        <LayoutAdmin>
            <div style={{width: "100%", height: "541px"}}>
            <IndonesiaMap />
            </div>
        </LayoutAdmin>
    )
}

export default Padi