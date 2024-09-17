import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RestaurantDetails from "./../../components/RestaurantDetails";
import useApi from "../../apis/ApiConfig";
import ParticularResSearch from "./components/ParticularResSearch";

const RestaurantsPage = () => {
  const { key, pathname, search } = useLocation(); 
  const resId = pathname?.split("-");
  const total = resId?.[resId?.length - 1]?.replace("rest", "");
  const location = JSON?.parse(localStorage?.getItem("swgy_userLocation"));
  const [data, setdata] = useState({});
  const [Loading, setLoading] = useState(false);
  const [showSearchBar, setshowSearchBar] = useState(false);
  const navigate = useNavigate();

  const toggleSearchBar = (isSearchOpen) => {
    if (isSearchOpen) {
      navigate(`${pathname}?search=true`, { replace: true });
    } else {
      navigate(pathname, { replace: true }); 
    }
    setshowSearchBar(isSearchOpen); 
  };

  const GetRestMenu = async () => {
    setLoading(true);
    try {
      const payload = {};
      const data = await useApi.GetRestaurantWieseMenu(
        location.lat,
        location.lng,
        total
      );
      setdata(data?.cards);
      setLoading(false);
      GetMenuList(data?.cards)
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left : 0
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    GetRestMenu();
  }, [pathname]);
  
  useEffect(()=>{
    document.title = data?.[0]?.card?.card?.text ?? 'Online Food Delivery';
  },[key])

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const isSearchOpen = queryParams.get("search") === "true";
    setshowSearchBar(isSearchOpen); 
  }, [search]); 

  return (
    <div>
      {!showSearchBar && (
        <RestaurantDetails
          restaurantData={data}
          urlparts={resId}
          Loading={Loading}
          isOpenSearch={showSearchBar}
          onOpen={() => toggleSearchBar(true)}
        />
      )}
      {showSearchBar && (
        <ParticularResSearch
          placeholder={data?.[0]?.card?.card?.text}
          showSearchBar={showSearchBar}
          setshowSearchBar={() => toggleSearchBar(false)} 
        />
      )}
    </div>
  );
};

export default RestaurantsPage;
