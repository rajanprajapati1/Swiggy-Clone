import React, { useRef } from 'react'
import useIntersectionObserver from '../../../hooks/UseObserver';

const Title = ({title,data}) => {
  const restaurant = data?.card?.card?.info;
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  console.log(isVisible, "obs");
  return (
  <>
   {!isVisible &&  <header className="fixed top-0 z-[1001] w-full flex items-center justify-center h-[80px]  left-0 right-0 bg-white">
    <div className="title flex flex-col w-[800px]">
      <span className='font-extrabold text-lg'>{title}</span>
      <span className='font-semibold text-sm'>
       {restaurant?.availability?.opened === false ? 'This restaurant is closed for delivery' : 'Available for delivery right now!'}
      </span>
    </div>
    </header>}
   <div ref={ref} className='py-0  w-full'>
      <h1 className='pl-7 font-extrabold text-2xl'>{title}</h1>
    </div>
  </> 
  )
}

export default Title
