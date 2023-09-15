import React, { useRef, useState } from "react";
import createAxiosInstance from '../../Axios/proAxios'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {ProfessionalData, ProfessionalEmail,ProfessionalLogin,ProfessionalName} from '../../Redux/ProState'
import {GoogleLogin} from '@react-oauth/google'
import { toast } from "react-toastify";
import {decodeJwt} from "jose";

const LoginForm = () => {
  const [spin,setSpin] = useState(false)

    const nameref = useRef();
    const passwordref = useRef();

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const ProAxios = createAxiosInstance()
    
   
    const LoginFormSubmit = async (e) => {
      e.preventDefault();
    
      const email = nameref.current.value;
      const password = passwordref.current.value;
    
      try {
        const res = await ProAxios.post("/proffesionalLogin", { email, password });
        if (res.data.Status === false) {
          toast.error(res.data.message)
        } else {

          const token = res.data.userSignUp.token;
          const name = res.data.userSignUp.name;
          const email = res.data.userSignUp.email;

          dispatch(ProfessionalLogin({token:token}));
          dispatch(ProfessionalName({ userName: name }));
          dispatch(ProfessionalEmail({email: email }));
          dispatch(ProfessionalData({proData: res.data.user}));
          navigate('/proffesional/prohome');
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    };
    


    const sendDetails =(payload)=>{  
      setSpin(true)  
      ProAxios.post('/progoogleMail',payload).then((res)=>{
          
        const result = res.data.userSignUp
       
          if(result.Status){
          const token = result.token
          const name =  result.name
        
         dispatch(ProfessionalLogin({token:token}))
        dispatch(ProfessionalName({userName:name}))
        dispatch(ProfessionalEmail({email:result.email}))
        setSpin(false)  
        navigate('/proffesional/prohome')
        }else{
          setSpin(false)  
          toast.error(res.data.userSignUp.message)
        }
      }).catch((error)=>{
        setSpin(false)  
          console.log(error);
        })
      
    } 
   
  
  return (
<div className="h-screen flex items-center justify-center md:justify-between md:items-stretch ">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-600 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">Motor-Menders</h1>
            <p className="text-black mt-1">
              Seamless Solution for Your <span className="text-white">W</span>heels
            </p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center  bg-white">
          <form   onSubmit={LoginFormSubmit} className="bg-white border p-[11%] rounded-xl border-blue-300">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
            
            <div className="flex items-center border-2 border-blue-200 hover:border-blue-400   py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name=""
                required
                ref={nameref}
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center border-2  border-blue-200 hover:border-blue-400 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name=""
                id=""
                required
                ref={passwordref}
                placeholder="Password"
              />
            </div>
            {spin ? (
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                <i className="fa-solid fa-spinner animate-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Register
              </button>
            )}
           
           <div className="pb-5">
           <Link to={'/proffesional/otplogin'}  className="text-sm ml-2  hover:text-blue-500 cursor-pointer"> <i className="fa-solid fa-phone mr-1"></i>Otp-Login</Link>
            <span   className="text-xs text-red-700  hover:text-blue-500 cursor-pointer ml-[19%]"> Forgot Password ? </span>
           </div>
          <div className="mt-[7%] pb-2">
          <GoogleLogin
                  onSuccess={(credentialResponce) => {
                    const { credential } = credentialResponce;
                    const payload = credential
                      ? decodeJwt(credential)
                      : undefined;
                    if (payload) {
                      sendDetails(payload);
                    } 
                  }}
                  onError={(error) => console.log(error)}
                  useOneTap
                />
          </div>
           <div className=" mt-[7%]">
           <Link to={'/proffesional/signup'} className="text-sm text-center ml-5 align-bottom  hover:text-blue-500  cursor-pointer">
           Don't have an Account ? Sign Up
            </Link>
           </div>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
