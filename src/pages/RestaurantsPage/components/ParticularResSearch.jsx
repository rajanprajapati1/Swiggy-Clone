import React, { useEffect, useState } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { GoSearch } from "react-icons/go";
import { useSwiggy } from "../../../context/SwiggyAuth";
import Quantity from "./Reuse/Quantity";
import { formatPrice } from "./../../../hooks/UseFormater";
import { MenuImg } from "../../../config/Config";
import { IoStar } from "react-icons/io5";

const ParticularResSearch = ({
  showSearchBar,
  setshowSearchBar,
  placeholder,
}) => {
  const [Search, setSearch] = useState(false);
  const { Searchhlist } = useSwiggy();
  const [List, setList] = useState([]);

  useEffect(() => {
    if (Array.isArray(Searchhlist)) {
      const allItems = Searchhlist.reduce((accumulator, currentCategory) => {
        if (!currentCategory?.items) return accumulator; // Return the current accumulator if no items

        return [...accumulator, ...currentCategory?.items];
      }, []);
      setList(allItems);
      console.log(allItems); 
    } else {
      console.log("Searchhlist is not an array or is undefined:", Searchhlist);
    }
  }, [Searchhlist]);
  const HandleSearchInput = (query) => {
      const queryLowerCase = query?.toLocaleLowerCase();
      const newFilteredData = List?.filter((val) => {
        return val?.card?.info?.name?.toLocaleLowerCase().includes(queryLowerCase);
      });
  
      setSearch(true);
      setTimeout(() => {
        setList(newFilteredData); // Update List with filtered data
        setSearch(false);
      }, 1000);
    };
  return (
    <div className="max-w-[800px] min-h-[800px] mx-auto pb-[100px]">
      <SearchBar
        placeholder={placeholder}
        setshowSearchBar={setshowSearchBar}
        HandleSearchInput={HandleSearchInput}
        setSearch={setSearch}
      />
      {Search && <SearchSuggestionSkeleton />}
      <div>
        {List?.map((itemdata, i) => {
          return (
            <div className="flex justify-between items-center w-full py-10 px-1 mb-2">
              <SearchCard
                price={
                  formatPrice(itemdata?.card?.info?.finalPrice) ||
                  formatPrice(itemdata?.card?.info?.defaultPrice) ||
                  formatPrice(itemdata?.card?.info?.price)
                }
                discountBefore={
                  formatPrice(itemdata?.card?.info?.price) ||
                  formatPrice(itemdata?.card?.info?.defaultPrice)
                }
                itemdata={itemdata}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticularResSearch;

const SearchBar = ({ setshowSearchBar, placeholder, HandleSearchInput }) => {
  return (
    <>
      <div className="search_input flex cursor-pointer items-center px-4 py-5 gap-4 ">
        <span
          onClick={() => setshowSearchBar(false)}
          className="flex items-center justify-center text-gray-500"
        >
          <LiaLongArrowAltLeftSolid size={24} />
        </span>
        <input
          onChange={(e) => {
            HandleSearchInput(e.target.value);
          }}
          className="flex items-center justify-center outline-none font-medium border-none placeholder-shown:font-medium flex-1 bg-transparent"
          type="text"
          placeholder={`Search in ${placeholder}`}
        />
        <span className="flex items-center justify-center text-gray-500">
          <GoSearch size={24} />
        </span>
      </div>
    </>
  );
};

const SearchSuggestionSkeleton = () => {
  return (
    <>
      <div className="skeleton w-full px-4 flex flex-col mt-1 gap-1">
        {Array.from({ length: 10 }).map((_, a) => {
          return (
            <div className="w-full flex gap-2 py-2 px-2 rounded ">
              <div className="square w-[90px] py-8 bg-gray-200 animate-pulse "></div>
              <div className="line w-full flex flex-col gap-1 mt-1 ">
                <div className="line bg-gray-200 py-1 w-[40%] animate-pulse "></div>
                <div className="line bg-gray-200 py-1 w-full animate-pulse "></div>
                <div className="line bg-gray-200 py-1 w-full animate-pulse "></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const SearchCard = ({ price, discountBefore, itemdata }) => {
  return (
    <>
      <div className="details flex-1 flex-col flex">
        <span className="title text-lg text-gray-800 font-extrabold">
          {itemdata?.card?.info?.name}
        </span>
        <span className="price text-lg mt-1 text-gray-800 font-bold">
          {" "}
          <span className="font-normal text-base text-gray-400 line-through">
            ₹ {discountBefore}
          </span>{" "}
          ₹ {price}
        </span>
        {itemdata?.card?.info?.ratings?.aggregatedRating?.rating && (
          <span className="rating mt-2 flex items-center font-semibold text-sm gap-1">
            <IoStar size={12} />
            {itemdata?.card?.info?.ratings?.aggregatedRating?.rating}
            &nbsp;(
            {itemdata?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})
          </span>
        )}
        {itemdata?.card?.info?.description && (
          <p className="mt-3 text-slate-500 text-[16px] tracking-tight pr-16">
            {itemdata?.card?.info?.description}
          </p>
        )}
      </div>
      <div className="images relative flex w-[10vw]  items-center justify-center h-[10vw] flex-col">
        {itemdata?.card?.info?.imageId && (
          <img
            src={MenuImg + itemdata?.card?.info?.imageId}
            className="w-full h-full object-cover rounded-xl shadow-md"
            alt=""
          />
        )}
        {Object?.keys(itemdata?.card?.info?.variantsV2).length !== 0 ? (
          <button
            className="bg-white border absolute  text-lg text-blue-950 uppercase -bottom-3 font-extrabold rounded-md shadow-md px-6 py-[2px] hover:bg-gray-200 "
            // onClick={() => setModalOpen(itemdata?.card?.info)}
          >
            Add
          </button>
        ) : (
          <Quantity />
        )}
      </div>
    </>
  );
};
