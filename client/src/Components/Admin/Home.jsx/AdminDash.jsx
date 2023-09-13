import React, { useEffect, useState } from 'react'
import Axios from '../../../Axios/AdminAxios'
import UserList from '../UsersList/UserList'
import { useDispatch } from 'react-redux'
import { AdminLogout } from '../../../Redux/AdminState'
import { useNavigate } from 'react-router-dom'


function AdminDash() {
  const [dashbordData,setDashBordData] = useState('')
  const adminAxios = Axios()
  const [count, setCount] = useState(0);
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    adminAxios.get('/getDashbordDetails').then((res)=>{
     if(res.data){
      setDashBordData(res.data)
     }else{
      console.log(error)
     }
    },)

  },[])

  useEffect(() => {
    adminAxios
      .get('/getuser')
      .then((res) => {
        console.log(res);
        if(res.data.status==false){
          setTimeout(() => {
            dispatch(AdminLogout(''))
            navigate('/admin/login')
          }, 300);
          return
        }
        if (res.status === 200) {
          setDetails(res.data.userList);
          console.log(details);
        }else{
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);
  return (
    <>
  <div className='flex flex-col w-screen  h-full  bg-slate-900 sm:pb-10 md:pb-0 xl-pb-2  '>
   <div className='w-screen flex flex-col items-center h-fit sm:h-full bg-slate-300'>
    <div className='w-full sm:w-5/6  xl:h-[12rem] mt-[4%]  pb-4  rounded bg-white'>
          <h1 className='pl-2 ml-3 font-bold'>Dashbord</h1> 
          <div className='w-full h-5/6 grid grid-cols-4 justify-items-center gap-y-2 md:gap-x-1 md:flex md:justify-evenly md:items-center bg-white'>
            <div className='w-[80%] lg:w-[21%] h-[10rem] col-span-4 sm:col-span-2 rounded lg:h-[90%] md:ml-1 bg-gradient-to-t from-blue-600 to-blue-300'>
          
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>₹{dashbordData.profit?dashbordData.profit.profit:0}</h1>
                    <img src="/Rupee.png" className='w-16 h-16  border rounded-full ' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-md font-bold'>Total Revenue</h1>
                  <p className='text-xs text-end font-medium text-white'>Other hand, we denounce.</p>
                 </div>

            </div>
            <div className='w-[80%] lg:w-[21%]  h-[10rem] col-span-4 sm:col-span-2 rounded lg:h-[90%] bg-gradient-to-t from-blue-600 to-blue-300'>
          
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>{dashbordData.workShop?dashbordData.workShop:0}</h1>
                    <img src="/Shipping.png" className='w-16 h-16 border rounded-full' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-sm lg:text-md font-bold'>Total-Workshops</h1>
                  <p className='text-xs text-end font-medium text-white'>Other hand, we denounce.</p>
                 </div>

            </div>
            <div className='w-[80%] lg:w-[21%] h-[10rem] col-span-4 sm:col-span-2 lg:h-[90%] rounded bg-gradient-to-t from-blue-600 to-blue-300'>
          
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>{dashbordData.pro?dashbordData.pro:0}</h1>
                    <img src="/Worker.png" className='border rounded-full w-16 h-16' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-sm lg:text-md font-bold'>Total Mechanics</h1>
                  <p className='text-xs text-end text-white font-medium'>Other hand, we denounce.</p>
                 </div>

            </div>
            <div className='w-[80%] lg:w-[21%] col-span-4 sm:col-span-2 h-[10rem] lg:h-[90%] md:mr-1 rounded bg-gradient-to-t from-blue-600 to-blue-300'>         
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>{dashbordData.user?dashbordData.user:0}</h1>
                    <img src="/User.png" className='w-16 h-16 rounded-full border' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-md font-bold'>Total Users</h1>
                  <p className='text-xs text-end text-white font-medium'>Other hand, we denounce.</p>
                 </div>

            </div>
           
          </div>
    </div>
   </div>

   <UserList details={details} setCount={setCount} count={count} type='user'/> 
     </div>
  </>
  )
}

export default AdminDash