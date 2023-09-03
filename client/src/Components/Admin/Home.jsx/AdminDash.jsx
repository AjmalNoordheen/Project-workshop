import React, { useEffect } from 'react'

function AdminDash() {
  return (
   <>
   <div className='w-screen flex flex-col items-center  h-screen bg-red-800'>
    <div className='w-5/6  h-2/6 flex flex-col items-center pb-3  bg-white'>
          <h1>Dashbord</h1> 
          <div className='w-[95%] h-5/6 flex justify-between bg-blue-600'>
            <div className='w-[23%] h-[100%] bg-red-700'></div>
            <div className='w-[23%] h-[100%] bg-red-700'></div>
            <div className='w-[23%] h-[100%] bg-red-700'></div>
            <div className='w-[23%] h-[100%] bg-red-700'></div>
          </div>
    </div>
   </div>
   </>
  )
}

export default AdminDash