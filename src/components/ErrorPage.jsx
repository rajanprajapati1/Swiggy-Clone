import {  useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const userLocation = JSON.parse(localStorage.getItem("swgy_userLocation"));

  if (!userLocation) {
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="">Oops!</h1>
      <h2 className="">Something went wrong!</h2>
      <br />
    </div>
  );
};

export default ErrorPage;
