import React from "react";

const ResSkeleton = () => {
  return (
    <div className="max-w-[800px]  flex flex-col gap-1  mx-auto pb-[1rem]">
      <div className="title w-1/2 py-5 rounded-md mt-5 animate-pulse bg-gray-200" />
      <div className="title w-full py-14 rounded-md mt-5 animate-pulse bg-gray-200" />
      <div className="title w-full py-28 rounded-md mt-5 animate-pulse bg-gray-200" />
      <div className="title w-full flex gap-4 rounded-md mt-5">
        <div className="square py-28 rounded-md flex-1 px-24 bg-gray-200"></div>
        <div className="square rounded-md flex-1  flex flex-col gap-2">
          <div className="para w-1/2 py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="btn flex items-center gap-2 mt-2 justify-between">
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="title w-full flex gap-4 rounded-md mt-5">
        <div className="square py-28 rounded-md flex-1 px-24 bg-gray-200"></div>
        <div className="square rounded-md flex-1  flex flex-col gap-2">
          <div className="para w-1/2 py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="btn flex items-center gap-2 mt-2 justify-between">
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="title w-full flex gap-4 rounded-md mt-5">
        <div className="square py-28 rounded-md flex-1 px-24 bg-gray-200"></div>
        <div className="square rounded-md flex-1  flex flex-col gap-2">
          <div className="para w-1/2 py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="para w-full py-2 rounded-md bg-gray-200 animate-pulse "></div>
          <div className="btn flex items-center gap-2 mt-2 justify-between">
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="py-5 flex-1 px-8 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="title w-full py-4 flex gap-2  rounded-md  mt-1 ">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div className="animate-pulse bg-gray-200 py-24 rounded-md px-5  flex-1 "></div>
          );
        })}
      </div>
    </div>
  );
};

export default ResSkeleton;
