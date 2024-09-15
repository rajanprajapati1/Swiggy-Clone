import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({onOpen}) => {
  return (
    <div className='w-full py-3 bg-[#F2F2F2] flex rounded-md cursor-pointer px-4' onClick={onOpen}>
      <span  className='flex-1 flex items-center justify-center'></span>
      <span  className='flex-1 flex items-center justify-center font-bold text-gray-500 '>Search For Dishes</span>
      <span  className='flex-1 flex items-center justify-end text-gray-500'><IoIosSearch size={23}/></span>
    </div>
  )
}

export default SearchBar
