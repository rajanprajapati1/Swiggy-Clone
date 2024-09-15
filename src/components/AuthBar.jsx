import React, { createRef, useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineMyLocation } from "react-icons/md";
import Image from "../assets/ro.avif";
import UseValidation from "./../hooks/UseValidation";
import { useNavigate } from "react-router-dom";
import otpimage from '../assets/otp3.svg'

const AuthBar = ({ show, onClose ,setShowSidebar }) => {
  const [AuthClick, setAuthClick] = useState(false);
  const [show1, setshow1] = useState(false);
  const [isVerification, setisVerification] = useState(false);
  const [Loading ,setloading] = useState(false);
  const [SingupForm, setSingupForm] = useState({
    PhoneNumber: "",
    Name: "",
    Email: "",
  });
  const [Login, setLogin] = useState({
    Email: "",
  });
  const [errors, setErrors] = useState({});

  const SignUpFormHandler = async () => {
    setloading(true)
    try {
      const validationErrors = UseValidation(SingupForm,'register');

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      const res = await fetch(`http://localhost:3000/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials : "include",
        body: JSON.stringify({
          name: SingupForm.Name,
          email: SingupForm.Email,
          phoneNumber: SingupForm.PhoneNumber,
        }),
      });
      const data = await res.json();
      if (res.ok || res.status === 200) {
        setshow1(true);
        setisVerification(true);
      }
      setErrors({});
      setSingupForm({
        Email: "",
        Name: "",
        PhoneNumber: "",
      });
    } catch (error) {
      console.log(error);
    }
    finally{
    setloading(false)
    }
  };

  const LoginFormHanlder = async () => {
    setloading(true)
    try {
      const validationErrors = UseValidation(Login,'login');

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      const res = await fetch(`http://localhost:3000/api/v1/auth/login`, {
        method: "POST",
        credentials : "include",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Login.Email,
        }),
      });
      const data = await res.json();
      if (res.ok || res.status === 200) {
        setshow1(true);
        setisVerification(true);
      }
      setErrors({});
      setLogin({
        Email: "",
      });
    } catch (error) {
      console.log(error);
    }
    finally{
    setloading(false)
    }
  };
  useEffect(() => {
    if (!show) {
      setErrors({});
      setSingupForm({});
      setAuthClick(false);
      setisVerification(false)
    }
  }, [show]);

  return (
    <div
      className={`fixed top-0 left-0 right-auto h-full overflow-y-hidden bg-white z-[10001] 
            transition-transform ${
              show ? "translate-x-[182%]" : "translate-x-[500%]"
            } duration-[0.3s] ease-in-out`}
    >
      <div className="relative h-screen">
        {isVerification ? (
          <VerificationTab show1={setshow1} show={show} setShowSidebar={setShowSidebar}  />
        ) : (
          <div className="w-[480px] pr-[45px] pl-[45px]">
            <div className="mb-[30px] pt-[32px] flex justify-start">
              <RxCross2
                onClick={onClose}
                size={26}
                color="#3d4152"
                className="cursor-pointer font-normal"
              />
            </div>
            <div className="relative pb-[40px]">
              <div className=" relative flex item-center justify-between">
                <div className="title flex flex-col gap-3">
                  <span className="text-3xl font-bold">
                    {AuthClick ? "Sign up" : "Login"}{" "}
                  </span>
                  <span onClick={() => setAuthClick(!AuthClick)}>
                    or{" "}
                    <span className="text-[#FF5200] cursor-pointer">
                      {AuthClick
                        ? "create an account"
                        : "login to your account"}{" "}
                    </span>{" "}
                  </span>
                  <span className="border border-black w-8"></span>
                </div>
                <div className="image w-[100px] h-[100px]">
                  <img src={Image} className="w-full h-full object-cover" />
                </div>
              </div>
              {!AuthClick ? (
                <LoginForm form={Login} setfrom={setLogin} errors={errors}/>
              ) : (
                <Singupform
                  setSingupForm={setSingupForm}
                  SingupForm={SingupForm}
                  errors={errors}
                />
              )}
              {/* {AuthClick == null && <OtpVerification />} */}
              <div className="button w-full py-5">
                {!AuthClick ? (
                  <button onClick={()=>LoginFormHanlder()} className="outline-none flex items-center justify-center bg-[#FF5200]  font-bold text-sm text-white uppercase -tracking-tighter w-full py-5 active:scale-[.97]">
                    { Loading ? (<>
                  <div className="w-5 h-5  border-white border-4 border-r-0 rounded-full mr-2 animate-spin"></div>
                  <span className="text-sm">Preparing your favorite dishes...</span>
                 </>) :  'Login'}
                  </button>
                ) : (
                  <button
                    className="outline-none flex items-center justify-center bg-[#FF5200]  font-bold text-sm text-white uppercase -tracking-tighter w-full py-5 active:scale-[.97]"
                    onClick={() => SignUpFormHandler()}
                  >
                 { Loading ? (<>
                  <div className="w-5 h-5 border-white border-4 border-r-0 rounded-full mr-2 animate-spin"></div>
                  <span className="text-sm">we’re cooking up your account!</span>
                 </>) :  'Continue'}
                  </button>
                )}
              </div>
              <div className="terms w-full">
                {AuthBar ? (
                  <p className="text-[13px] font-medium">
                    By clicking on Login, I accept the{" "}
                    <strong className="font-bold">
                      Terms & Conditions & Privacy Policy
                    </strong>
                  </p>
                ) : (
                  <p className="text-[13px] font-medium">
                    By creating an account, I accept the
                    <strong className="font-bold">
                      Terms & Conditions & Privacy Policy
                    </strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthBar;

const Singupform = ({ setSingupForm, SingupForm, errors }) => {
  return (
    <>
      <div className="input_swig_box w-full  py-4 border flex items-center justify-center">
        <div className="input_Swig w-full px-4 relative ">
          <input
            type="text"
            id="swigy"
            className="w-full py-2  outline-none font-bold text-lg"
            name="PhoneNumber"
            value={SingupForm?.PhoneNumber}
            onChange={(e) =>
              setSingupForm((prev) => ({
                ...prev,
                PhoneNumber: e.target.value,
              }))
            }
          />
          <label htmlFor="swigy" className="swig_label">
            Phone number
          </label>
          {errors?.PhoneNumber && (
            <strong className="absolute left-5 text-xs text-red-500 z-50 -bottom-2  ">
              {errors?.PhoneNumber}
            </strong>
          )}
        </div>
      </div>
      <div className="input_swig_box w-full  py-4 border flex items-center justify-center">
        <div className="input_Swig w-full px-4 relative ">
          <input
            type="text"
            id="swigy"
            value={SingupForm?.Name}
            className="w-full py-2  outline-none font-bold text-lg"
            onChange={(e) =>
              setSingupForm((prev) => ({ ...prev, Name: e.target.value }))
            }
            name="Name"
          />
          <label htmlFor="swigy" className="swig_label">
            Name
          </label>
          {errors?.Name && (
            <strong className="absolute left-5 text-xs text-red-500 z-50 -bottom-2  ">
              {errors?.Name}
            </strong>
          )}
        </div>
      </div>
      <div className="input_swig_box w-full  py-4 border flex items-center justify-center">
        <div className="input_Swig w-full px-4 relative ">
          <input
            type="text"
            id="swigy"
            name="Email"
            value={SingupForm?.Email}
            onChange={(e) =>
              setSingupForm((prev) => ({
                ...prev,
                Email: e.target.value,
              }))
            }
            className="w-full py-2  outline-none font-bold text-lg"
          />
          <label htmlFor="swigy" className="swig_label">
            Email
          </label>
          {errors?.Email && (
            <strong className="absolute left-5 text-xs text-red-500 z-50 -bottom-2  ">
              {errors?.Email}
            </strong>
          )}
        </div>
      </div>
    </>
  );
};

const LoginForm = ({
  form ,
setfrom
}) => {
  return (
    <>
      <div className="input_swig_box w-full  py-4 border flex items-center justify-center">
        <div className="input_Swig w-full px-4  ">
          <input
            type="text"
            id="swigy"
            className="w-full py-2  outline-none font-bold text-lg"
            value={form?.Email}
            name="Email"
            onChange={(e) =>
              setfrom((prev) => ({
                ...prev,
                Email: e.target.value,
              }))
            }
          />
          <label htmlFor="swigy" className="swig_label">
            Email
          </label>
        </div>
      </div>
    </>
  );
};

const VerificationTab = ({ setShowSidebar ,show}) => {
  return (
    <>
            <OtpVerification setShowSidebar={setShowSidebar} show={show}/>
    </> 
  );
};

const OtpVerification = ({setShowSidebar ,show}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);
  const Navigate = useNavigate(null);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    if (/^\d$/.test(value)) { // Only accept a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // Move to the next input field if not the last one
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") { // Clear the current input
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };
  
  const handleKey = (e, index) => {
    const value = e.target.value;
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; 
      setOtp(newOtp);
  
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } 
  };
  
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = otp.map((_, i) => pastedData[i] || "");
    setOtp(newOtp);

    if (pastedData.length === 6) {
      inputRefs.current[5].focus();
    } else {
      inputRefs.current[pastedData.length].focus();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/verify-email",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp.join(""),
            email: "Prajapatirajan776@gmail.com",
          }),
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setMessage(data.message);
        setShowSidebar(false) 
        Navigate("/")
      } else {
        setMessage(data.error || "Verification failed");
      }
    } catch (error) {
      setMessage("Verification failed");
    }
  };
  useEffect(()=>{
    setOtp(new Array(6).fill(""))
  },[show])
  return (
    <>
      <div className="flex items-center ">
  <div className="py-10 px-8 rounded-lg bg-white w-full">
    
  <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
      Verify Your Email
    </h2>
    <div className="illustratio py-6 w-full flex items-center justify-center">
      <img className="w-32" src={otpimage} alt="" />
    </div>
    <p className="text-gray-600 text-center mb-6">
      Enter the 6-digit OTP sent to your email
    </p>
    <div
      className="flex justify-center space-x-4 mb-6"
      onPaste={handlePaste}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKey(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          className="border border-gray-300 outline-none text-center p-2 focus:border-[#ff5200] rounded-lg w-14 h-14 text-2xl font-medium text-gray-700 transition-all duration-150 ease-in-out"
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
    <button
      className="w-full py-4 bg-[#FF5200] text-white font-semibold text-lg rounded hover:bg-[#e64e00] transition duration-200 active:scale-95"
      onClick={() => handleVerify()}
    >
      Verify
    </button>
    {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}
    <p className="mt-6 text-gray-600 text-center">
      Didn't receive the OTP? <span className="text-[#FF5200] cursor-pointer">Resend OTP</span>
    </p>
  </div>
</div>

    </>
  );
};
