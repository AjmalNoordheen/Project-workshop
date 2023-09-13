import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import proAxiosInstance from '../../../Axios/proAxios'
import EditModal from "./EditModal";
import { ProfessionalLogout } from "../../../Redux/ProState";
import ProGallery from "./ProGallery";


function ProProfile() {
  const [prof,setProf]  = useState('')
  const proAxios = proAxiosInstance()
  const dispatch = useDispatch()
  const [modal,setModal] = useState('hide')
  const [status,setStatus] = useState('')
  const [count,setCount] = useState(true)
  const navigate  = useNavigate()
  const proData = useSelector((state)=>state.Proffessional.proData)
  useEffect(()=>{
     proAxios.get(`/proProfile?proId=${proData._id}`).then((res)=>{
      if(res.data.message=='blocked'){
        toast.error('Account is blocked ')
        setTimeout(() => {
          dispatch(ProfessionalLogout(''))
          navigate('/proffesional/login')
        }, 300);
        return
      }
      if(res.data.status===false )  {
         setTimeout(() => {
          dispatch(ProfessionalLogout(''))
          navigate('/proffesional/login')
        }, 300);
      }
      if(res.status==200){
          setProf(res.data)
        }
    }).catch((err)=>{
      console.log(err);
    })
  },[modal,status,count])

  const changeAvailability = async(type,id)=>{
    if(type=='onwork'){
      setCount(true)
    }else{
      setCount(false)
    }
    const res =await proAxios.post('/changeAvailability',{type,id})
    if(res.data){
      setStatus(res.data)
    }else{
      console.log(error)
    }
  
  }
  console.log(status)
  return (
    <>
     <div  className="min-h-screen  bg-gray-100">
      <div className="p-4 md:p-10 flex justify-center items-center">
        <div className="w-full max-w-screen-lg p-6 md:p-10 mx-auto relative rounded bg-white shadow-md">
       <div className="w-full text-end relative">
        {modal=='show'?<button onClick={()=>setModal('hide')} className="px-4 rounded text-center
         text-white mb-1 bg-purple-700">Cancel</button>:<button onClick={()=>setModal('show')} className="px-4 rounded 
         text-center text-white mb-1 bg-purple-700">Edit</button>
        }
       </div>
          <div className="border w-11/12 left-11 absolute top-15 border-gray-300"></div>
          <div className="flex flex-col md:flex-row md:gap-5 md:pt-10 relative">
          <div className="md:relative">
            <img
            
              src={prof.image?prof.image:'/profileimage.png'}
              className="w-36 h-36 md:w-44 rounded-full md:h-44 md:left-16"
              alt=""
              />
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:w-2/3">
            <div className="md:w-1/2 ">
              <h1 className="text-2xl md:text-4xl font-josefin-sans font-bold">
               {prof.name?prof.name:''}
              </h1>
              <div className="mt-2 md:mt-4 space-y-3">
                <p className="text-base font-josefin-sans md:text-lg">
                  Profession: {prof.work?prof.work:''}
                </p>
               
                <div className="flex  items-center">
                  <p className="text-base font-josefin-sans md:text-lg">
                    Ranking:
                  </p>
                  <div className="ml-2 ">
                    {/* You can use star icons for rating */}
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
                {prof.status=="Active"?<button title="Click to change as not Available" onClick={()=>changeAvailability('onwork',prof?._id)} 
                
                className="bg-blue-600 px-3 py-1 rounded font-bold text-white ">Not Available</button>:
                <button title="Click to change as not Available" onClick={()=>changeAvailability('Active',prof?._id)} className="bg-blue-600 px-3 py-1 
                rounded font-bold text-white ">Available</button>}


              </div>
            </div>
            <div className="flex flex-col md:w-1/3 mt-12">
              <div className="flex items-center mb-2 md:mb-4">
                <img
                  src="/footer/Cardmap.png"
                  alt=""
                  className="w-4 h-4 md:w-5 md:h-5"
                  />
                <p className="ml-2 text-base font-josefin-sans md:text-lg">
                 {prof.location?prof.location:''}
                </p>
              </div>
              <div className="flex gap-2">
                <img
                  src="/footer/spanner1.png"
                  alt=""
                  className="w-4 h-4 md:w-5 md:h-5"
                  />
                 <p className="text-base font-josefin-sans md:text-lg">
                  Vehicle Type: <br />
                   <span className="text-sm"> {prof.types?prof.types.map((item)=>item.name).join('  /'):''} </span>
                </p>
              </div>
            </div>
          </div>
                  {modal=='show'?<EditModal fun={setModal}/>:''}                
        </div>
        
        <div className="w-11/12 mx-auto h-1 border-t-2 border-gray-300 mt-5" />
        <div className="flex flex-col mt-6 md:flex-row items-center gap-6 md:justify-center">
  <div className="pb-5 md:pb-0 md:mb-10 grid gap-2 md:ml-4">
    <div className="bg-white p-6 w-full md:min-w-[20rem] rounded-lg shadow-lg">
      <p className="text-xl font-semibold mb-4">Service Details</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="font-bold">Service Fee:</span>
          <span className="text-green-500 font-bold">
            ₹ {prof.fees ? prof.fees : ""}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Email:</span>
          <span>{prof.email ? prof.email : ""}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Address:</span>
          <span>{prof.address ? prof.address : ""}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Working Hours:</span>
          <span>{prof.workingTime ? prof.workingTime : ""}</span>
        </div>
      </div>
    </div>
  </div>
</div>

          <hr />
          <h2 className="text-xl font-bold pb-2 text-gray-500 lg:text-2xl">
          CLUB GALLERY
        </h2>
          <ProGallery/>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProProfile;
