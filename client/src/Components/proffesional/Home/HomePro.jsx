import React, { useEffect, useState } from "react";
import LineChart from "../chart/LineChart";
import Popup from '../../../Pages/proffesional/Popup';
import { useDispatch, useSelector } from 'react-redux';
import createAxiosInstance from '../../../Axios/proAxios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ProfessionalLogout } from "../../../Redux/ProState";
import { NavBar } from "../NavBar/NavBar";

function HomePro() {
  const [one, setOne] = useState(null);
  const [message, setMessage] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [countTotal, setTotalCount] = useState(null);
  const [totalCompleted, setTotalCompleted] = useState(null);
  const [totalPending, setTotalPending] = useState(null);
  const ProAxios = createAxiosInstance();
  const email = useSelector((state) => state.Proffessional.email);
  const proData = useSelector((state) => state.Proffessional.proData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    ProAxios.get(`/checkPro?email=${email}`).then((res) => {
      if (res.data.status === false) {
        setTimeout(() => {
          dispatch(ProfessionalLogout(''));
          navigate('/proffesional/login');
        }, 300);
        return;
      }
      if (res.data.pro) {
        setOne('show');
        console.log('worked');
      }
    });
  }, []);

  useEffect(() => {
    if (proData) {
      ProAxios.get(`/listAllBooking?id=${proData._id ? proData._id : ''}&status=${'total'}`).then((res) => {
        setTotalCount(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (proData) {
      ProAxios.get(`/listAllBooking?id=${proData._id ? proData._id : ''}&status=${'completed'}`).then((res) => {
        if (res.data) {
          setTotalCompleted(res.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (proData) {
      ProAxios.get(`/listAllBooking?id=${proData._id ? proData._id : ''}&status=${'all'}`).then((res) => {
        if (res.data.status === false) {
          setTimeout(() => {
            dispatch(ProfessionalLogout(''));
            navigate('/proffesional/login');
          }, 300);
          return;
        }
        if (res.data) {
          console.log(res.data);
          setAllBookings(res.data);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (proData) {
      ProAxios.get(`/listAllBooking?id=${proData._id ? proData._id : ''}&status=${'pending'}`).then((res) => {
        if (res.data.status === false) {
          setTimeout(() => {
            dispatch(ProfessionalLogout(''));
            navigate('/proffesional/login');
          }, 300);
          return;
        }
        if (res.data) {
          setTotalPending(res.data);
        } else {
          setTotalPending(0);
        }
      });
    }
  }, []);

  if (message) {
    toast.success(message);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {one === 'show' ? (
        <Popup fun={setOne} sendMessage={setMessage} />
      ) : (
        <>
          <NavBar />
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Left Sidebar */}
              <div className="col-span-12 lg:col-span-4">
              <div class=" bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 lg:h-[47%] rounded-lg shadow-lg">
  <h1 class="text-2xl font-semibold text-white mb-4">Wallet Amount</h1>
  <div class="flex items-center justify-center">
    <i class="fas fa-wallet text-4xl text-black mr-2"></i>
    <p class="font-semibold text-5xl text-black">₹{proData?.wallet}</p>
  </div>
</div>

                <div className=" mt-4 p-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow">
                  <div className="mb-4">
                    <h1 className="text-xl  font-bold">Summary</h1>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Bookings */}
                    <div className="p-4 bg-black rounded-lg text-white text-center">
                      <h2 className="text-lg font-medium">TOTAL BOOKINGS</h2>
                      <h1 className="text-4xl font-bold">{countTotal ? countTotal : 0}</h1>
                    </div>
                    {/* Work Completed */}
                    <div className="pt-4 bg-black rounded-lg text-white text-center">
                      <h2 className="text-lg font-medium">WORK COMPLETED</h2>
                      <h1 className="text-4xl font-bold">{totalCompleted ? totalCompleted : 0}</h1>
                    </div>
                    {/* Work Pending */}
                    <div className="p-4 bg-black rounded-lg text-white text-center">
                      <h2 className="text-lg font-medium">WORK PENDING</h2>
                      <h1 className="text-4xl font-bold">{totalPending ? totalPending : 0}</h1>
                    </div>
                  </div>
                </div>
              

              </div>

              {/* Main Content */}
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h1 className="text-xl font-semibold mb-4">Recent Bookings</h1>
              {allBookings.length > 0 ? (
                allBookings.map((item) => (
                  <div key={item._id} className="mb-4 bg-gray-200 p-4 rounded-lg shadow flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.user ? item.user.image : 'profileimage.png'} className="h-16 w-16 rounded-full" alt="" />
                      <div>
                        <h2 className="text-lg font-medium">{item.user ? item.user.name : ''}</h2>
                        <p className="text-sm">{item.user ? item.user.email : ''}</p>
                        <p className="text-sm">Ph: {item.user ? item.user.phone : ''}</p>
                      </div>
                    </div>
                    <button onClick={() => navigate('/proffesional/bookings')} className="bg-purple-700 hover:translate-x-1 px-3 text-white rounded-md">View</button>
                  </div>
                ))
              ) : (
                <p>No recent bookings.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePro;
