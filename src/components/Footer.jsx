import React from "react";
import { useMatch } from "react-router-dom";
import { SiSwiggy } from "react-icons/si";

const Footer = () => {
  const match = useMatch("/search");

  if (match) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row justify-center min-h-[104px] max-h-[136px] items-center bg-[#f0f0f5]">
        <div className="w-[458px] max-h-[64px] my-auto mr-24 ">
          <div className="text-[26px] leading-8 text-[#02060cbf] font-extrabold">
            For better experience,download the Swiggy app now
          </div>
        </div>
        <div className="flex flex-row justify-center h-16 my-auto mx-2">
          <img
            className="h-[64px] my-auto mx-[12px] "
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
            alt=""
          />
          <img
            className="h-[64px] my-auto mx-[12px] "
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#02060c] px-[12%] py-[4rem]">
        <div className="text-white flex items-center">
          <SiSwiggy size={30} />
          <span className="ml-3 text-lg font-semibold">
            Swiggy © 2024 Bundl Technologies Pvt.Ltd
          </span>
        </div>
        <div className="text-white pr-10">
          Made By
          <a
            href="https://www.linkedin.com/in/rajanprajapati1/"
            className="text-[#fc8019]"
            target="_blank"
          >
            {" "}
            Rajan
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
