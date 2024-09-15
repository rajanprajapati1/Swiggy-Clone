import React, { useState } from "react";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { GoSearch } from "react-icons/go";

const ParticularResSearch = ({
  showSearchBar,
  setshowSearchBar,
  placeholder,
}) => {
    const [Search,setSearch] =useState(false);
  const HandleSearchInput = (query) => {
    setSearch(true)
    console.log(query)
    setTimeout(() => {
        setSearch(false)
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
          onChange={(e) => {HandleSearchInput(e.target.value); }}
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
