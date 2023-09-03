import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import createAxiosInstance from '../../Axios/userAxios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../user/Navbar/Navbar'
import { useNavigate } from "react-router-dom";
function UserEdit({ setShow}) {
  const [user, setUser] = useState('');
  const [file, setFile] = useState('');
  const [loader, setloader] = useState(false);

  console.log(file);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const navigate = useNavigate()
  const email = useSelector((store) => store.Client.email);
  const token = useSelector((store) => store.Client.Token);
  const img=useRef()
  const userAxios = createAxiosInstance()
  useEffect(() => {
     userAxios
      .get(`/getUserProfile?email=${email}`
      )
      .then((res) => {
        if(res.data.message=='blocked'){
          toast.error('Account is blocked ')
          setTimeout(() => {
            navigate('/login')
          }, 300);
          return
        }
        if (res.status == 200) {
          setUser(res.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };

  async function EditDetails(e) {
    try {
      e.preventDefault();
      const name = nameRef.current.value.trim();
      const phone = phoneRef.current.value.trim();
      const location = locationRef.current.value.trim();
        if (
          name == user.name &&
          phone == user.phone &&
          location == user.location&&
          file==''
        ) {
          showErrorMessage("no changes applied");
        } else if (name == "" || phone == "" || location == "") {
          showErrorMessage("fill all the feilds");
        }else if(phone.length!=10){
          showErrorMessage("number must contain 10 ");
        } else {
          setloader(true)
         const res =await userAxios.patch(`/editUser?email=${email}`,{email,name,phone,location,file},
         {headers : {'Content-Type': 'multipart/form-data'}}
         )
         if(res.data.message=='blocked'){
          toast.error('Account is blocked ')
          setTimeout(() => {
            navigate('/login')
          }, 300);
          return
        }
         if(res.status==200){
           showToastMessage() 
           setShow('hide')
         }else{
          showErrorMessage(error)
         }
        }
    } catch (error) {
      showErrorMessage(error)
    }
  }
  return (
    <>
<div className="h-screen  w-full flex justify-center bg-slate-300">
        <div className="mt-5 mb-5 relative flex-col justify-center border-b-[3rem] border-blue-700  w-11/12 rounded-lg lg:w-4/5 md:w-5/6 sm:w-11/12 bg-slate-100">
          <div  className="w-full rounded-t-lg  md:h-1/3 bg-gradient-to-r from-blue-700 to-blue-600">
           <NavBar data={1} />
          </div>
          <div className="w-full sm:w-10/12 md:w-9/12   sm:flex lg:w-8/12 xl:w-9/12
           bg-white overflow-scroll h-5/5 md:h-3/4 rounded-lg absolute sm:bottom-8 md:left-[13%] transform-translate-x-1/2">
            <div className="md:w-2/4 sm:w-2/6  md:h-full flex justify-center     bg-white rounded-lg">
              <div className="flex-col  sm:p-5 pt-2 sm:pt-0  lg:p-12 m-auto">
                <img
                 src={file instanceof File ? URL.createObjectURL(file) :user.image? user.image: "/profileimage.png"}
                 onClick={()=>img.current.click()}
                  alt="Profile"
                  className="md:h-28 md:w-28  h-16 w-16 sm:h-24 sm:w-24 rounded-full m-auto"
                  />
                  <input type="file" className=" mt-2 ml-12 text-xs" accept="image/*" hidden ref={img} name="file" onChange={(e)=>setFile(e.target.files[0])}/>

                <h1 className="sm:ml-16 md:my-3 ml-16 mt-4 sm:mt-0  font-jockey-one sm:text-sm text-xs md:text-base font-bold">
                  {user?user.name:''}
                </h1>
                <h3 className="md:mx-3 mx-1 text-slate-600 font-jockey-one font-normal text-xs">
                 {user?user.email:''}
                </h3>
              </div>
            </div>
            <div className="w-full h-full rounded-md  bg-white">
              <div className="flex items-center   justify-center">
                <div className="p-8 sm:mt-10 lg:mt-2 ">
                  <form action=""  onSubmit={EditDetails} className="">
                    <div className="grid grid-cols-1 md:mt-10 gap-y-3 md:grid-cols-2 ">
                      <div className=" md:text-start m-auto">
                        <label htmlFor="name" className="block text-xs sm:text-sm md:text-base sm:font-semibold">
                          Name :
                        </label>
                      </div>
                      <div>
                      <input
                  defaultValue={user?user.name:''}
                  type="text"
                  min={1}
                  ref={nameRef}
                  name="username"
                  required
                          className="w-full px-10 md:w-[10rem] lg:px-2 sm:px-8 text-base py-1 sm:py-1 rounded-lg border"
                        />
                      </div>

                      <div className="md:text-start m-auto">
                        <label htmlFor="name" className="block text-xs sm:text-sm md:text-base font-semibold">
                          Mobile :
                        </label>
                      </div>
                      <div>
                      <input
                  defaultValue={user?user.phone:''}
                  type="number"
                  placeholder=""
                  min={1}
                  
                  ref={phoneRef}
                  required
                          className="w-full  md:w-[10rem] px-10 lg:px-2 sm:px-8 py-1 rounded-lg border"
                        />
                      </div>
                      <div className="md:text-start m-auto">
                        <label htmlFor="name" className="block text-xs sm:text-sm md:text-base font-semibold">
                          Location :
                        </label>
                      </div>
                      <div>
                      <input
                  defaultValue={user?user.location:''}
                  type="text"
                  placeholder=""
                  min={1}
                  ref={locationRef}
                  required
                          className=" px-10 lg:px-2 md:w-[10rem] sm:px-8 py-1 rounded-lg border"
                        />
                      </div>
                     {loader? <button type="submit" className="bg-gradient-to-r w-[8rem] from-blue-700 to-blue-600 mt-3 ml-auto py-1 px-3 rounded text-white">
                     <i class="fa-solid fa-circle-notch text-white animate-spin"></i>
                      </button>:<button type="submit" className="bg-gradient-to-r w-[8rem] from-blue-700 to-blue-600 mt-3 ml-auto py-1 px-3 rounded text-white">
                        Submit
                      </button>}
                      
                     
                    
                    </div>
                  </form>
                </div>
              </div>
            </div>
                  <span className="p-2 text-black cursor-pointer hover:text-red-700" onClick={()=>{setShow('hide')}}>Cancel</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserEdit;
