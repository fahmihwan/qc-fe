import React from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import IndonesiaMap from '../component/IndonesiaMap'

const Padi = () => {
    return (
        <LayoutAdmin>
            <div className='w-full min-h-screen dark:bg-dark-mode'>
                <div className='h-full p-[10px] border-t-[1px] dark:border-white'  style={{width: "100%", height: "541px"}}>
                    <IndonesiaMap />
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Padi