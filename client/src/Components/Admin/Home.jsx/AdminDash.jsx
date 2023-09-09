import React, { useEffect, useState } from 'react'
import Axios from '../../../Axios/AdminAxios'


function AdminDash() {
  const [dashbordData,setDashBordData] = useState('')
  const adminAxois = Axios()
  useEffect(()=>{
    adminAxois.get('/getDashbordDetails').then((res)=>{
     if(res.data){
      setDashBordData(res.data)
     }else{
      console.log(error)
     }
    })

  })
  return (
   <>
   <div className='w-screen flex flex-col items-center  h-screen bg-slate-300'>
    <div className='w-5/6  h-2/6 mt-[4%] rounded bg-white'>
          <h1 className='pl-2 ml-3 font-bold'>Dashbord</h1> 
          <div className='w-full h-5/6 flex justify-evenly items-center bg-white'>
            <div className='w-[21%] h-[90%] bg-gradient-to-t from-blue-600 to-blue-300'>
          
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
            <div className='w-[21%] h-[90%] bg-gradient-to-t from-orange-600 to-orange-300'>
          
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>{dashbordData.workShop?dashbordData.workShop:0}</h1>
                    <img src="/Shipping.png" className='w-16 h-16 border rounded-full' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-md font-bold'>Total WorkShops</h1>
                  <p className='text-xs text-end font-medium text-white'>Other hand, we denounce.</p>
                 </div>

            </div>
            <div className='w-[21%] h-[90%] bg-gradient-to-t from-orange-600 to-orange-300'>
          
                  <div className='flex items-center  justify-center'>
                   <div className='flex items-center mt-2 w-[80%] justify-evenly'>
                   <h1 className='text-3xl font-bold'>{dashbordData.pro?dashbordData.pro:0}</h1>
                    <img src="/Worker.png" className='border rounded-full w-16 h-16' alt="" />
                   </div>
                  </div>
                 <div className='w-[70%]'>
                 <h1 className='text-center text-md font-bold'>Total Mechanics</h1>
                  <p className='text-xs text-end text-white font-medium'>Other hand, we denounce.</p>
                 </div>

            </div>
            <div className='w-[21%] h-[90%] bg-gradient-to-t from-orange-600 to-orange-300'>
          
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
   </>
  )
}

export default AdminDash