import React, { useEffect, useRef, useState } from "react";
import { foodCategoryMap } from "../../../mock/res";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import useApi from "./../../../apis/ApiConfig";
import { MediaLogo } from "./../../../config/Config";
import { useNavigate } from "react-router-dom";
import generic from "../../../assets/generic.avif";
import CouponModal from "../../../components/CouponModal";

const DealsCarousel = ({ data, title }) => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [FoodCategory, setFoodCategory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(null);

  useEffect(() => {
    setFoodCategory(data);
  }, [data]);
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
  }, [data]);

  return (
    <>
      <div className="h-auto w-full m-auto">
        <CouponModal isOpen={isModalOpen} onClose={() => setModalOpen(null)} />
        <div className="bar flex items-center justify-between">
          {title ? (
            <h1 className="font-extrabold py-4 mt-8 px-4  text-xl mb-2">
              {title}
            </h1>
          ) : (
            <div className="bg-[#d4d4d485] ml-3 animate-pulse py-5 mt-5 px-32 rounded-md"></div>
          )}
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
              {FoodCategory
                ? FoodCategory?.map((data, i) => (
                    <div
                      onClick={() => setModalOpen(data)}
                      key={i}
                      className="flex-[0_0_auto] flex gap-3 px-4 py-2.5 border-2  cursor-pointer  w-[360px] rounded-3xl mx-[12px]"
                    >
                      <img
                        // onClick={()=>HandleFoodCategoryNavigate(data?.action?.link?.replace('https://www.swiggy.com/',''))}
                        src={`${MediaLogo}${data?.info?.offerLogo}`}
                        className=" object-cover last:pr-0 aspect-square w-[52px] cursor-pointer"
                        loading="lazy"
                      />
                      <div className="cod flex flex-col ">
                        <strong className="font-extrabold capitalize text-base">
                          {" "}
                          {data?.info?.header}
                        </strong>
                        <strong className="text-[#909294] text-base font-extrabold">
                          {data?.info?.couponCode ? data?.info?.couponCode : 'APPLICABLE OVER & ABOVE...'}
                        </strong>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 8 }).map((val, i) => {
                    return (
                      <div className="flex-[0_0_auto] rounded-md bg-[#d4d4d485] animate-pulse cursor-pointer h-[180px] w-[145px] mx-[14px] mt-4"></div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsCarousel;
