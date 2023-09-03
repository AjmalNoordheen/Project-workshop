import React from 'react';
import { useRef } from 'react';
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import createAxiosInstance from '../../Axios/proAxios'


const SignUppro = () => {
  const nameref       = useRef()
  const emailref      = useRef()
  const mobileref     = useRef()
  const passwordref   = useRef()
  const repasswordref = useRef()
  const navigate = useNavigate()
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
        const res = await  ProAxios.post('/proffesionalsignUp', { name, email, mobile, password, repassword });
        if (res.data.status === true) {
          navigate('/proffesional/login');
        } else {
          generateError(res.data.message);
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        generateError('An error occurred. Please try again.');
        console.error(error);
      }
    };
    
  
  return (
    <div className="flex md:h-full lg:h-screen overflow-hidden sm:h-screen bg-black" >
      <div
        className="w-fit h-screen "
      >
      
      </div>

      <div className="md:w-1/4 sm:h-fit max-w-lg mx-auto my-8 px-7 py-3 md:mt-3.5 shadow-none border  bg-slate-900 backdrop backdrop-blur-xl   border-orange-300 rounded">
        <div className="text-left p-0 font-sans ">
          <h1 className="text-white text-3xl font-medium">
            Create an account for free
          </h1>
          <Toaster position="top-center" reverseOrder={false} />
          <h3 className="p-1 text-gray-300">Free forever. No payment needed.</h3>
        </div>
        <form action="#" className="p-0" onSubmit={signUpForm}>
          <div className='grid grid-cols-12 gap-x-2'>
          <div className="mt-4 col-span-12">
            <input
              type="email"
              className="block w-full p-1.5  border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Email"
              ref={emailref}
            />
          </div>
          <div className="mt-4 col-span-12">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="User-name"
              ref={nameref}
            />
          </div>
          <div className="mt-4  col-span-12">
            <input
              
              type="number"
              className="block w-full p-1.5 border  rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Mobile"
              ref={mobileref}
            />
          </div>
          <div className="mt-4 col-span-12">
            <input
              type="password"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Password"
              ref={passwordref}
            />
          </div>
          <div className="mt-4  col-span-12">
            <input
              type="text"
              className="block w-full p-1.5 border rounded border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Confirm Password"
              ref={repasswordref}
            />
          </div>
          </div>
          <div className="mt-3.5">
            <button
              type="submit"
              className="py-1.5 bg-green-500 text-white w-full rounded hover:bg-green-600"
            >Register</button>
          </div>
        </form>
        <a href="/proffesional/login" data-test="Link">
          <span className="block  text-center text-red-600 text-xs">
           Already have an account?
          </span>
        </a>
      </div>
    </div>
  );
};

export default SignUppro;
