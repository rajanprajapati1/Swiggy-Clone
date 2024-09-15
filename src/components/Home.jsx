import React, { useState, useEffect } from "react";
import RestaurantCard, { withPromoted } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import {  useNavigate } from "react-router-dom";
import FoodCategories from "./FoodCategories";
import useApi from "../apis/ApiConfig";
import RestaurantsList from "./RestaurantsList";
import { IoChevronDownOutline } from "react-icons/io5";
import LocationUnserviceable from "./LocationUnserviceable";
import { FaChevronDown } from "react-icons/fa6";

const Home = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState({});
  const [Data, setData] = useState({});
  const RestaurantCardPromoted = withPromoted(RestaurantCard);
  const [ShowSorting, setShowSorting] = useState(false);
  const [CheckedSort, setCheckedSort] = useState();
  const [showMore, setshowMore] = useState(false);
  const Navigate = useNavigate() ;

  useEffect(() => {
    fetchData();
  }, []);

  const HandleSort = (checked) => {
    setCheckedSort(checked);
    setShowSorting(false);
  };

  const HandleFoodCategoryNavigate = (href) => {
    Navigate(href);
    console.log(href);
  };

  const fetchData = async () => {
    try {
      const val = JSON?.parse(localStorage?.getItem("swgy_userLocation"));
      const data = await useApi.GetRestaurants(val?.lat, val?.lng);
      setData(data);
      console.log(data, "gh");
      setListOfRestaurants({
        title: data[2]?.card?.card?.title,
        filters: data[3]?.card?.card,
        restaurants:
          data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        nearme: {
          title: data[6]?.card?.card?.title,
          list: data[6]?.card?.card?.brands,
        },
        Cuisines : {
          title: data[7]?.card?.card?.title,
          list: data[7]?.card?.card?.brands,
        } ,
        Explore : {
          title: data[8]?.card?.card?.title,
          list: data[8]?.card?.card?.brands,
        }
      });
      // window.scrollTo({
      //   behavior: "smooth",
      //   top: 0,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  if (Data?.[0]?.card?.card?.title === "Location Unserviceable") {
    return <LocationUnserviceable />;
  }
  if (Object.values(listOfRestaurants)?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body max-w-[1080px] mx-auto pt-3  pb-20">
      <FoodCategories data={Data?.[0]?.card?.card} />
      <hr className="border  mt-12 bg-gray-50" />
      <br />
      <RestaurantsList data={Data[1]?.card?.card} />
      <hr className="border my-[24px] bg-gray-50" />
      <div className="flex  flex-col ">
        {listOfRestaurants?.title ? (
          <h1 className="font-extrabold py-2 text-2xl mb-2">
            {listOfRestaurants?.title}
          </h1>
        ) : (
          <div className="bg-[#d4d4d485] ml-3 mb-2 animate-pulse py-5 mt-5 px-32 w-[30%] rounded-md"></div>
        )}

        {Object.values(listOfRestaurants)?.length > 0 ? (
          <div className="filter-skeleton mb-5 ml-0 flex gap-3 items-center">
            <div className="py-2  relative flex cursor-pointer items-center  px-5 rounded-full border">
              <strong className="font-extrabold flex items-center gap-1  text-gray-800 text-[14px] leading-tight">
                Filters
                <img
                  src="https://www.svgrepo.com/show/458690/filter-big-1.svg"
                  alt=""
                  className="w-4 h-4 object-cover"
                />
              </strong>
            </div>
            <div className="py-2 relative flex  cursor-pointer items-center  px-5 rounded-full border">
              <strong
                onClick={() => {
                  setShowSorting(!ShowSorting);
                }}
                className="font-extrabold flex items-center gap-1 text-gray-800 text-[14px] leading-tight"
              >
                Sort By <IoChevronDownOutline />
              </strong>
              {ShowSorting && (
                <div className="sorting_popover border z-30 rounded-xl  w-[200px] bg-white absolute left-0 top-0">
                  {listOfRestaurants?.filters?.sortConfigs

                    ?.slice(0, 4)
                    ?.map((val, i) => {
                      return (
                        <div className="py-3 w-full  cursor-pointer flex items-center gap-3 px-4 ">
                          <label
                            htmlFor={val?.title}
                            className="font-extrabold w-full text-gray-800 text-[14px] leading-tight"
                          >
                            {val?.title}
                          </label>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              id={val?.title}
                              checked={CheckedSort === val?.title}
                              name="sorting"
                              onChange={() => HandleSort(val?.title)}
                            />
                            <span className="radio-mark"></span>
                          </label>
                        </div>
                      );
                    })}
                  <hr />
                  <button className="py-3 w-full  cursor-pointer flex items-center gap-3 px-4  font-extrabold text-[14px] text-[#FF6711]">
                    Apply
                  </button>
                </div>
              )}
            </div>
            {listOfRestaurants?.filters?.facetList?.map((val, i) => {
              return (
                <div className="py-2 cursor-pointer flex items-center gap-3 px-4 rounded-full border">
                  <strong className="font-extrabold text-gray-800 text-[14px] leading-tight">
                    {val?.label}
                  </strong>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="filter-skeleton flex gap-3 items-center">
              {Array.from({ length: 8 }).map((val, i) => {
                return (
                  <div className="py-[1.4rem] rounded-full px-14 bg-[#d4d4d485] animate-pulse"></div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {listOfRestaurants?.nearme?.list?.length > 0 ? (
        <div className="restaurant-container grid grid-cols-4 gap-8">
          {listOfRestaurants?.restaurants?.map(({ info, cta }) => (
            <div
              key={info?.id}
              className="transition-all duration-100 hover:scale-95"
            >
              {info.promoted ? (
                <RestaurantCardPromoted resData={info} link={cta} />
              ) : (
                <RestaurantCard resData={info} link={cta} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="restaurant-container grid grid-cols-4 mt-5 gap-8">
          {Array.from({ length: 8 }).map((val, i) => {
                return   <div className="card bg-[#d4d4d485] animate-pulse  h-44  rounded-lg" />

              })}
            </div>
            )}
      <hr className="border my-[24px] bg-gray-50" />
      <div className="flex  flex-col h-auto mb-5">
        {listOfRestaurants?.nearme ? (
          <h1 className="font-extrabold py-2 text-2xl mb-2">
            {listOfRestaurants?.nearme?.title}
          </h1>
        ) : (
          <div className="bg-[#d4d4d485] ml-3 mb-2 animate-pulse py-5 mt-5 px-32 w-[30%] rounded-md"></div>
        )}
        <div className="list_a w-full">
          {listOfRestaurants?.restaurants?.length > 0 ? (
            <div className="grid grid-cols-4 mt-5 gap-3 w-full">
              {listOfRestaurants?.nearme?.list
                ?.slice(
                  0,
                  showMore ? listOfRestaurants?.nearme?.list?.length : 15
                )
                ?.map((val) => (
                  <div className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center" onClick={()=>HandleFoodCategoryNavigate(val?.link?.replace('https://www.swiggy.com/',''))}>
                    {val?.text}
                  </div>
                ))}
              {!showMore && (
                <div
                  className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center"
                  onClick={() => setshowMore(true)}
                >
                  Show More <FaChevronDown />
                </div>
              )}
            </div>
          ) : (
            <div className="restaurant-container grid grid-cols-4 mt-5 gap-4">
              {Array.from({ length: 16 }).map((val, i) => {
                return (
                  <div className="card bg-[#d4d4d485] animate-pulse    py-5 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center" />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex  flex-col h-auto mb-5">
        {listOfRestaurants?.Cuisines  ? (
          <h1 className="font-extrabold py-2 text-2xl mb-2">
            {listOfRestaurants?.Cuisines?.title}
          </h1>
        ) : (
          <div className="bg-[#d4d4d485] ml-3 mb-2 animate-pulse py-5 mt-5 px-32 w-[30%] rounded-md"></div>
        )}
        <div className="list_a w-full">
          {listOfRestaurants?.Cuisines?.list?.length > 0 ? (
            <div className="grid grid-cols-4 mt-5 gap-3 w-full">
              {listOfRestaurants?.Cuisines?.list
                ?.slice(
                  0,
                  showMore ? listOfRestaurants?.Cuisines?.list?.length : 15
                )
                ?.map((val) => (
                  <div className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center" onClick={()=>HandleFoodCategoryNavigate(val?.link?.replace('https://www.swiggy.com/',''))}>
                    {val?.text}
                  </div>
                ))}
              {!showMore && (
                <div
                  className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center"
                  onClick={() => setshowMore(true)}
                >
                  Show More <FaChevronDown />
                </div>
              )}
            </div>
          ) : (
            <div className="restaurant-container grid grid-cols-4 mt-5 gap-4">
              {Array.from({ length: 16 }).map((val, i) => {
                return (
                  <div className="card bg-[#d4d4d485] animate-pulse    py-5 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center" />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex  flex-col h-auto mb-5">
        {listOfRestaurants?.Explore  ? (
          <h1 className="font-extrabold py-2 text-2xl mb-2">
            {listOfRestaurants?.Explore?.title}
          </h1>
        ) : (
          <div className="bg-[#d4d4d485] ml-3 mb-2 animate-pulse py-5 mt-5 px-32 w-[30%] rounded-md"></div>
        )}
        <div className="list_a w-full">
          {listOfRestaurants?.Explore?.list?.length > 0 ? (
            <div className="grid grid-cols-2 mt-5 gap-3 w-full">
              {listOfRestaurants?.Explore?.list
                ?.slice(
                  0,
                  showMore ? listOfRestaurants?.Explore?.list?.length : 15
                )
                ?.map((val) => (
                  <div className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center" onClick={()=>HandleFoodCategoryNavigate(val?.link?.replace('https://www.swiggy.com/',''))}>
                    {val?.text}
                  </div>
                ))}
              {/* {!showMore && (
                <div
                  className="py-3 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center"
                  onClick={() => setshowMore(true)}
                >
                  Show More <FaChevronDown />
                </div>
              )} */}
            </div>
          ) : (
            <div className="restaurant-container grid grid-cols-2 mt-5 gap-4">
              {Array.from({ length: 4 }).map((val, i) => {
                return (
                  <div className="card bg-[#d4d4d485] animate-pulse    py-5 px-1 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap font-bold text-[16px] border rounded-lg text-center flex items-center gap-2 justify-center" />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
