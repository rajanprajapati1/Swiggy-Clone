import React from 'react'
import { Link } from 'react-router-dom';

const Hamburger = ({urlparts ,title}) => {
    const data = urlparts?.join(' ').split('/');
    const city = data[2];
  return (
    <div className='w-full flex items-center py-8 '>
       <div className="menu flex items-center text-xs gap-1 text-gray-500">
        <Link to={"/"}>Home</Link>
        <span>/</span>
        <Link to={`/city/${city}`} >{city}</Link>
        <span>/</span>
        <span>{title}</span>
       </div>
    </div>
  )
}

export default Hamburger
