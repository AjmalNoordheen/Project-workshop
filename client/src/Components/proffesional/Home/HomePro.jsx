import React, { useEffect, useState } from "react";
import LineChart from "../chart/LineChart";
import Popup from '../../../Pages/proffesional/Popup';
import { useDispatch, useSelector } from 'react-redux';
import createAxiosInstance from '../../../Axios/proAxios'
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { ProfessionalLogout } from "../../../Redux/ProState";
import SideBar from "../ReuseItems/SideBar";
import { NavBar } from "../NavBar/NavBar";

function HomePro() {
  const [one,setOne] = useState(null)
  const [message,setMessage] = useState(false)
  const [allBookings,setallBookings] = useState([])
  const [countTotal,setTotalCount] = useState(null)
  const [totalCompleted,setTotalCompleted] = useState(null)
  const [totalPending,setTotalPending] = useState(null)
  const ProAxios = createAxiosInstance()
  const email = useSelector((state) =>state.Proffessional.email);
  const proData = useSelector((state)=>state.Proffessional.proData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
useEffect(() => {
  ProAxios.get(`/checkPro?email=${email}`).then((res)=>{
    if(res.data.status===false){
      setTimeout(() => {
        dispatch(ProfessionalLogout(''))
        navigate('/proffesional/login')
      }, 300);
      return
    }
   if(res.data.pro){
    setOne('show')
    console.log('worked');
   }
  })
}, []);

useEffect(()=>{
  ProAxios.get(`/listAllBooking?id=${proData._id}&status=${'total'}`).then((res)=>{
    setTotalCount(res.data)
  })
},[])
useEffect(()=>{
  ProAxios.get(`/listAllBooking?id=${proData._id}&status=${'completed'}`).then((res)=>{
      if(res.data){
        setTotalCompleted(res.data)
      }
  })
},[])
console.log(allBookings)
useEffect(()=>{
  ProAxios.get(`/listAllBooking?id=${proData._id}&status=${'all'}`).then((res)=>{
    if(res.data.status===false){
      setTimeout(() => {
        dispatch(ProfessionalLogout(''))
        navigate('/proffesional/login')
      }, 300);
      return
    }
    if(res.data){
      console.log(res.data);
      setallBookings(res.data)
    }
  })
},[])

console.log(Array.isArray(allBookings)
)
useEffect(()=>{
  ProAxios.get(`/listAllBooking?id=${proData._id}&status=${'pending'}`).then((res)=>{
    if(res.data.status===false){
      setTimeout(() => {
        dispatch(ProfessionalLogout(''))
        navigate('/proffesional/login')
      }, 300);
      return
    }
    if(res.data){
      setTotalPending(res.data)
    }else{
      setTotalPending(0)
    }
  })
},[])
  

if(message){
  toast.success(message)
}
  return (
    <>
    {one=='show' ?<Popup fun={setOne} sendMessage={setMessage}/>:<>
    <NavBar/>
    <div className="flex justify-center items-center mt-1 h-fit overflow-hidden">
      {/* <div className=" w-screen h-[60rem]  lg:h-screen  bg-slate-200 flex justify-between"> */}
        {/* Sidebar */}
        {/* <SideBar/> */}
        {/* NavBar */}
        {/* <div className="h-[6%] lg:h-[10%] bg-white md:w-[84%]  flex justify-between md:justify-end items-center rounded-es-2xl p-4">
          <div className="flex md:hidden gap-2 justify-center font-semibold text-sm">
            <h1>Dashboard</h1>
            <h1>Bookings</h1>
            <h1>Profile</h1>
            <h1>Logout</h1>
          </div>
          <div className="h-[5%] w-[5%] flex justify-end items-center">
          <h1 className="font-jockey-one font-semibold ml-auto pr-3">{proData.name}</h1>
            <img src={proData?proData.image:"/profileimage.png"} className="rounded-full" alt="" />
          </div>
        </div> */}
        {/* </div> */}
        {/* Main Div */}
        <div className="h-full pb-6 flex justify-center rounded-sm  shadow-md md:left-[16%] bg-opacity-10 w-[98%] md:w-11/12 bg-black">
          <div className="h-[70%] w-full mt-[1%] ml-[2%]  lg:flex md:gap-x-3">
           <div className="lg:w-4/5  flex-col">
            <div className="grid grid-cols-12  w-full lg:flex gap-2 lg:gap-3 lg:justify-center mt-2">
            <div className=" col-span-12 sm:col-span-3 text-center h-[6rem]  lg:w-[16rem] rounded-md shadow-md bg-gradient-to-t to-blue-600 from-blue-400">
              <h1 className="mt-[2%] font-medium text-lg text-white">TOTAL BOOKINGS</h1>
              <h1 className="mt-[2%] font-semibold text-4xl">
               {countTotal?countTotal:0}</h1>
            </div>
            <div className=" col-span-12 sm:col-span-3  lg:w-[16rem] h-[6rem] text-center rounded-md shadow-md  bg-gradient-to-t to-blue-600 from-blue-400">
            <h1 className="mt-[2%] font-medium text-lg text-white">WORK COMPLETED</h1>
              <h1 className="mt-[2%] font-semibold text-4xl ">{totalCompleted?totalCompleted:0}</h1>
            </div>
            <div className=" col-span-12 sm:col-span-3 flex flex-col items-center justify-center  lg:w-[16rem] h-[6rem] text-center rounded-md shadow-md  bg-gradient-to-t to-blue-600 from-blue-400">
            <h1 className="mt-[2%] font-medium text-lg text-white">WORK PENDING</h1>
              <h1 className="mt-[2%] font-semibold text-4xl">{totalPending?totalPending:0}</h1>
            </div>
            <div className=" col-span-12 sm:col-span-3 lg:hidden flex flex-col items-center justify-center lg:w-[16rem] h-[6rem] text-center rounded-md shadow-md  bg-gradient-to-t to-blue-600 from-blue-400">
            <h1 className="mt-[2%] font-medium text-lg text-white">WALLET</h1>
              <h1 className="mt-[2%] font-semibold text-4xl">{proData?.wallet}</h1>
            </div>
            </div>
            <div className="hidden sm:block  lg:h-[90%] w-[99%] lg:w-full ">
            <div className="lg:w-11/12  mt-4 m-auto  rounded-md shadow-md bg-white">
              <LineChart/>
            </div>
            </div>
           </div>
           <div className=" lg:w-[30%] h-[20rem] lg-h-full mt-3 lg:mt-[.8%] space-y-2">
            <div className="w-auto h-[44%] mr-5 hidden  lg:flex  rounded-md bg-gradient-to-t from-purple-700 to-purple-500 shadow-md ">
           <div className="flex h-[25%] w-[28%] gap-2 items-center">
           <i class="fa-solid fa-wallet text-xl  text-black ml-2 py-2 mr-auto"></i>
            <p className=" font-semibold">WalletAmount</p>
           </div>
           <div className=" justify-center items-center w-100 font-bold text-4xl flex gap-2"><p>₹</p><h1 className="">{proData?.wallet}</h1></div>
            </div>

            <div className=" w-auto h-full lg:w-[95%] space-y-[.8%]  space-x-[.9%] overflow-scroll mr-2 sm:mr-5 rounded-md shadow-md bg-white">
              <p className="m-2 w-[97%] font-josefin-sans font-medium">Recent Bookings</p>
              {allBookings.length > 0 ? (
  allBookings.map((item) => (
    <div key={item._id} className="w-[97%] overflow-hidden  col-span-1 bg-black bg-opacity-5 shadow flex justify-around items-center h-16">
      <div className="w-[17%] flex-col overflow-clip  h-16">
        <img src={item.user?item.user.image:'profileimage.png'} className="h-[65%] rounded-full mt-1 object-fill  w-[65%]" alt="" />
        <h1 className="text-sm ml-1 w-fit font-semibold text-slate-700 text-center">
          {item.user ? item.user.name : ''}
        </h1>
      </div>

      <div className="text-center overflow-scroll space-y-1 w-[40%]">
        <p className="text-xs">{item.user ? item.user.email : ''}</p>
        <p className="text-sm">Ph: {item.user ? item.user.phone : ''}</p>
      </div>
      <button onClick={()=>navigate('/proffesional/bookings')}  className="bg-purple-700 hover:translate-x-1 px-3 text-white rounded-md">View</button>
    </div>
  ))
) : (
  <p>No recent bookings.</p>
)}                                        
            </div>
           </div>
          </div>
      </div>
    </div>
    </>}
    </>
  );
}

export default HomePro;
