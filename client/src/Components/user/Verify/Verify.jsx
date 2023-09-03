import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import userAxiosInstance from '../../../Axios/userAxios'


function Verify() {
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search);
    const user_id = params.get('id');
    const userAxios = userAxiosInstance()

   useEffect(()=>{
    userAxios.post('/verify',{id:user_id}).then(()=>{
        console.log('ha ha ha aha hs');
    })
   },[])

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-950 to-blue-900 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold text-center text-white mt-6">
          Email Successfully Verified
        </h1>
        <p className="text-gray-400 text-center mt-4">
          Congratulations! Your email has been successfully verified.
        </p>
        <button
          className="mt-6 bg-gradient-to-r from-red-900 to-red-900 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded w-full focus:outline-none focus:ring focus:ring-pink-300"
          onClick={() => {
            navigate('/login')
          }}
        >
          Click here to Login 
        </button>
      </div>
    </div>
    )
}

export default Verify