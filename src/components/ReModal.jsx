import React, { useEffect, useState } from "react";
import { MediaLogo } from "../config/Config";
import { formatPrice } from "../hooks/UseFormater";

const ReModal = ({ isOpen, onClose }) => {
  const [selectedPrice, setselectedPrice] = useState(0);
  const [showCust, setshowCust] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isOpen]);

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-container")) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="modal-container w-full h-screen bg-[#6d6c6c96] flex items-center justify-center top-0 left-0 fixed z-[55555]"
    >
      <div className="modal  py-5 rounded-xl bg-[#F2F2F2] relative px-6">
        {/* Close Icon */}
        <button
          className="absolute top-2 shadow-lg w-6 h-6 rounded-full right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="modal-content relative flex flex-col w-[600px]">
          <div className="title_p flex items-center gap-2 text-slate-500">
            <span className="font-bold ">{isOpen?.name}</span>{" "}
            <span className="text-2xl">&#183; </span>
            <span className="text-sm">
              ₹{formatPrice(isOpen?.defaultPrice)}
            </span>{" "}
            - ₹
            {formatPrice(
              isOpen?.variantsV2?.pricingModels?.[
                isOpen?.variantsV2?.pricingModels?.length - 1
              ]?.price
            )}
          </div>
          <div className="custom">
            <h1 className="text-[21px] font-extrabold  text-slate-700">
              Customise as per your taste{" "}
            </h1>
          </div>
          <hr className="bg-slate-500 mt-2 mb-2" />
          <div className="cust_list">
            {isOpen?.variantsV2 &&
              isOpen?.variantsV2?.variantGroups?.map((val, i) => {
                return (
                  <div className="ingrid" key={i}>
                    <div className="title font-extrabold text-slate-900 text-base capitalize">
                      {val?.name}
                    </div>
                    {val?.variations && (
                      <div className="list_var flex flex-col gap-6 bg-white rounded-xl px-4 py-4 mt-2">
                        {val?.variations?.map((ing, i) => {
                          return (
                            <div
                              className="ing-card flex  items-center justify-between cursor-pointer"
                              onClick={() => {setselectedPrice(i); setshowCust(false)}}
                            >
                              <div className="left text-base font-medium text-gray-900">
                                {ing?.name}
                              </div>
                              <div className="right flex items-center gap-3 font-medium text-gray-700">
                                ₹ {ing?.price}
                                <div
                                  className={`relative w-[19px] border h-[19px] ${
                                    selectedPrice === i &&
                                    `ring-1 ring-[orange] ring-offset-2 bg-[orange]`
                                  }  rounded-full`}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className=" bottom-0 flex flex-col mt-3 w-full">
        { showCust && <div className="list_var flex flex-col bg-white rounded-xl px-4 mb-3 pt-4">
           <div className="cu flex items-center text-sm gap-2 font-medium text-gray-500">
           <span>{isOpen?.variantsV2?.variantGroups?.[0]?.name }</span>
                <span>{
                  isOpen?.variantsV2?.variantGroups?.[0]?.variations?.[selectedPrice]?.name
                }</span>
           </div>
          <hr className="bg-slate-500 mt-2 mb-2" />
          </div>}
          <div className="total_cust  bottom-0 flex items-center justify-between mt- w-full">
            <div className="left flex-1 flex flex-col">
              <span className="font-extrabold text-xl text-gray-700">
                ₹{" "}
                {formatPrice(
                  isOpen?.variantsV2?.pricingModels?.[selectedPrice]?.price
                ).toFixed(2)}
              </span>
              <span onClick={()=>setshowCust(!showCust)} className="text-[orange] cursor-pointer font-extrabold text-sm">
                View Customized Item
              </span>
            </div>
            <div className="right flex-1 flex items-center justify-center">
              <button className="bg-[#151B2B] py-3 px-3 text-white flex-1 hover:scale-[0.98] transition ease-in rounded-lg font-bold capitalize">
                Add Item to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReModal;
