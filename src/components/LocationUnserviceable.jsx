import React from "react";
import LocationUnserviceableImg from "../assets/location_unserviceable.avif";

const LocationUnserviceable = () => {
  return (
    <div className="w-full h-screen text-center flex flex-col items-center justify-center">
      <div className="image">
        <img
          src={LocationUnserviceableImg}
          alt=""
          className="w-[238px] m-auto aspect-[ 238 / 238] h-[238px]"
        />
        <h1 className="font-extrabold py-2 text-xl">Location Unserviceable </h1>
        <p className="text-[#BFBFBF] text-lg w-[70%] leading-tight m-auto">
          We don’t have any services here till now. Try changing location.
        </p>
      </div>
    </div>
  );
};

export default LocationUnserviceable;
