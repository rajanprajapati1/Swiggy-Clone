import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const OutletInfo = ({data}) => {
    console.log(data,"dat")
  return (
    <div className='bg-[#F1F1F6]  w-full flex flex-col  px-3 gap-1 py-5'>
        <hr className='w-full h-[2px] bg-gray-300 mb-4' />
      <div className="font-bold text-base capitalize text-gray-500 mb-3">
        {data?.name}
      </div>
      <div className="oulet flex items-center text-[15px] mb-2 text-gray-500">
        (Outlet : {data?.area})
      </div>
      <div className="add flex items-center gap-2 text-[14px] text-gray-500">
        <FaLocationDot size={13}/>
        {data?.completeAddress}
      </div>
      <hr className='w-full h-[2px] bg-gray-300 mb-4 mt-4' />
    </div>
  )
}

export default OutletInfo
