import React, { useEffect, useRef, useState } from "react";
import { foodCategoryMap } from "../mock/res";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import useApi from "./../apis/ApiConfig";
import { SWIGGY_CDN } from "../config/Config";
import {  useNavigate } from "react-router-dom";

const FoodCategory = ({data}) => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [FoodCategory, setFoodCategory] = useState({});
  useEffect(()=>{
    setFoodCategory(data)
    console.log(data)
  },[data])
  const Navigate = useNavigate();
  const updateButtonState = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    console.log(scrollRef);
    updateButtonState();
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    console.log(scrollRef);
    updateButtonState();
  };

  useEffect(() => {
    updateButtonState();
    window.addEventListener("resize", updateButtonState);
    return () => window.removeEventListener("resize", updateButtonState);
  }, [foodCategoryMap]);


  return (
    <div className="h-auto w-full m-auto">
      <div className="bar flex items-center justify-between">
        {FoodCategory?.header?.title ? <h1 className="font-extrabold py-4 text-2xl mb-2">
          {FoodCategory?.header?.title}
        </h1> : <div className="bg-[#d4d4d485] ml-3 animate-pulse py-5 mt-5 px-32 rounded-md"></div>}
        <div className="btn flex items-center gap-2">
          <button
            className="disabled:bg-gray-300 disabled:opacity-85 bg-white shadow-md p-1.5 rounded-full"
            onClick={scrollLeft}
            disabled={isAtStart}
          >
            <HiMiniArrowLeft size={21} className="text-gray-500" />
          </button>
          <button
            className="disabled:bg-gray-300 disabled:opacity-85 bg-white shadow-md p-1.5 rounded-full"
            onClick={scrollRight}
            disabled={isAtEnd}
          >
            <HiMiniArrowRight size={21} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="relative">
        <div>
          <div
            className="overflow-x-auto overflow-y-hidden flex no-scrollbar"
            ref={scrollRef}
          >
            {FoodCategory?.imageGridCards?.info ? FoodCategory?.imageGridCards?.info.map((data,i) => (
              <div
                key={i}
                className="flex-[0_0_auto] cursor-pointer h-[180px] w-[145px] mx-[12px]"
              >
                <img
                onClick={()=>HandleFoodCategoryNavigate(data?.action?.link?.replace('https://www.swiggy.com/',''))}
                  src={SWIGGY_CDN + data?.imageId}
                  className=" object-cover last:pr-0 cursor-pointer"
                  loading="lazy"
                />
                <strong> {data?.description}</strong>
              </div>
            )) : Array.from({length : 8}).map((val,i)=>{
              return <div className="flex-[0_0_auto] rounded-md bg-[#d4d4d485] animate-pulse cursor-pointer h-[180px] w-[145px] mx-[14px] mt-4"></div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategory;
