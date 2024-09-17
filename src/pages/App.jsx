import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./../components/Header";
import Footer from "./../components/Footer";
import HomePage from "./Homepage/home";
import SearchPage from "./SearchPage/search";
import LandingPage from "./../components/LandingPage";
import ErrorPage from "./../components/ErrorPage";
import VerifyEmail from './../components/VerifyEmail';
import useOnlineStatus from "../hooks/useOnlineStatus";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useSwiggy } from "../context/SwiggyAuth";
import RestaurantsPage from "./RestaurantsPage/RestaurantsPage";

const OfflineNotification = () => (
  <div className="text-white">
    <div className="text-base font-semibold">Connection Error</div>
    <div className="text-xs">Please check your network and try again.</div>
  </div>
);

const App = () => {
  const {setUser ,user} = useSwiggy()
  const isOnline = useOnlineStatus();
  const isLocationHave = JSON?.parse(localStorage?.getItem("swgy_userLocation")) ;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      toast(<OfflineNotification/>,{
        position : "bottom-center",
        className : 'bg-gray-800 rounded-[2px]',
        hideProgressBar: true,  
      })
    }
  }, [isOnline]);

  const CheckUserIsLogin = async()=>{
    try {
      const res = await fetch(`http://localhost:3000/api/v1/auth/verify-user`, {
        method: "GET",
        credentials : "include",
      });
      const data = await res.json();
      if (res.ok || res.status === 200) {
        setIsAuthenticated(true);
        setUser(data?.user)
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  useEffect(()=>{
    CheckUserIsLogin();
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  },[])

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLocationHave !== null ? (
              <HomePage />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/collections/*" element={<div>colections</div>}/>
        <Route path="/city/*" element={<RestaurantsPage/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/" element={<div>restaurants</div>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
  
};

export default App;
