import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
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
  const [cancel, setCancelled] = useState(false);
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
        console.log(res.data.bookingDetails);
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
        console.log(res.data.bookingDetails);
          setCompleted(false)
         }
      } catch (error) {
        console.log(error);
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
        console.log(res.data.bookingDetails);
         }
      } catch (error) {
        console.log(error);
      }
    }
    

 
  
  return (
    <>
   
      <div className="flex flex-col h-auto pt-3 overflow-scroll">
        <h1 className="text-4xl font-bold text-center mt-10">
          Booking History
        </h1>
        <div className="mt-5">
          <div className= "flex-col rounded-lg h-full shadow-lg p-3 max-w-5xl backdrop-blur-2xl bg-opacity-40 mx-auto border border-white bg-slate-300">
            <div className="w-full h-fit py-2 flex gap-3 font-semibold items-center bg-white rounded-md">
               <button onClick={()=>setPending(true)} className={color==0?("px-5 bg-orange-400 ml-2  py-1  h-[65%] rounded-xl"):("bg-slate-300 px-5 hover:bg-orange-600 ml-2  py-1  h-[65%] rounded-xl")}>
                Pending
              </button>
              <button onClick={completed} className={color==1?("px-5 py-1 bg-green-600  h-[65%] rounded-xl"):("bg-slate-300 px-5 py-1 hover:bg-green-600  h-[65%] rounded-xl")}>
                Completed
              </button>
             
              <button onClick={cancelled} className={color==2?("px-5 bg-red-700  py-1  h-[65%] rounded-xl"):("bg-slate-300 px-5 hover:bg-red-700  py-1  h-[65%] rounded-xl")}>
                Cancelled
              </button>
            </div>
              {booking?booking.map((item)=>
              <>
              <div key={item._id} className="flex flex-col md:flex-row space-y-3 mt-3 md:space-y-0 ">
              <div className="bg-white flex w-full h-fit shadow-md rounded-md backdrop:blur-md bg-opacity-95 justify-between items-center">
                <div className="w-full rounded-full md:w-28 m-auto grid place-items-center">
                  <img
                    src={item.mechanic.image ? item.mechanic.image:'/profileimage.png'}
                    alt="Profile"
                    className=" w-[70%] rounded-full h-[100%]"
                  />
                </div>
                <div className="w-full md:w-1/3 font-Shrikand font-medium flex flex-col space-y-1 pl-3 m-auto">
                  <h4 className="font-josefin-sans font-bold md:text-lg text-xl">
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
                <div className="bg-white border border-slate-500 text-red-600 m-auto  flex-col rounded w-[5.5rem]">
                          <span className="block text-center text-4xl font-bold italic">
                            {new Date(item.BookingDate).getDate()}
                          </span>
                          <span className="block text-center text-md font-bold text-blue-700">
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
                  {item?item.status=='pending'?<>
      <DeleteAccountModal fun={setCancelled} isOpen={modalIsOpen} id={item._id} closeModal={closeModal} />
                  <button onClick={openModal} className="bg-slate-400  hover:bg-red-700 h-9 px-3 py-1 w-[7rem] text-center rounded-2xl text-md font-medium text-black">
                    Cancel
                  </button>
                  </>:item.status=='completed'?<p className="text-green-800">Work Completed</p>:item.status=='cancelled'?<p className="text-red-800">Cancelled Work</p>:'':''}
                
                </div>
              </div>
            </div>
              </>):''}
              <div className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
    
    </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
