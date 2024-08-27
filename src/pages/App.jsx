import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./../components/Header";
import Footer from "./../components/Footer";
import HomePage from "./Homepage/home";
import SearchPage from "./SearchPage/search";
import LandingPage from "./../components/LandingPage";
import ErrorPage from "./../components/ErrorPage";

const App = () => {
  const isLocationHave = JSON?.parse(localStorage?.getItem("swgy_userLocation")) ;
  return (
    <BrowserRouter>
      <Navbar />
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
        <Route path="/restaurants/*" element={<div>restaurants</div>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
