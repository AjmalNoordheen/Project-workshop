import React from 'react'
import Wallet from '../../Components/ReuseItems/Wallet'
import Navbar from '../../Components/user/Navbar/Navbar'

function UserWallet() {
  return (
   <>
  <div className='bg-blue-700'>
  <Navbar data={1}/>
  </div>
   <Wallet/>
   </>
  )
}

export default UserWallet