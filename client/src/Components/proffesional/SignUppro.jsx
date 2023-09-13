import React, { useState } from 'react';
import { useRef } from 'react';
import { Toaster,toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import createAxiosInstance from '../../Axios/proAxios'


const SignUppro = () => {
  const nameref       = useRef()
  const emailref      = useRef()
  const mobileref     = useRef()
  const passwordref   = useRef()
  const repasswordref = useRef()
  const navigate = useNavigate()

  const [spin,setSpin] = useState(false)

  const ProAxios = createAxiosInstance()
  const generateError = (err) => toast.error(err, { position: 'bottom-center' });

    const signUpForm = async (e) => {
      e.preventDefault();
      const name = nameref.current.value;
      const email = emailref.current.value;
      const mobile = mobileref.current.value;
      const password = passwordref.current.value;
      const repassword = repasswordref.current.value;
    
      console.log('koooooooi');
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (!name.trim() || !email.trim() || !mobile.trim() || !password.trim() || !repassword.trim()) {
        return generateError('Please fill all the fields');
      } else if (!email.match(emailRegex)) {
        return generateError('Please enter a valid email address');
      } else if (mobile.length !== 10) {
        return generateError('Mobile number must contain 10 numbers');
      } else if (password.length < 4) {
        return generateError('Password should be at least 4 characters');
      }
    
      try {
        setSpin(true)
        const res = await  ProAxios.post('/proffesionalsignUp', { name, email, mobile, password, repassword });
        setSpin(false)
        if (res.data.status === true) {
          navigate('/proffesional/login');
        } else {
          generateError(res.data.message);
        }
      } catch (error) {
        setSpin(false)
        // Handle any errors that might occur during the API call
        generateError('An error occurred. Please try again.');
        console.error(error);
      }
    };
    
  
  return (   
<div>
<div className="h-screen flex items-center justify-center md:justify-between md:items-stretch ">
  <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-white font-bold text-4xl font-sans">
        Motor-Menders
      </h1>
      <p className="text-white mt-1">
        The Seamless solution for Your Wheels
      </p>
      <button
        type="button"
        className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
      >
        <span className="loading loading-spinner text-primary"></span>
        <Link to={"/proffesional/login"}>Login</Link>
      </button>
    </div>
    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
  </div>
  <div className="flex w-full md:w-1/2 justify-center py-10 items-center bg-white">
    <form
      onSubmit={signUpForm}
      className="bg-white border p-4 px-[10%] rounded-md border-blue-200"
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">
        Start Your Journey
      </h1>
      <p className="text-sm font-normal text-gray-600 mb-7">Sign Up</p>

      <div className="flex items-center border-2 py-2 px-3 rounded-2xl border-blue-200 hover:border-blue-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name=""
          id=""
          ref={nameref}
          placeholder="Username"
        />
      </div>
      <div className="flex items-center border-blue-200 hover:border-blue-500 border-2 py-2 px-3 rounded-2xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
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
          ref={emailref}
          className="pl-2 outline-none border-none"
          type="email"
          name=""
          id=""
          placeholder="Email Address"
        />
      </div>
      <div className="flex items-center border-blue-200 hover:border-blue-500 border-2 py-2 px-3 rounded-2xl mb-4">
        <i className="fa-solid fa-phone text-slate-400"></i>
        <input
          className="pl-2 outline-none border-none"
          type="number"
          name=""
          id=""
          // onChange={(e)=>setPhone(e.target.value)}
          placeholder="Mobile"
          ref={mobileref}
        />
      </div>

      <div className="flex items-center border-blue-300 hover:border-blue-500 border-2 py-2 px-3 rounded-2xl">
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
          type="text"
          name=""
          id=""
          ref={passwordref}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center border-blue-300 hover:border-blue-500 border-2 py-2 px-3 rounded-2xl  mt-4">
        <i className="fa-solid fa-lock text-slate-400"></i>
        <input
          className="pl-2 outline-none border-none"
          type="text"
          name=""
          id=""
          ref={repasswordref}
          placeholder="Confirm Password"
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

      <span className="text-sm ml-[25%] hover:text-blue-500  cursor-pointer">
        Forgot Password ?
      </span>
      <p className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
        Already have an Account ? <Link to={"/proffesional/login"}>Login</Link>
      </p>
    </form>
  </div>
</div>

</div>
  );
};

export default SignUppro;
