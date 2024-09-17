import { Link, useParams } from "react-router-dom";
// import useRestaurantDetails from '../hooks/useRestaurantDetails';
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { IoMdStar } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Hamburger from "../pages/RestaurantsPage/components/Hamburger";
import Title from "../pages/RestaurantsPage/components/Title";
import RestaurantBanner from "../pages/RestaurantsPage/components/RestaurantBanner";
import ResSkeleton from "../pages/RestaurantsPage/components/ResSkeleton";
import DealsCarousel from "../pages/RestaurantsPage/components/DealsCarousel";
import MenuTitle from "../pages/RestaurantsPage/components/MenuTitle.jsx";
import SearchBar from "../pages/RestaurantsPage/components/SearchBar.jsx";
import RestaurantMenu from "../pages/RestaurantsPage/components/RestaurantMenu.jsx";

const RestaurantDetails = ({
  restaurantData,
  urlparts,
  Loading,
  isOpenSearch,
  onOpen,
}) => {
  
  if (Loading) {
    return <ResSkeleton />;
  }


  return (
    <div className="max-w-[800px] min-h-[800px] mx-auto pb-[40px]">
      <Hamburger
        urlparts={urlparts}
        title={restaurantData?.[0]?.card?.card?.text}
      />
      <Title title={restaurantData?.[0]?.card?.card?.text} data={restaurantData?.[2]} />
      <RestaurantBanner data={restaurantData?.[2]} />
      <DealsCarousel
        data={
          restaurantData?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers
        }
        title={"Deals for you"}
      />
      <MenuTitle />
      <SearchBar isOpenSearch={isOpenSearch} onOpen={onOpen} />
      <RestaurantMenu data={restaurantData?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards}/>
      {/* <hr className="my-6 border-t-8" /> */}
    </div>
  );
};

export default RestaurantDetails;

{
  /* <div className="flex ">
                <div className="flex-1">
                    <h2 className="font-bold text-[1.33rem] text-[#282c3f] mb-2">{restaurant?.name}</h2>
                    <p className="text-[0.83rem] text-[#7e808c] mb-1">{restaurant?.cuisines.join(" ,")}</p>
                    <p className="text-[0.83rem] text-[#7e808c]">{restaurant?.areaName}, {restaurant?.city}</p>
                </div>
                <div className="p-2 font-bold self-start border max-w-[100px] rounded-md text-green-600">
                    <div className="flex items-center justify-center mb-2 pb-2.5 border-b-[1px] border-[#e9e9eb]">
                        <IoMdStar size={21} />
                        <span className="ml-0.5 text-[13px] font-bold">
                            {restaurant?.avgRating}
                        </span>
                    </div>    
                    <div className="font-semibold text-[10px] text-[#8b8d97]">{restaurant?.totalRatingsString}</div>
                </div>
            </div>

            <hr className="border-dashed my-5" /> */
}

{
  /* <div className="flex justify-start">
                <span className="mr-7 font-bold text-sm flex items-center">
                    <FaClock className="mr-2" size={20} />
                    <span>{restaurant?.sla?.deliveryTime} MINS</span>
                </span>
                <span className="font-bold text-sm">
                    {restaurant?.costForTwoMessage}
                </span>
            </div> */
}
{
  /* {categories?.map((category, index) => (
                <RestaurantCategory 
                    key={index} 
                    data={category?.card?.card}  
                    restaurant={restaurant}
                />
            ))} */
}

{
  /* Cart Details */
}
{
  /* {
                cartItems && cartItems?.length > 0 &&
                <div className="fixed bottom-0 h-14 flex text-white justify-between py-2 px-4 items-center max-w-[800px] min-w-[800px] bg-[#60b246]">
                    <div className="text-sm font-medium">{cartItems?.length} items | ₹{totalAmount}</div>
                    
                    <Link to="/checkout" className="flex items-center uppercase text-sm font-semibold">
                        <span className="mr-2">
                            View Cart
                        </span>
                        <FiShoppingBag size={15} />
                    </Link>
                </div>
            } */
}
