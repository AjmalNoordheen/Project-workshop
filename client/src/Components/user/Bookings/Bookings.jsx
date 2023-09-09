import React, { useEffect, useState } from "react";
import AxiosInstance from '../../../Axios/userAxios'
import { useSelector } from "react-redux";
import DeleteAccountModal from "../../../Components/ReuseItems/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bookings() {
  const userEmail = useSelector((state) => state.Client.email);
  const userAxios = AxiosInstance();
  const [booking, setBooking] = useState([]);
  const [pending, setPending] = useState(false);
  const [complete, setCompleted] = useState(true);
  const [cancel, setCancelled] = useState(1);
  const [color, setColor] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setColor(0) 
  
    userAxios.get(`/getUserBookings?email=${userEmail}&status=${'pending'}`).then((res) => {
      if(res.data.message=='blocked'){
        toast.error('Account is blocked ')
        setTimeout(() => {
          navigate('/login')
        }, 300);
        return
      }
      if (res.status === 200) {
        setBooking(res.data.bookingDetails);
        setPending(false)  
       
         }
    });
  }, [pending,cancel,complete]);
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
    const completed = async ()=>{
      try {
        setColor(1) 
      const res = await userAxios.get(`/getUserBookings?email=${userEmail}&status=${'completed'}`)
      if(res.data.message=='blocked'){
        // toast.error('Account is blocked ')   
          navigate('/login')
        return
      }
      if (res.status === 200) {
        setBooking(res.data.bookingDetails);
          setCompleted(false)
         }
      } catch (error) {
        console.log(error);elled
      }
    }

  

    const cancelled = async ()=>{
      try {
      
      const res = await userAxios.get(`/getUserBookings?email=${userEmail}&status=${'cancelled'}`)
      setColor(2)
      if(res.data.message=='blocked'){
        toast.error('Account is blocked ')
        setTimeout(() => {
          navigate('/login')
        }, 300);
        return
      } 
      if (res.status === 200) {
        setBooking(res.data.bookingDetails);
        // setCancelled(true)
         }
      } catch (error) {
        console.log(error);
      }
    }
    

 
  
  return (
    <>
   
      <div className="flex flex-col min-h-screen h-full bg-slate-200 pb-4 pt-3 sm:overflow-y-scroll">
       <div className="sm:w-1/3 w-full">
       <h1 className="text-2xl font-bold text-center mt-1">
          Booking History
        </h1>
       </div>
        <div className="mt-2">
          <div className= "flex-col rounded-lg sm:overflow-scroll shadow-lg p-1.5 max-w-5xl  bg-opacity-40 mx-auto border border-white bg-slate-200">
            <div className="w-full h-fit py-1 flex gap-3 font-semibold items-center bg-white rounded-md">
               <button onClick={()=>setPending(true)} className={color==0?("text-xs px-2 font-bold md:px-5 bg-blue-600 ml-2 text-white py-2  h-[65%] rounded-xl"):("text-xs px-2 md:px-5 bg-slate-300 font-bold hover:bg-blue-700 ml-2  hover:text-white py-2  h-[65%] rounded-xl")}>
                Pending
              </button>
              <button onClick={completed} className={color==1?("text-xs px-2 md:px-5 py-2 bg-blue-600 font-bold text-white h-[65%] rounded-xl"):("bg-slate-300 font-bold text-xs px-2 md:px-5 py-2 hover:bg-blue-700 hover:text-white h-[65%] rounded-xl")}>
                Completed
              </button>
             
              <button onClick={cancelled} className={color==2?("text-xs px-2 md:px-5 bg-blue-600 text-white font-bold  py-2  h-[65%] rounded-xl"):("bg-slate-300 text-xs px-2 md:px-5 font-bold  hover:bg-blue-700 hover:text-white  py-2  h-[65%] rounded-xl")}>
                Cancelled
              </button>
            </div>
              {booking?booking.map((item)=>
              <>
              <div key={item._id} className="flex flex-col md:flex-row space-y-3 mt-2 md:space-y-0 ">
              <div className="bg-white flex flex-col py-2 sm:py-0  sm:flex-row w-full  shadow-md rounded-md backdrop:blur-md bg-opacity-95  items-center">
                <small className="text-end w-full h-1 px-2 sm:hidden cursor-pointer">Add Review</small>
                <div className="rounded-full w-28 m-auto sm:grid place-items-center">
                  <img
                    src={item.mechanic.image ? item.mechanic.image:'/profileimage.png'}
                    alt="Profile"
                    className=" w-[5rem] m-auto  md:w-[70%] rounded-full md:h-[100%]"
                  />
                </div> 
                <div className=" sm:w-full md:w-1/3 font-Shrikand font-medium flex flex-col space-y-1 pl-3 m-auto">
                  <h4 className="font-josefin-sans font-bold text-center sm:text-start md:text-lg text-xl">
                    {item ? item.mechanic.name : ''}
                  </h4>
                  <h6 className="text-sm font-bold text-slate-600 ">Email: {item ? item.mechanic.email : ''}</h6>
                  <h6 className="text-sm font-bold text-slate-600 ">Location:{item ? item.mechanic.location : ''}</h6>
                  <div className="flex space-x-2">
                    <div>
                      <h6 className="text-sm font-bold text-slate-600 ">Fees:₹ {item ? item.mechanic.fees : ''}</h6>
                    </div>
                  </div>
                </div>
              <div className="flex sm:gap-x-3 gap-2 sm:mr-2">
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
                        {item.status=='completed'? <button className="text-sm hidden sm:block bg-green-600 p-1 rounded font-semibold text-white mb-1">Add review</button>:''}
                  {item?item.status=='pending'?<>
      <DeleteAccountModal fun={setCancelled} isOpen={modalIsOpen} cancel={cancel} id={item._id} closeModal={closeModal} />
                  <button onClick={openModal} className="bg-slate-400  hover:bg-red-700 sm:h-9 px-3 py-1 sm:w-[7rem] text-center rounded sm:rounded-2xl text-sm sm:text-md font-medium text-black">
                    Cancel
                  </button>
                  </>:item.status=='completed'?<p className="text-green-800 text-xs sm:mt-1 sm:mr-1   sm:text-sm">Work Completed</p>:item.status=='cancelled'?<p className="text-red-800 text-xs sm:text-sm">Cancelled Work</p>:'':''}
              
                </div>
              </div>
              </div>
            </div>
              </>):
              <div className="antialiased bg-gray-200 text-gray-900 font-sans ">
                                        hiii
    </div>
              }
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
