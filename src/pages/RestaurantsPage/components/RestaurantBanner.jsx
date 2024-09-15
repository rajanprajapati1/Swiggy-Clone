import React from "react";
import { IoMdStar } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";

const RestaurantBanner = ({ data }) => {
  console.log(data, "banner");
  const restaurant = data?.card?.card?.info;

  return (
    <div className="w-full h-auto ">
      <div className="main_layer rounded-[35px] py-6  bg-gradient-to-b from-white mt-4 to-gray-200 h-full flex items-center justify-center w-full">
        <div className="inner_layer py-6 px-6 rounded-2xl bg-white h-[86%] border border-gray-300 w-[95%] ">
          <div className="flex-1 flex  flex-col  ">
            {restaurant?.sla?.serviceability !== "SERVICEABLE" && (
              <h2 className="font-bold flex items-center  text-[#282c3f] text-[15px] gap-2 mb-2">
                <IoIosInformationCircle
                  size={28}
                  className="text-[#FF5200] text-xl"
                />{" "}
                {`This location is outside the outlet's delivery area.`}
              </h2>
            )}
            <div className="stra flex items-center">
              <div className="star p-[1px] bg-green-700 w-fit text-white rounded-full">
                <IoMdStar size={18} />
              </div>
              <strong className="rating text-[19px] font-bold">
                {restaurant?.avgRating}  ({restaurant?.totalRatingsString})
                &#8226; {restaurant?.costForTwoMessage}
              </strong>
            </div>
              <div className="cusine flex items-center gap-2 py-1">
                {restaurant?.cuisines?.map(val=><span className="text-base underline font-bold text-[#FF6A13]">{val}</span>)}
              </div>
              <div className="stepper w-full flex mt-2 items-start">
                <div className="flex1_row flex">
                <div className="step flex  flex-col mr-2 mt-0.5 items-center">
                    <div className="dot w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="line w-[.5px] h-8 bg-gray-400"></div>
                    <div className="dot w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <div className="step flex flex-col text-xs -mt-0.5 ">
                    <div className="dot"><strong className="text-sm font-extrabold">Outlet</strong><span className="ml-3 font-normal">{restaurant?.areaName}</span></div>
                    <div className="line h-4"></div>
                    <div className="dot"><strong className="text-sm font-extrabold">{restaurant?.availability?.opened === false ? 'This restaurant is closed for delivery' : 'Available for delivery right now!'}</strong>
                    </div>
                </div>
                
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
{
  /* <p className="text-[0.83rem] text-[#7e808c] mb-1">{restaurant?.cuisines.join(" ,")}</p>
                    <p className="text-[0.83rem] text-[#7e808c]">{restaurant?.areaName}, {restaurant?.city}</p>
                </div> */
}
{
  /* <div className="p-2 font-bold self-start border max-w-[100px] rounded-md text-green-600">
                    <div className="flex items-center justify-center mb-2 pb-2.5 border-b-[1px] border-[#e9e9eb]">
                        <IoMdStar size={21} />
                        <span className="ml-0.5 text-[13px] font-bold">
                            {restaurant?.avgRating}
                        </span>
                    </div>    
                    <div className="font-semibold text-[10px] text-[#8b8d97]">{restaurant?.totalRatingsString}</div>
                </div> */
}
