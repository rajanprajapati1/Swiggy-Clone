import React, { useEffect } from 'react';
import { MediaLogo } from '../config/Config';

const CouponModal = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup when component unmounts
    };
  }, [isOpen]);

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-container')) {
      onClose();
    }
  };
  console.log(isOpen)

  if (!isOpen) return null; 

  const formatExpiryTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  return (
    <div
      onClick={handleOutsideClick}
      className='modal-container w-full h-screen bg-[#6d6c6c80] flex items-center justify-center top-0 left-0 fixed z-[55555]'
    >
      <div className="modal  py-8 rounded-xl bg-white relative px-10">
        {/* Close Icon */}
        <button
          className="absolute top-2 shadow-lg w-6 h-6 rounded-full right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715; 
        </button>
        <div className="modal-content flex flex-col w-full">
          <h2 className=" font-bold text-xs w-full flex flex-col  mb-3">
            <div className="coupon flex items-center gap-2 font-extrabold  cursor-pointer" onClick={()=>alert("...copied")}>
            <img src={MediaLogo+isOpen?.info?.offerLogo} className='w-[20px]' alt="" />
          {isOpen?.info?.couponCode?.replace("USE",' ')}
            </div>
           </h2>
          <p className="text-gray-700 text-3xl font-extrabold">
            <strong>{isOpen?.info?.header}</strong>
          </p>
          <p className="mb-4 mt-2 text-sm font-bold text-gray-500 uppercase">
            {isOpen?.info?.couponCode} and
            &nbsp;{isOpen?.info?.header} on order {isOpen?.info?.description}
          </p>
            <hr className="border-t-2 w-full pb-4  mx-auto my-auto" />
          <h3 className="text-lg text-gray-600 font-bold mb-1">Terms and Conditions</h3>
          <ul className="list-disc list-inside  text-gray-600 mb-2">
            <li className='py-1 font-medium text-gray-700'>Offer valid on select restaurants            </li>
            <li className='py-1 font-medium text-gray-700'>Coupon code can be applied only once in 2 hrs on this restaurant.            </li>
            <li className='py-1 font-medium text-gray-700'>Other T&Cs may apply</li>
            <li className='py-1 font-medium text-gray-700'>Offer valid till {formatExpiryTime(isOpen?.info?.expiryTime)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
