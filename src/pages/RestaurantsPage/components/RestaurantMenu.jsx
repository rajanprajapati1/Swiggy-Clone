import React, { useState } from "react";
import { RiLeafFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import CustomAccordion, { AccordianListMenu } from "./Reuse/Accordian";
import TopCarousel from "./Reuse/TopCarousel";
import License from "./License";
import OutletInfo from "./OutletInfo";

const RestaurantMenu = ({ data }) => {
  const [check, setcheck] = useState("Veg");
  const MenuData = data?.slice(1);
  const FilterData = data?.slice(0, 1);

  return (
    <div w-full h-auto>
      <CheckFilter check={check} setcheck={setcheck} FilterData={FilterData} />
      {Array.isArray(MenuData)
        ? MenuData?.map((item, index) => {
            if (
              item?.card?.card?.carousel &&
              Array.isArray(item?.card?.card?.carousel)
            ) {
              return (
                <TopCarousel
                  title={item?.card?.card?.title}
                  data={item?.card?.card?.carousel}
                />
              );
            }
            if (
              item?.card?.card?.itemCards &&
              Array.isArray(item?.card?.card?.itemCards)
            ) {
              return (
                <CustomAccordion
                  key={index}
                  data={item?.card?.card?.itemCards}
                  title={item?.card?.card?.title}
                  isList={false}
                  totalMenuInd={item?.card?.card?.itemCards?.length || ""}
                />
              );
            }
            if (
              item?.card?.card?.categories &&
              Array.isArray(item?.card?.card?.categories)
            ) {
              return (
                <AccordianListMenu
                  key={index}
                  data={item?.card?.card?.categories}
                  title={item?.card?.card?.title}
                  isList={true}
                  index={index}
                />
              );
            }
            if(item?.card?.card?.type === "FSSAI"){
              return <License data={item} />
            }
            if(item?.card?.card?.name && item?.card?.card?.completeAddress ){
              return <OutletInfo data={item?.card?.card}/>
            }
            return null;
          })
        : null}
    </div>
  );
};

export default RestaurantMenu;

const CheckFilter = ({ setcheck, check }) => {
  return (
    <>
      <div className="checkbox w-full flex gap-2 py-3">
        <div
          onClick={() => setcheck("Veg")}
          className={`${
            check === "Veg" ? "border-2 border-gary-500" : ""
          }  cursor-pointer veg border gap-1 py-2 px-2.5 flex items-center justify-center font-semibold text-xs rounded-3xl`}
        >
          <RiLeafFill size={12} /> Pure Veg
          {/* {check === "Veg" && <IoMdClose className={`cursor-pointer`}onClick={()=>setcheck(null)} size={14}/>} */}
        </div>
        <div
          onClick={() => setcheck("Best")}
          className={`${
            check === "Best" ? "border-2 border-gary-500" : ""
          }  cursor-pointer best border py-2 px-2.5 flex items-center justify-center gap-1 font-semibold text-xs rounded-3xl`}
        >
          Bestseller
          {check === "Best" && (
            <IoMdClose
              className={`cursor-pointer`}
              onClick={() => setcheck(null)}
              size={14}
            />
          )}
        </div>
      </div>
    </>
  );
};
