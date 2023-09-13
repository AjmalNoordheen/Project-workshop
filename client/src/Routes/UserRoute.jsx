import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import UserProfile from '../Components/user/UserProfile/UserProfile'
import Home from '../Pages/Home'
import UserSignUp from '../Pages/UserSignUp'
import Userlogin from '../Pages/Userlogin'
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
import UserWallet from '../Pages/User/UserWallet'


function UserRoute() {
  const token = useSelector((store)=>store.Client.Token)
  return (
   
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/signup'    element={<UserSignUp/>}/>
      <Route path='/login'     element={token?<Navigate to={'/'}/>:<Userlogin/>}/>
      <Route path='/verify'    element={<VerifyEmail/>}/>
      <Route path='/otplogin'  element={<OtpNumer/>}/>
     <Route path='/userProfile'element={token?<UserProfile/>:<Navigate to={'/login'}/>}/>
     <Route path='/proDetails' element={token?<ProDetailedPage/>:<ProDetailedPage/>}/>
     <Route path='/prolists'   element={token?<ProfessionalList/>:<ProfessionalList/>}/>
     <Route path='/razorpay'   element={token?<CheckOut/>:<Navigate to={'/login'}/>}/>
     <Route path='/razorpayPage' element={token?<RazorPay/>:<Navigate to={'/login'}/>}/>
     <Route path='/successpage' element={token?<SuccessPage/>:<Navigate to={'/login'}/>}/>
     <Route path='/bookings' element={token?<UsersBooking/>:<Navigate to={'/login'}/>}/>
     <Route path="/wallet" element={<UserWallet/>} />
      <Route path='/*' element={<Errorpage/>}/>

    </Routes>
    </>
  )
}

export default UserRoute