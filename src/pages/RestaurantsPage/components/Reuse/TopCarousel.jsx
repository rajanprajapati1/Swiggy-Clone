import React, { useEffect, useRef, useState } from "react";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { MenuCarousel } from "./../../../../config/Config";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../../hooks/UseFormater";
// import CouponModal from "../../../components/CouponModal";
const TopCarousel = ({ data, title }) => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isModalOpen, setModalOpen] = useState(null);


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
console.log(data,"top")

  return (
    <>
      <div className="h-auto w-full mb-8 m-auto">
        {/* <CouponModal isOpen={isModalOpen} onClose={() => setModalOpen(null)} /> */}
        <div className="bar flex items-center justify-between">
          {title ? (
            <h1 className="font-extrabold py-4 mt-8 px-1  text-xl mb-2">
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
              {data
                ? data?.map((val, i) => (
                    <div
                      onClick={() => setModalOpen(val)}
                      key={i}
                      className="flex-[0_0_auto] relative flex gap-3  flex-col  border-2  cursor-pointer   rounded-xl mx-[12px]"
                    >
                      <img
                        // onClick={()=>HandleFoodCategoryNavigate(val?.action?.link?.replace('https://www.swiggy.com/',''))}
                        src={`${MenuCarousel}${val?.creativeId}`}
                        className=" last:pr-0 object-cover cursor-pointer"
                        loading="lazy"
                      />
                      <div className="cod justify-between px-5 py-5 w-full items-center absolute flex bottom-0">
                        <strong className="font-extrabold capitalize text-white text-lg">
                        ₹ {formatPrice(val?.dish?.info?.defaultPrice) ||
                      formatPrice(val?.dish?.info?.price)}
                        </strong>
                        <button className="bg-white border text-lg text-blue-950 uppercase  font-extrabold rounded-md shadow-md px-6 py-[2px] hover:bg-gray-200 ">Add</button>
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

export default TopCarousel;
