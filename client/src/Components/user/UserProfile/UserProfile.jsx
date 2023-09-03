import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import UserEdit from "../../ReuseItems/UserEdit";
import userAxiosInstance from '../../../Axios/userAxios'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState("");
  const [show, setShow] = useState("hide");
  const [height, setHeight] = useState(0);
  const email = useSelector((store) => store.Client.email);
  const token = useSelector((store) => store.Client.Token);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userAxios = userAxiosInstance()
  useEffect(() => {
    userAxios.
      get(`/getUserProfile?email=${email}`, {
      })
      .then((res) => {
        if(res.data.message=='blocked'){
          toast.error('Account has been blocked')
          dispatch(ClientLogout());
          setTimeout(()=>{
            navigate('/login')
          },300)
          return
        }
        if (res.status == 200) {
          setUser(res.data.user);
        } else if (res.data.status == false) {
          dispatch(ClientLogout());
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show,token]);
  return (
    <>
      {show == "show" ? (
        <UserEdit setShow={setShow} />
      ) : (
        <div className="h-screen  w-full flex justify-center bg-slate-300">
          <div
            className={
              show == "show"
                ? "mt-5 mb-5 relative flex-col justify-center border-b-[3rem] border-blue-700  w-11/12 rounded-lg lg:w-4/5 md:w-5/6 sm:w-11/12 bg-gradient-to-r from-blue-700 to-blue-600"
                : "mt-5 mb-5 relative flex-col justify-center border-b-[3rem] border-blue-700  w-11/12 rounded-lg lg:w-4/5 md:w-5/6 sm:w-11/12 bg-slate-100"
            }
          >
            <div className="w-full rounded-t-lg  h-1/3 bg-gradient-to-r from-blue-700 to-blue-600">
              {show != "show" ? <NavBar data={1} setHeight={setHeight} /> : ""}
            </div>
            <div
              className={
                height == 0
                  ? "w-full sm:w-10/12 md:w-9/12  sm:flex lg:w-8/12 xl:w-9/12 bg-white h-4/5 overflow-scroll md:h-3/4 rounded-lg absolute bottom-8 md:left-[13%] transform-translate-x-1/2"
                  : "w-full sm:w-10/12 md:w-9/12  sm:flex lg:w-8/12 xl:w-9/12 bg-white overflow-scroll h-2/5 md:h-3/4 rounded-lg absolute bottom-8 md:left-[13%] transform-translate-x-1/2"
              }
            >
              <div className="md:w-2/4 sm:w-2/6  md:h-full flex justify-center   bg-white rounded-lg">
                <div className="flex-col  sm:p-5 lg:p-12 m-auto">
                  <img
                    src={user?user.image : "/profileimage.png"}
                    alt="Profile"
                    className="md:h-28 md:w-28  h-16 w-16 sm:h-24 sm:w-24 rounded-full m-auto"
                  />
                  <h1 className="sm:ml-10 md:my-3 ml-10 mt-4 sm:mt-0  font-jockey-one sm:text-sm text-xs md:text-base font-bold">
                    {user?user.name:''}
                  </h1>
                  <h3 className="md:mx-3 mx-1 text-slate-600 font-jockey-one font-normal text-xs">
                    {user?user.email:''}
                  </h3>
                </div>
              </div>
              <div className="w-full h-full rounded-md  bg-white">
                <div className="flex items-center  justify-center">
                  <div className="p-8 sm:mt-10 lg:mt-2 ">
                    <button
                      onClick={() => setShow("show")}
                      className="float-right ml-3 px-3 py-1 rounded text-white bg-gradient-to-r from-blue-700 to-blue-600"
                    >
                      Edit
                    </button>
                    <form action="" className="">
                      <div className="grid grid-cols-1  gap-y-3 md:grid-cols-2 ">
                        <div className=" md:text-start m-auto">
                          <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base sm:font-semibold"
                          >
                            Name :
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="name"
                            value={user?user.name:''}
                            className="w-full px-10 lg:px-2 sm:px-8 text-base py-1 sm:py-1 rounded-lg border"
                          />
                        </div>

                        <div className="md:text-start m-auto">
                          <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base font-semibold"
                          >
                            Email :
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="name"
                            value={user?user.email:''}
                            className="w-full px-5 lg:px-2 text-sm sm:px-8 py-1 rounded-lg border"
                          />
                        </div>
                        <div className="md:text-start m-auto">
                          <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base font-semibold"
                          >
                            Mobile :
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="name"
                            value={user?user.phone:''}
                            className="w-full px-10 lg:px-2 sm:px-8 py-1 rounded-lg border"
                          />
                        </div>
                        <div className="md:text-start m-auto">
                          <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base font-semibold"
                          >
                            Location :
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="name"
                            value={user?user.location:''}
                            className="w-full px-10 lg:px-2 sm:px-8 py-1 rounded-lg border"
                          />
                        </div>
                        <div className="md:text-start m-auto">
                          <label
                            htmlFor="name"
                            className="block text-xs sm:text-sm md:text-base font-semibold"
                          >
                            Status :
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            id="name"
                            value={user?user.status:''}
                            className="w-full px-10 lg:px-2 sm:px-8 py-1 rounded-lg border"
                          />
                        </div>

                        <button className="bg-gradient-to-r from-blue-700 to-blue-600 mt-3 py-1 mx-7 rounded text-white">
                          Bookings
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
