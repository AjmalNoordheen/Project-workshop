import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Axios/proAxios";
import { useSelector } from "react-redux";
import DeleteAccountModal from "../../../Components/ReuseItems/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "../ReuseItems/SideBar";

function BookingPro() {
  const proData = useSelector((state) => state.Proffessional.proData);
  const proAxios = AxiosInstance();
  const [load,setLoad] = useState(0)
  const [spin,setSpin] = useState(false)
  const [booking, setBooking] = useState([]);
  const [requests, setRequests] = useState(true);
  const [color, setColor] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setColor(0);
    proAxios
      .get(`/getProBookings?id=${proData._id}&request=${"requested"}`)
      .then((res) => {
        if (res.data.status === "success") {
          setBooking(res.data.bookingDetails);
          setRequests(false);
        }
      });
  }, [load,requests]);

  
const accepted = async(id)=>{
    setSpin(true)
    try {
        const res = await proAxios.patch(`/updateBookingStatus?id=${id}&status=${'accept'}`)
        if(res.data.status=='success'){
            toast.success('Booking Accepted')
            setSpin(false)
            setBooking(res.data.bookingDetails);
            setLoad(load+1)
        }
    } catch (error) {
        console.log(error)
    }
    
}

const pendingBookings = async()=>{
    setColor(1)
    try {
        proAxios.get(`/getProBookings?id=${proData._id}&request=${"pending"}`)
      .then((res) => {
        if (res.data.status === "success") {
          setBooking(res.data.bookingDetails);
          setRequests(false)
        }
      });
    } catch (error) {
        console.log(error)
    }
}

const getModal = (id)=>{
    setBookingId(id)
    setModalIsOpen(true)
}

const rejectBooking = async()=>{
    try {
        setModalIsOpen(false)
        const res = await proAxios.patch(`/updateBookingStatus?id=${bookingId}&status=${'reject'}`)
        if(res.data.status=='success'){
            toast.success('Succesfully Rejected')
            // setSpin(false)
            setBooking(res.data.bookingDetails);
            setLoad(load+1)
        }
    } catch (error) {
        console.log(error)
    }
}

const cancelledBooking = ()=>{
    try {
        setColor(3)
        proAxios.get(`/getProBookings?id=${proData._id}&request=${"cancelled"}`)
      .then((res) => {
        if (res.data.status === "success") {
          setBooking(res.data.bookingDetails);
          setRequests(false)
        }
      });
    } catch (error) {
        console.log(error)
    }
}

const completedBooking =()=>{
    try {
        setColor(2)
        proAxios.get(`/getProBookings?id=${proData._id}&request=${"completed"}`)
      .then((res) => {
        if (res.data.status === "success") {
          setBooking(res.data.bookingDetails);
          console.log(res.data.bookingDetails);
          setRequests(false)
        }
      });
    } catch (error) {
        console.log(error)
    }
}
  return (
    <>


<div className="flex flex-col min-h-screen h-full bg-slate-200 pb-4 pt-3 sm:overflow-y-scroll">
<div className="w-full">
 <h1 className="text-2xl font-bold text-center mt-1">
          Booking History
        </h1>
        <div className="mt-2">
        <div className= "flex-col rounded-lg sm:overflow-scroll shadow-lg sm:p-1.5 max-w-5xl   bg-opacity-40 mx-auto border border-white bg-slate-200">
        <div className=" w-full h-fit py-1 flex gap-1  font-semibold items-center bg-white border rounded-md">
              <button
                onClick={() => setRequests(true)}
                className={
                  color == 0
                    ? "sm:px-5 px-0.5 bg-blue-600 ml-1 sm:ml-2 text-sm sm:text-base hover:bg-blue-700 py-1 text-white rounded  h-[65%] sm:rounded-xl"
                    : "bg-slate-300 px-0.5 sm:px-5 hover:bg-blue-700 text-sm sm:text-base hover:text-white sm:ml-2 rounded   py-1  h-[65%] sm:rounded-xl"
                }
              >
                Requests
              </button>
              <button
                onClick={pendingBookings}
                className={
                  color == 1
                    ? "sm:px-5 px-0.5 hover:bg-blue-700 bg-blue-600   text-sm sm:text-base text-white sm:ml-2  py-1  h-[65%] rounded sm:rounded-xl"
                    : "bg-slate-300  px-1 sm:px-5 hover:bg-blue-700 text-sm sm:text-base hover:text-white   py-1  h-[65%] rounded sm:rounded-xl"
                }
              >
                Pending
              </button>
              <button
               onClick={completedBooking}
                className={
                  color == 2
                    ? "sm:px-5 py-1 px-0.5 bg-blue-600 text-white text-sm sm:text-base  h-[65%] rounded sm:rounded-xl"
                    : "bg-slate-300 sm:px-5 px-0.5 py-1 hover:bg-blue-700 text-sm sm:text-base hover:text-white  h-[65%] rounded sm:rounded-xl"
                }
              >
                Completed
              </button>

              <button
               onClick={cancelledBooking}
                className={
                  color == 3
                    ? "sm:px-5 px-0.5 bg-blue-600 text-white  py-1 text-sm sm:text-base h-[65%] rounded sm:rounded-xl"
                    : "bg-slate-300 px-0.5 sm:px-5 hover:bg-blue-700 text-sm sm:text-base hover:text-white   py-1  h-[65%] rounded sm:rounded-xl"
                }
              >
                Cancelled
              </button>
            </div>
            {/* <DeleteAccountModal/> */}

            {booking.length > 0
              ? booking.map((item) => (
                  <>
              <div key={item._id} className="flex flex-col md:flex-row space-y-2 mt-2 md:space-y-0 ">
              <div className="bg-white  flex flex-col py-3 pb-3 sm:pb-0 sm:py-0  sm:flex-row w-full  shadow-md rounded-md backdrop:blur-md bg-opacity-95  items-center">
              <div className="rounded-full w-28 m-auto sm:grid  place-items-center">
                          <img
                            src={
                              item.user.image
                                ? item.user.image
                                : "/profileimage.png"
                            }
                            alt="Profile"
                            className=" w-[5rem] m-auto  md:w-[70%] rounded-full md:h-[100%]"
                            />
                        </div>
                        <div className=" sm:w-full md:w-1/3 font-Shrikand font-medium flex flex-col space-y-1 pl-3 m-auto">
                        <h4 className="font-josefin-sans font-bold text-center sm:text-start md:text-lg text-xl">
                            { item.user? item.user.name:''}
                          </h4>
                          <h6 className="text-sm font-bold text-slate-600 ">
                            Email: {item ? item.user.email : ""}
                          </h6>
                          <h6 className="text-sm font-bold text-slate-600 ">
                            Location:{item ? item.user.location : ""}
                          </h6>
                          <div className="flex space-x-2">
                            <div>
                              <h6 className="text-sm font-bold text-slate-600 ">
                                Fees Paid:₹ {item ? item.mechanic.fees : ""}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-500 text-red-600 m-auto flex  sm:flex-col rounded  sm:w-[5.5rem]">
                        <span className="block text-center text-md sm:text-4xl font-bold italic">
                            {new Date(item.BookingDate).getDate()}
                          </span>
                          <span className="block text-center text-sm sm:text-md font-bold text-blue-700">
                            {item
                              ? new Date(item.BookingDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </span>
                        </div>

                        <div className="flex gap-3 m-auto">
                          {item ? (
                            item.status == "pending" &&
                            item.request == "requested" ? (
                              <>
                                <button onClick={()=>accepted(item._id)} className="bg-slate-400   hover:bg-green-700 hover:text-white mt-2 sm:mt-0  h-fit sm:h-9 px-3 py-1 w-[7rem] text-center rounded-2xl text-md  font-medium text-black">
                                    {spin?<i class="fa-solid fa-circle-notch animate-spin text-green-700"></i>:"Accept"} 
                                </button>
                                <button  onClick={()=>getModal(item._id)} className="bg-slate-400  hover:bg-red-700 hover:text-white  mt-2 sm:mt-0 h-fit sm:h-9  px-3 py-1 w-[7rem] text-center rounded-2xl text-md font-medium text-black">
                                  Reject
                                </button>
                              </>
                            ) : item.status == "pending" ? (
                                <button onClick={()=>navigate(`/proffesional/otpbookings?id=${item._id}`)} className="bg-slate-400  hover:bg-blue-700 hover:text-white h-9 px-3 py-1 w-[7rem] text-center rounded-2xl text-md font-medium text-black">
                                  Completed
                                </button>
                            ) : item.status == "completed" ? (
                              <p className="text-green-800">Work Completed</p>
                            ) : item.status == "cancelled" ? (
                              <p className="text-red-800">Cancelled Work</p>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : <><p className="text-center pt-4 text-red-800">Empty Bookings !!!</p></>}

            <div className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden"></div>
          
          </div>
        </div>
      </div>
      {modalIsOpen?(
        <div className="bg-slate-600 bg-opacity-90 absolute    top-[-5rem] left-[20%] rounded-lg max-w-xs h-[60%] md:h-fit md:mx-auto p-4  inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            {/* <div className="rounded-full border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
             
            </div> */}
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-semibold text-black"> <i class="fa-solid fa-triangle-exclamation text-red-400 "></i> Do you Really want to Reject the Booking</p>
              <p className="text-sm text-gray-700 mt-1"></p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button onClick={rejectBooking} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 hover:bg-red-600 hover:text-white bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Confirm</button>
            <button onClick={()=>setModalIsOpen(false)} className="block w-full md:inline-block md:w-auto px-4  hover:bg-red-600 hover:text-white py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">Cancel</button>
          </div>
        </div>
   ):''}
   </div>
    </>
  );
}

export default BookingPro;
