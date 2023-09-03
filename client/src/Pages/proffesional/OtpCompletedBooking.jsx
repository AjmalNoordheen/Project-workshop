import React from 'react'
import ProOtp from '../../Components/proffesional/BookingOtp/ProOtp'
import { useLocation } from 'react-router-dom';

function OtpCompletedBooking() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // Get the value of the 'id' query parameter
    const id = searchParams.get('id');

  return (
  <>
  <ProOtp id={id}/>
  </>
  )
}

export default OtpCompletedBooking