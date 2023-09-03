import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ProfessionalLogout } from '../../../Redux/ProState'


function SideBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const LogOut = async(req,res)=>{
        try {
          dispatch(ProfessionalLogout())
          navigate('/proffesional/login')
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <>
    <div className="hidden md:flex  flex-col  lg:w-[14%] bg-white rounded-r-3xl h-[96%] overflow-hidden">
          <div className="flex items-center justify-center h-16 sm:h-20 shadow-md">
           <img src="/newImage.png" className='h-[100%] rounded-tr-3xl-3xl w-[100%] bg-slate-700' alt="" />
          </div>
          <ul className="flex flex-col py-2 sm:py-4">
            <li>
              <a
                href="#"
                className="flex flex-row items-center h-10 sm:h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-lg text-gray-400">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  Dashboard
                </span>
              </a>
            </li>              
            <li>
              <Link
               to={'/proffesional/bookings'}
                className="flex flex-row items-center h-10 sm:h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-lg text-gray-400">
                  <i className="bx bx-music"></i>
                </span>
                <span className="text-xs sm:text-sm font-medium">Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to={'/proffesional/profile'}
                className="flex flex-row items-center h-10 sm:h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-lg text-gray-400">
                  <i className="bx bx-music"></i>
                </span>
                <span className="text-xs sm:text-sm font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <Link
              to={'/proffesional/proChats'}
                href="#"
                className="flex flex-row items-center h-10 sm:h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-lg text-gray-400">
                  <i className="bx bx-music"></i>
                </span>
                <span className="text-xs sm:text-sm font-medium">Chats</span>
              </Link>
            </li>
            <li>
              <p
                href="#"
                onClick={LogOut}
                className="flex flex-row items-center h-10 sm:h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              >
                <span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-lg text-gray-400">
                  <i className="bx bx-music"></i>
                </span>
                <span className="text-xs sm:text-sm font-medium">Logout</span>
              </p>
            </li>
          </ul>
        </div>
    </>
  )
}

export default SideBar