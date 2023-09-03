import { Route, Routes } from 'react-router-dom'
import React from 'react'
import SignUp from '../Pages/proffesional/SignUp'
import Loginpro from '../Pages/proffesional/Loginpro'
import OtpLogin from '../Pages/proffesional/OtpLogin'
import ProHome from '../Pages/proffesional/ProHome'
import Chats from '../Components/proffesional/Chat/Chats'
import Profile from '../Pages/proffesional/Profile'
import ProBookings from '../Pages/proffesional/ProBookings'
import OtpCompletedBooking from '../Pages/proffesional/OtpCompletedBooking'
import { useSelector } from 'react-redux'

function ProfRoutes() {
  const token = useSelector((store)=>store.Proffessional.Token)
  return (
    <>
    <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login'  element={token?<ProHome/>:<Loginpro/>}/>
        <Route path='/otplogin'  element={<OtpLogin/>}/>
        <Route path='/prohome'  element={token?<ProHome/>:<Loginpro/>}/>
        <Route path='/proChats'  element={token?<Chats/>:<Loginpro/>}/>
        <Route path='/profile'  element={token?<Profile/>:<Loginpro/>}/>
        <Route path='/bookings'  element={token?<ProBookings/>:<Loginpro/>}/>
        <Route path='/otpbookings'  element={token?<OtpCompletedBooking/>:<Loginpro/>}/>
    </Routes>
    </>

    )
}

export default ProfRoutes
