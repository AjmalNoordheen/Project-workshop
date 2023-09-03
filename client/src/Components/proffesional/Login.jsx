import React, { useRef } from "react";
import createAxiosInstance from '../../Axios/proAxios'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {ProfessionalData, ProfessionalEmail,ProfessionalLogin,ProfessionalName} from '../../Redux/ProState'
import {GoogleLogin} from '@react-oauth/google'
import { toast } from "react-toastify";

const LoginForm = () => {
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
        if (res.data.status === false) {
          toast.error(res.data.message)
        } else {
          const token = res.data.userSignUp.token;
          const name = res.data.userSignUp.name;
          const email = res.data.userSignUp.email;
          console.log(res.data.userSignUp.email);
          const proId = res.data.userSignUp.proId
          console.log(email);
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
      ProAxios.post('/progoogleMail',payload).then((res)=>{
          const result = res.data.userSignUp
        if(result.Status){
          const token = result.token
          const name =  result.name
        dispatch(ProfessionalLogin({token:token}))
        dispatch(ProfessionalName({userName:name}))
        dispatch(ProfessionalEmail({email:result.email}))
        navigate('/proffesional/prohome')
        }else{
          console.log(res.data);
        }
      }).catch((error)=>{
          console.log(error);
        })
      
    } 
   
  
  return (
    <div className="font-sans ">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-slate-800 ">
        <div className="relative sm:max-w-sm w-full">
          {/* <div className="card bg-blue-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div> */}
          {/* <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div> */}
          <div className="relative w-full rounded-3xl backdrop-blur px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            <form method="#" action="#" onSubmit={LoginFormSubmit} className="mt-10">

              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  ref={nameref}
                  className="mt-1 block w-full border text-center bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-6">
                <input
                ref={passwordref}
                  type="password"
                  placeholder="Enter Your password"
                  className="mt-3 block w-full border text-center bg-gray-200 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              {/* <div className="mt-7 flex"> */}
                {/* <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Recuerdame
                  </span>
                </label> */}
{/* 
                <div className="w-full text-right">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div> */}

              <div className="mt-6">
                <button
                  className="bg-blue-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Login
                </button>
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                 Login With
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-4 justify-center w-full">
                <button
                  onClick={()=>{navigate('/proffesional/otplogin')}} className="mr-5 bg-blue-600 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  OTP Login
                </button>

                <button
                  className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Google
                </button>
              </div>
              <div className="mt-4 ml-12">
                <GoogleLogin onSuccess={credentialResponce=>{
                  const {credential} = credentialResponce
                  const payload = credential ? decodeJwt(credential) : undefined
                  if(payload){
                    sendDetails(payload)
                    console.log('koooooooooi');
                  }else{
                    console.log('haaaaaaammamaamamamm');
                  }
                }}
                onError={error => console.log(error)}
                useOneTap
                />          
                </div>
              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Don't have an account</label>
                  <Link to={'/proffesional/signup'} className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
