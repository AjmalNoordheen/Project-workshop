import { Route, Routes } from 'react-router-dom'
import React from 'react'
import UserProfile from '../Components/user/UserProfile/UserProfile'
import Home from '../Pages/Home'
import UserSignUp from '../Pages/UserSignUp'
import Userlogin from '../Pages/UserLogin'
import VerifyEmail from '../Pages/VerifyEmail'
import OtpNumer from '../Components/user/otp/OtpNumber'
import ProDetailedPage from '../Pages/ProDetailedPage'
import CheckOut from '../Components/Paypal/CheckOut'
import ProfessionalList from '../Components/user/ListPoffesionals/ProfessionalList'
import SuccessPage from '../Components/Paypal/SuccessPage'
import RazorPay from '../Components/Paypal/RazorPay'
import UsersBooking from '../Pages/User/UsersBooking'
import { useSelector } from 'react-redux'
import Errorpage from '../Components/ReuseItems/Errorpage'


function UserRoute() {
  const token = useSelector((store)=>store.Client.Token)
  return (
   
    <>
    <Routes>
    <Route path='' element={<Home/>}/>
      <Route path='/*' element={<Errorpage/>}/>
      <Route path='/signup'    element={<UserSignUp/>}/>
      <Route path='/login'     element={token?<Home/>:<Userlogin/>}/>
      <Route path='/verify'    element={<VerifyEmail/>}/>
      <Route path='/otplogin'  element={<OtpNumer/>}/>
     <Route path='/userProfile'element={token?<UserProfile/>:<Userlogin/>}/>
     <Route path='/proDetails' element={token?<ProDetailedPage/>:<ProDetailedPage/>}/>
     <Route path='/prolists'   element={token?<ProfessionalList/>:<ProfessionalList/>}/>
     <Route path='/razorpay'   element={token?<CheckOut/>:<Userlogin/>}/>
     <Route path='/razorpayPage' element={token?<RazorPay/>:<Userlogin/>}/>
     <Route path='/successpage' element={token?<SuccessPage/>:<Userlogin/>}/>
     <Route path='/bookings' element={token?<UsersBooking/>:<Userlogin/>}/>
    </Routes>
    </>
  )
}

export default UserRoute