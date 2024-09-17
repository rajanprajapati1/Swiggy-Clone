import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { formatPrice } from "./../../../../hooks/UseFormater";
import { MenuImg } from "../../../../config/Config";
import { IoStar } from "react-icons/io5";
import ReModal from "./../../../../components/ReModal";
import Quantity from "./Quantity";

export const CustomAccordionItem = ({
  title,
  isList,
  itemdata,
  isOpen,
  iskey,
  onClick,
  isHaveItemCard,
  isHaveItemlength,
  price,
  discountBefore,
}) => {
  const [isModalOpen, setModalOpen] = useState(null);

  return (
    <>
      <ReModal isOpen={isModalOpen} onClose={() => setModalOpen(null)} />
      <div className="border-b mt-2 border-gray-200 w-full">
        {/* {isList &&  <div className="block-top w-full py-1 px-1 ">
          {!isList && <span className="font-extrabold text-base">
          {title} 12
          </span>}
        </div>} */}
        {iskey ? (
          <button
            className="flex justify-between items-center w-full py-4 px-1 text-left"
            onClick={onClick}
          >
            <span className="text-gray-800 font-extrabold" id="">
              {title}&nbsp;
              {isHaveItemlength && `(${isHaveItemlength})`}
            </span>
            <IoChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        ) : (
          // {/* ItemCard Card */}
          <div className="flex justify-between items-center w-full py-4 px-1 mb-2">
            <div className="details flex-1 flex-col flex">
              <span className="title text-lg text-gray-800 font-extrabold">
                {title}
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
                  {
                    itemdata?.card?.info?.ratings?.aggregatedRating
                      ?.ratingCountV2
                  }
                  )
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
                                     {Object?.keys(itemdata?.card?.info?.variantsV2).length > 0
 ? (
                <button
                  className="bg-white border absolute  text-lg text-blue-950 uppercase -bottom-3 font-extrabold rounded-md shadow-md px-6 py-[2px] hover:bg-gray-200 "
                  onClick={() => setModalOpen(itemdata?.card?.info)}
                >
                  Add
                </button>
              ) : (
                <Quantity />
              )}
            </div>
          </div>
        )}
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isOpen ? "max-h-[800vh]" : "max-h-0"
          }`}
        >
          {/* categorie Card */}
          <div className="py-2 flex flex-col gap-4 ">
            <div className="w-full  py-4 flex flex-col">
              {isHaveItemCard &&
                isHaveItemCard?.map((val, i) => {
                  const price =
                    formatPrice(val?.card?.info?.finalPrice) ||
                    formatPrice(val?.card?.info?.defaultPrice) ||
                    formatPrice(val?.card?.info?.price);

                  const discountBefore =
                    formatPrice(val?.card?.info?.price) ||
                    formatPrice(val?.card?.info?.defaultPrice);

                  return (
                    <div className="flex justify-between items-center w-full py-4 px-1 mb-2">
                      <div className="details flex-1 flex-col flex">
                        <span className="title text-lg text-gray-800 font-extrabold">
                          {val?.card?.info?.name}
                        </span>
                        <span className="price text-lg mt-1 text-gray-800 font-bold">
                          {" "}
                          <span className="font-normal text-base text-gray-400 line-through">
                            ₹ {discountBefore}
                          </span>{" "}
                          ₹ {price}
                        </span>
                        {val?.card?.info?.ratings?.aggregatedRating?.rating && (
                          <span className="rating mt-2 flex items-center font-semibold text-sm gap-1">
                            <IoStar size={12} />
                            {val?.card?.info?.ratings?.aggregatedRating?.rating}
                            &nbsp;(
                            {
                              val?.card?.info?.ratings?.aggregatedRating
                                ?.ratingCountV2
                            }
                            )
                          </span>
                        )}
                        {val?.card?.info?.description && (
                          <p className="mt-3 text-slate-500 text-[16px] tracking-tight pr-16">
                            {val?.card?.info?.description}
                          </p>
                        )}
                      </div>
                      <div className="images relative flex w-[10vw]  items-center justify-center h-[10vw] flex-col">
                        {val?.card?.info?.imageId && (
                          <img
                            src={MenuImg + val?.card?.info?.imageId}
                            className="w-full h-full object-cover rounded-xl shadow-md"
                            alt=""
                          />
                        )}
                        {Object?.keys(val?.card?.info?.variantsV2).length > 0
                        ? (
                          <button
                            className="bg-white border absolute  text-lg text-blue-950 uppercase -bottom-3 font-extrabold rounded-md shadow-md px-6 py-[2px] hover:bg-gray-200 "
                            onClick={() => setModalOpen(val?.card?.info)}
                          >
                            Add
                          </button>
                        ) : (
                          <Quantity />
                        )}
                        {/* </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function CustomAccordion({ title, isList, data, totalMenuInd }) {
  const [openItems, setOpenItems] = useState([]);
  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <>
      <div className="w-full bg-white   overflow-hidden">
        <button
          className="flex justify-between items-center w-full py-4 px-1 text-left"
          onClick={() => toggleItem(188)}
        >
          <span
            className="text-gray-800 text-xl font-extrabold"
            name={title}
            id={title}
          >
            {title} &nbsp;
            {totalMenuInd && `(${totalMenuInd})`}
          </span>
          <IoChevronDown
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              !openItems.includes(188) ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            !openItems.includes(188) ? "max-h-[800vh]" : "max-h-0"
          }`}
        >
          {data?.map((item, index) => (
            <CustomAccordionItem
              key={index}
              itemdata={item}
              length={totalMenuInd}
              title={item?.card?.info?.name}
              price={
                formatPrice(item?.card?.info?.finalPrice) ||
                formatPrice(item?.card?.info?.defaultPrice) ||
                formatPrice(item?.card?.info?.price)
              }
              discountBefore={
                formatPrice(item?.card?.info?.price) ||
                formatPrice(item?.card?.info?.defaultPrice)
              }
              isList={isList}
              iskey={false}
              isOpen={openItems.includes(index)}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
      <div className="block bg-gray-200 py-2"></div>
    </>
  );
}

export const AccordianListMenu = ({
  title,
  data,
  isList,
  index = 1,
  totalMenuInd,
}) => {
  const [openItems, setOpenItems] = useState([]);
  const toggleItem = (index) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <>
      <div className="w-full bg-white   overflow-hidden">
        <button
          className="flex justify-between items-center w-full py-4 px-1 text-left"
          onClick={toggleItem}
        >
          <span
            className="text-gray-800 font-extrabold"
            name={title} // Dynamically set name attribute based on title
            id={title}
          >
            {title}
          </span>
        </button>

        {data?.map((item, index) => (
          <CustomAccordionItem
            key={index}
            data={item}
            length={totalMenuInd}
            title={item?.title}
            iskey={true}
            title2={"item"}
            isList={isList}
            isHaveItemCard={item?.itemCards}
            isHaveItemlength={item?.itemCards?.length}
            //  nestedData={}
            isOpen={openItems.includes(index)}
            onClick={() => toggleItem(index)}
          />
        ))}
      </div>

      <div className="block bg-gray-200 py-2"></div>
    </>
  );
};
