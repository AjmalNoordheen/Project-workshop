import React, { useEffect, useRef, useState } from "react";
import RazorPay from "./RazorPay";
import NavBar from "../user/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createAxiosInstance from '../../Axios/userAxios'

function CheckOut() {
  const [checkOut, setCheckOut] = useState(false);
  const [userdata, setuserdata] = useState('');
  const location = useLocation()
  const details = location.state
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userAxios = createAxiosInstance()
  const email = useSelector((state)=>state.Client.email)
  const token = useSelector((state)=>state.Client.Token)
  const phoneRef = useRef()
  const locationRef = useRef()
  const LandmarkRef = useRef()
  let locationdata 
  let landmark


  if(checkOut==true){
     locationdata = locationRef.current.value
     landmark     = LandmarkRef.current.value
  }
 
  useEffect(()=>{
     userAxios.get(`getUserProfile?email=${email}`,
    {
      headers:{
        authorization:`Bearer ${token}`
      },}
    ).then((res)=>{
      if(res.data.message=='blocked'){
        toast.error('Account is blocked ')
        setTimeout(() => {
          navigate('/login')
        }, 300);
        return
      }
      if(res.data.user){
        setuserdata(res.data.user)
      }else if(res.data.status==false){
        dispatch(ClientLogout())
        navigate('/')
      }
    }).catch((err)=>{
      console.log(err)
    })
  },[token])

  const bookingDetails ={
    bookingDate:details.bookingDate,
    location:locationdata,
    landMark:landmark
  }
  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-700 to-blue-600">
        <NavBar data={1} />
      </div>
      {checkOut ? (
        <RazorPay data={details.profDetails} bookingForm={bookingDetails} fees={details.profDetails.fees}/>
      ) : (
        <>
          <div className="max-w-screen-lg shadow-md mx-auto p-5 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-12 border">
              <div className="bg-gray-900 md:col-span-4 p-10 text-white">
                <p className="mt-4 text-sm leading-7 font-regular uppercase">
                  BOOk
                </p>
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                  Your<span className="text-indigo-600">-Service</span>
                </h3>
                <p className="mt-4 leading-7 text-gray-200">
                  With a booked appointment, you're less likely to spend a lot
                  of time waiting at the repair shop. The mechanic can start
                  working on your vehicle as soon as you arrive, which can
                  reduce the overall time it takes to complete the service or
                  repair
                </p>
              </div>
              <form className="md:col-span-8 p-10 "  onSubmit={() => setCheckOut(true)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      value={userdata.name?userdata.name:''}
                    />
                   
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      phone
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      defaultValue={userdata.phone?userdata.phone:''}
                      ref={phoneRef}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 ">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="email"
                      value={userdata.email?userdata.email:''}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3  ">
                    <label
                      className="block uppercase tracking-wide text-red-500 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Fees
                    </label>
                    <div
                      className="appearance-none  border-red-300 block w-full  bg-gray-200 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                    >
                   <p>₹ {details.profDetails.fees?details.profDetails.fees:''}</p>
                    </div>
                  </div>
                 
                  <div className="w-full md:w-1/2 px-3 pt-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      required
                      ref={locationRef}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 pt-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      LandMark
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      required
                      ref={LandmarkRef}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="flex justify-between w-full px-3">
                    <button
                     
                      className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                      type="submit"
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CheckOut;
