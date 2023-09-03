import React from 'react'

function Wallet() {
  return (
   <>
   <div className='h-screen w-screen flex items-center justify-center bg-slate-200'>
        <div className='h-[95%] flex flex-col justify-evenly items-center w-4/6 text-center bg-white'>
             <div>
             <h1 className='text-black'>Account Balance</h1>
              <h1 className='text-black text-5xl'>₹25000</h1>
             </div>
              <div className='w-4/6 h-[75%]  bg-gradient-to-r from-blue-700 to-blue-600 rounded-md bg-opacity-80'>
                 
                  <form action="">
                <div className='flex flex-col text-center mt-[4%] gap-y-4 items-center'>
                  <input placeholder='₹ Enter Amount' className='w-2/6 h-11 text-center rounded-md bg-white' type="number" />
                   <input placeholder=' Account Holder Name' className='w-4/6 h-11 rounded-md text-center bg-white' type="text" />
                   <input placeholder=' Account Number' className='w-4/6 h-11 rounded-md text-center bg-white' type="text" />
                   <input placeholder=' Bank Name ' className='w-4/6 h-11 rounded-md text-center bg-white' type="text" />
                  <input  placeholder='IFSC Code ' className='w-4/6 h-11 rounded-md text-center bg-white' type="text" />
                  <input  placeholder='Branch ' className='w-4/6 h-11 rounded-md text-center bg-white' type="text" />
                <button className='w-2/6 h-10 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-800 border'>Submit</button>
                </div>
                  </form>
              </div>
        </div>
   </div>
   </>
  )
}

export default Wallet