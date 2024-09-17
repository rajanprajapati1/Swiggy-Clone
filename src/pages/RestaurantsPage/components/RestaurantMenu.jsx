import React, { useEffect, useState } from "react";
import { RiLeafFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import CustomAccordion, { AccordianListMenu } from "./Reuse/Accordian";
import TopCarousel from "./Reuse/TopCarousel";
import License from "./License";
import OutletInfo from "./OutletInfo";
import Menu from "./Menu";
import { useSwiggy } from "./../../../context/SwiggyAuth";
const RestaurantMenu = ({ data }) => {
  const [check, setcheck] = useState("VEG");
  const MenuData = data?.slice(1);
  const FilterData = data?.slice(0, 1);
  const { Searchhlist, setSearchhlist } = useSwiggy();

  const GetMenuList = async () => {
    try {
      const countItemCardsInCategory = (category) => {
        let totalItemCards = 0;
        let allItemCards = [];

        if (category?.itemCards && Array.isArray(category.itemCards)) {
          totalItemCards += category.itemCards.length;
          allItemCards = [...category.itemCards];
        }

        if (category?.categories && Array.isArray(category.categories)) {
          category.categories.forEach((subCategory) => {
            // totalItemCards += countItemCardsInCategory(subCategory);
            const { totalCards, itemCards } =
              countItemCardsInCategory(subCategory);
            totalItemCards += totalCards;
            allItemCards = [...allItemCards, ...itemCards];
          });
        }

        return {
          totalCards: totalItemCards,
          itemCards: allItemCards,
        };
      };

      const data = Array.isArray(MenuData)
        ? MenuData?.map((item, index) => {
            if (
              item?.card?.card?.itemCards &&
              Array.isArray(item?.card?.card?.itemCards)
            ) {
              return {
                name: item?.card?.card?.title,
                count: item?.card?.card?.itemCards?.length || 0,
                items: item?.card?.card?.itemCards || [],
              };
            }

            if (
              item?.card?.card?.categories &&
              Array.isArray(item?.card?.card?.categories)
            ) {
              const { totalCards, itemCards } =
                item?.card?.card?.categories.reduce(
                  (acc, category) => {
                    const result = countItemCardsInCategory(category);
                    return {
                      totalCards: acc.totalCards + result.totalCards,
                      itemCards: [...acc.itemCards, ...result.itemCards],
                    };
                  },
                  { totalCards: 0, itemCards: [] }
                );

              return {
                name: item?.card?.card?.title,
                count: totalCards,
                items: itemCards,
              };
            }

            return;
          })
        : null;
      setSearchhlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetMenuList();
  }, []);
  return (
    <>
      <Menu data={Searchhlist} />
      <div w-full h-auto>
        <CheckFilter
          check={check}
          setcheck={setcheck}
          FilterData={FilterData?.[0]?.card?.card}
        />
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
                    itemIndexs={index}
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
                    CategoriesIndexs={index}
                    data={item?.card?.card?.categories}
                    title={item?.card?.card?.title}
                    isList={true}
                    index={index}
                  />
                );
              }
              if (item?.card?.card?.type === "FSSAI") {
                return <License data={item} />;
              }
              if (item?.card?.card?.name && item?.card?.card?.completeAddress) {
                return <OutletInfo data={item?.card?.card} />;
              }
              return null;
            })
          : null}
      </div>
    </>
  );
};

export default RestaurantMenu;

const CheckFilter = ({ setcheck, check, FilterData }) => {
  const filteredData = FilterData && Object?.keys(FilterData)
    ?.filter((key) => FilterData[key]?.attributes)
    ?.map((key) => ({
      key,
      filterName: FilterData[key]?.attributes?.displayText,
    }));
  return (
    <>
      <div className="checkbox w-full flex gap-2 py-5 mt-2">
      {filteredData && filteredData?.map((filter, index) => (
          <div
            key={index}
            onClick={() => setcheck(filter?.filterName)} 
            className={`${
              check === filter?.filterName ? "border-2 border-gray-500" : ""
            } cursor-pointer border py-2 px-6 flex items-center justify-center gap-1 font-semibold text-sm rounded-3xl`}
          >
            {filter?.filterName}
            {check === filter?.filterName && (
              <IoMdClose
                className="cursor-pointer"
                onClick={() => setcheck(null)}
                size={16}
              />
            )}
          </div>
        ))}
       
      </div>
    </>
  );
};


// {/* <div
// onClick={() => setcheck("Veg")}
// className={`${
//   check === "Veg" ? "border-2 border-gary-500" : ""
// }  cursor-pointer veg border gap-1 py-2 px-2.5 flex items-center justify-center font-semibold text-xs rounded-3xl`}
// >
// <RiLeafFill size={12} /> Pure Veg
{/* {check === "Veg" && <IoMdClose className={`cursor-pointer`}onClick={()=>setcheck(null)} size={14}/>} */}
// </div>
// <div
// onClick={() => setcheck("Best")}
// className={`${
//   check === "Best" ? "border-2 border-gary-500" : ""
// }  cursor-pointer best border py-2 px-2.5 flex items-center justify-center gap-1 font-semibold text-xs rounded-3xl`}
// >
// Bestseller
// {check === "Best" && (
//   <IoMdClose
//     className={`cursor-pointer`}
//     onClick={() => setcheck(null)}
//     size={14}
//   />
// )}
// </div> */}