import React, { useEffect, useRef, useState } from "react";
import { foodCategoryMap } from "../mock/res";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { Swiggy_cloudinary } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { MdStars } from "react-icons/md";

const RestaurantsList = ({ data }) => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [FoodCategory, setFoodCategory] = useState({});
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
    updateButtonState();
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    updateButtonState();
  };

  useEffect(() => {
    updateButtonState();
    window.addEventListener("resize", updateButtonState);
    return () => window.removeEventListener("resize", updateButtonState);
  }, [foodCategoryMap]);

  const HandleFoodCategoryNavigate = (link) => {
    Navigate(link);
  };

  return (
    <div className="h-auto w-full m-auto">
      <div className="bar flex items-center justify-between">
        {FoodCategory?.header?.title ? (
          <h1 className="font-extrabold py-4 text-2xl mb-2">
            {FoodCategory?.header?.title}
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
            {FoodCategory?.gridElements?.infoWithStyle?.restaurants
              ? FoodCategory?.gridElements?.infoWithStyle?.restaurants?.map(
                  (val, i) => {
                    const {
                      name,
                      cuisines,
                      avgRating,
                      cloudinaryImageId,
                      sla: { deliveryTime },
                      aggregatedDiscountInfoV3,
                    } = val?.info;
                    let discountInfo = "";

                    if (aggregatedDiscountInfoV3) {
                      const { header, subHeader } = aggregatedDiscountInfoV3;
                      discountInfo =
                        (header ? header + " " : "") +
                        (subHeader ? subHeader : "");
                    }

                    return (
                      <>
                        <div
                          key={i}
                          className="flex-[0_0_auto]  rounded-md  cursor-pointer   w-[285px] mx-[12px]"
                        >
                          <div className="p-0 text-sm h-full">
                            <div className="relative mb-2">
                              <img
                                onClick={() =>
                                  HandleFoodCategoryNavigate(
                                    val?.cta?.link?.replace(
                                      "https://www.swiggy.com/",
                                      ""
                                    )
                                  )
                                }
                                className="rounded-2xl w-full h-48 cursor-pointer object-cover object-center"
                                src={Swiggy_cloudinary + cloudinaryImageId}
                                alt="res-img"
                              />
                              <div
                                className="absolute bottom-0 left-0 right-0 h-[81px] text-left grid content-end px-3 pb-2 
                  bg-gradient-to-b from-[#1b1e2400] to-[#1b1e24] rounded-2xl"
                              >
                                <div className="font-bold text-[21px] w-auto whitespace-nowrap text-[#ffffffeb]">
                                  {discountInfo}
                                </div>
                              </div>
                            </div>
                            <h3 className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap">
                              {name}
                            </h3>
                            <div className="flex">
                              <MdStars
                                className="align-middle"
                                size={22}
                                color="#0f8a65"
                              />
                              <span className="ml-1 text-base">
                                {avgRating}
                              </span>
                            </div>
                            <div className="truncate overflow-hidden whitespace-nowrap text-base text-[#02060c99]">
                              {cuisines?.join(", ")}
                            </div>
                            <div className="text-base text-[#02060c99]">
                              {deliveryTime}{" "}
                              {deliveryTime?.toString()?.length <= 3 && "mins"}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )
              : Array.from({ length: 8 }).map((val, i) => {
                  return (
                    <div className="flex-[0_0_auto] rounded-md bg-[#d4d4d485] animate-pulse cursor-pointer h-[200px] w-[285px] mx-[14px] mt-4"></div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;
