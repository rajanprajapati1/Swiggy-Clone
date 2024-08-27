import React, { createRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMyLocation } from "react-icons/md";
import Image from '../assets/ro.avif'

const AuthBar = ({ show, onClose }) => {
 
  return (
    <div
      className={`fixed top-0 left-0 right-auto h-full overflow-y-hidden bg-white z-[10001] 
            transition-transform ${
              show ? "translate-x-[182%]" : "translate-x-[500%]"
            } duration-[0.3s] ease-in-out`}
    >
      <div className="relative h-screen">
        <div className="w-[480px] pr-[45px] pl-[45px]">
          <div className="mb-[30px] pt-[32px] flex justify-start">
            <RxCross2
              onClick={onClose}
              size={26} 
              color="#3d4152"
              className="cursor-pointer"
            />
          </div>
          <div className="relative pb-[40px]">
            <div className=" relative flex item-center justify-between">
            <div className="title flex flex-col gap-3">
              <span className="text-3xl font-bold">Login              </span>
              <span>or  <span className="text-[#FF5200]">create an account </span>              </span>
              <span className="border border-black w-8"></span>
                </div>
                <div className="image w-[100px] h-[100px]">
                <img src={Image} className="w-full h-full object-cover" />
                    </div>
            </div>
            <div className="input_swig_box w-full  py-4 border flex items-center justify-center">
              <div className="input_Swig w-full px-4 ">
                <input type="text" id="swigy" className="w-full py-2  outline-none font-bold text-lg"  />
                <label htmlFor="swigy" className="swig_label">Phone number</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBar;
