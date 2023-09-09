import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import SignUp from '../Pages/proffesional/SignUp'
import Loginpro from '../Pages/proffesional/Loginpro'
import OtpLogin from '../Pages/proffesional/OtpLogin'
import ProHome from '../Pages/proffesional/ProHome'
import Chats from '../Components/ReuseItems/Chat/ChatArea'
import Profile from '../Pages/proffesional/Profile'
import ProBookings from '../Pages/proffesional/ProBookings'
import OtpCompletedBooking from '../Pages/proffesional/OtpCompletedBooking'
import { useSelector } from 'react-redux'
import Wallet from '../Components/ReuseItems/Wallet'
import ProWallet from '../Pages/proffesional/ProWallet'
import Errorpage from '../Components/ReuseItems/Errorpage'

function ProfRoutes() {
  const token = useSelector((store)=>store.Proffessional.Token)
  return (
    <>
    <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login'  element={token?<Navigate to={'/proffesional/prohome'}/>:<Loginpro/>}/>
        <Route path='/otplogin'  element={<OtpLogin/>}/>
        <Route path='/prohome'  element={token?<ProHome/>:<Navigate to={'/proffesional/login'}/>}/>
        <Route path='/proChats'  element={token?<Chats/>:<Navigate to={'/proffesional/login'}/>}/>
        <Route path='/profile'  element={token?<Profile/>:<Navigate to={'/proffesional/login'}/>}/>
        <Route path='/bookings'  element={token?<ProBookings/>:<Navigate to={'/proffesional/login'}/>}/>
        <Route path='/otpbookings'  element={token?<OtpCompletedBooking/>:<Navigate to={'/proffesional/login'}/>}/>
        <Route path="/wallet" element={<ProWallet/>} />
        <Route  element={<Errorpage/>}/>

    </Routes>
    </>

    )
}

export default ProfRoutes
