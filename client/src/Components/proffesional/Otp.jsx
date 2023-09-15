import React, { useEffect, useRef, useState } from 'react'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { Toaster, toast } from 'react-hot-toast'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import createAxiosInstance from '../../Axios/proAxios'
import { ProfessionalLogin } from '../../Redux/ProState'
import { auth } from '../../Firebase/Firebases.config'

function ProOtp() {

  const regex_mobile = /^\d{10}$/
  const [clicked, setClicked] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState()
  const [resend, setResend] = useState(false)
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ProAxios = createAxiosInstance()


  const checkMob = () => {
    setResend(false)
    let newPhone = phone.trim()
    if (newPhone.length!==10) {  
      toast.error('Enter a valid number')
    } else {
         ProAxios.post('/proOtp', { newPhone }).then((res) => {
        if (res.status == 200) {
          setData(res.data.data)
          onCaptchaVerify()
          const appVerifier = window.recaptchaVerifier
          const phoneNo = '+91' + newPhone
          signInWithPhoneNumber(auth, phoneNo, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              setShowOTP(true)
              toast.success('OTP send')
            }).catch((error) => {
              if (error?.response?.data?.errMsg) {
                toast.error(error?.response?.data?.errMsg)
                console.log(error);
              }
            });
        }else{
          toast.error("User not found")
        }
      }).catch((err)=>{ 
        toast.error("User not found")
    })
    }
  }

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          checkMob()
        },
        'expired-callback': () => {
          console.log('expired callback');
        }
      }, auth);
    }

  }

  function otpVerify() {
    setClicked(true)
    window.confirmationResult.confirm(otp).then(async (res) => {
      dispatch(ProfessionalLogin({token: data.token}))
      navigate('/proffesional/prohome')
    }).catch((err) => {
      setResend(true)
      setClicked(false)
      toast.error('Otp verify error')
      console.log(err + 'otp verify error');
    })
  }


  const [seconds, setSeconds] = useState(60);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if(showOTP){
      setSeconds(60)
      if (seconds > 0) {
        const decrementSeconds = () => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
        countdownIntervalRef.current = setInterval(decrementSeconds, 1000);
      }
  
      return () => clearInterval(countdownIntervalRef.current);
    }
  }, [resend,showOTP]);

  useEffect(() => {
    if (seconds <= 0) {
      setResend(true)
      clearInterval(countdownIntervalRef.current)
    }
  }, [seconds]);

  return (
    <div style={{ 'height': '100vh' }} className='bg-gray-800 flex justify-center items-center'>
      <div id='recaptcha-container'></div>
      <div className=' bg-gray-900 p-5 rounded'>
        <Toaster toastOptions={3000} /><div className='bg-white text-emarald-500 w-fit mx-auto p-4 rounded-full'>
          <BsFillShieldLockFill size={30} />
        </div>
        {showOTP ? <h1 className='text-white font-bold text-center mt-2'>Enter Your OTP</h1> : <h1 className='text-white font-bold text-center mt-2'>Enter Your Mobile</h1>}
        <div className='p-5 '>
          {showOTP ? <OtpInput
            className='ms-3'
            OTPLength={6}
            value={otp}
            onChange={setOtp}
            otpType='number'
            disabled={false}
            autoFocus
          /> : <input
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="phone"
            placeholder="phone No" />}
         {showOTP&&<div className='flex justify-center'>
            <span className='text-center text-white'>{seconds}</span>
          </div>}
          {!showOTP ? <button className='text-white mt-3 bg-gray-600 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={checkMob}><span>Send Otp</span></button> : resend ? <button className='text-white mt-3 bg-green-800 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={checkMob}>{clicked ? <CgSpinner size={20} className='animate-spin' /> : ''}<span>Resend Otp</span></button> : <button className='text-white mt-3 bg-green-800 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={otpVerify}>{clicked ? <CgSpinner size={20} className='animate-spin' /> : ''}<span>Verify OTP</span></button>}
        </div>

      </div>
    </div>
  )
}

export default ProOtp