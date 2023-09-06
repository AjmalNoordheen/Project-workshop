import React from 'react'
import Navbar from '../../Components/Admin/NavBar/Navbar'
import WithDrawReq from '../../Components/Admin/WithdrawelRequest/WithDrawReq'

function WithdrawRequest() {
  return (
    <div className='bg-slate-300 min-h-screen max-h-full flex flex-col gap-2'>
        <Navbar/>
        <WithDrawReq/>
    </div>
  )
}

export default WithdrawRequest