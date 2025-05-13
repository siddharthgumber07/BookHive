import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { use } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OTP = () => {
  const navigate=useNavigate();
  const {email}=useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const {loading, error, message, user, isAuthenticated}=useSelector((state)=>state.auth);


  const handleOtpVerification=(e)=>{ 
    e.preventDefault();
    dispatch(otpVerification(email, otp));    
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  },[loading, error, dispatch, isAuthenticated]);

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return <>
  <div className="flex flex-col justify-center md:flex-row h-screen">
    {/* LEFT SIDE */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
      <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">Back</Link>
      <div className="max-w-sm w-full">
        <div className="flex justify-center mb-12">
          <div className="rounded-full flex items-center justify-center">
            <img src={logo} alt="logo" className="h-24 w-auto"/>
          </div>
        </div>
        <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">Check Your Mailbox</h1>
        <p className="text-gray-800 text-center mb-12">Please enter the OTP to proceed</p>
        <form onSubmit={handleOtpVerification}>
          <div className="mb-4">
            <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="OTP" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"/>
          </div>
          <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Verify</button>
        </form>
      </div>
    </div>
    {/* RIGHT SIDE */}
    <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
      <div className="text-center h-[400px]">
        <div className="flex justify-center mb-12">
          <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto"/>
        </div>
        <p className="text-gray-300 mb-12">New to our platform? Sign Up now.</p>
        <Link to={"/register"} className="border-2 mt-5 border-white w-full font-semibold bg-black text-white px-8 py-2 rounded-lg hover:bg-white hover:text-black transition">Sign Up</Link>
      </div>
    </div>
  </div>
  </>;
};

export default OTP;
