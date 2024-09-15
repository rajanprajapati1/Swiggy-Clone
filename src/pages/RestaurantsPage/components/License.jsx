import React from 'react'
import { LicenseCdn } from '../../../config/Config'
const License = ({data}) => {
  return (
    <div className='bg-[#F1F1F6] mt-8 w-full flex items-center px-3 gap-5 py-5'>
      <img src={LicenseCdn+data?.card?.card?.imageId} alt="" className='w-[4vw] object-contain' />
      <div>
        {data?.card?.card?.text?.map((val,i)=>{
            return <span className='text-[14px] text-[#858585]'>{val}</span>
        })}
      </div>
    </div>
  )
}

export default License
