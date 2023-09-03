import React, { useEffect, useState } from 'react'
import createAxiosInstance from '../../Axios/userAxios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function RazorPay({ data, bookingForm, fees }) {
    const userEmail = useSelector((state)=>state.Client.email)
    const navigate = useNavigate()
    const userAxios = createAxiosInstance()
    useEffect(() => {
        handlesubmit();
    }, []);

    const saveBooking =(paymentId)=>{
        const bookingData = {
            paymentId:paymentId,
            proDetails     :data,
            fees           :fees,
            date           :bookingForm.bookingDate,
            location       :bookingForm.location,
            landMark       :bookingForm.landMark,
            userEmail      :userEmail,
            proId          :data._id
        }
        
        
           userAxios.post(`/saveBookingDetails?email=${userEmail}`,{bookingData}).then(()=>{
            if(res.data.message=='blocked'){
                toast.error('Account is blocked ')
                setTimeout(() => {
                  navigate('/login')
                }, 300);
                return
              }
           if( res.data.status=='success'){
            alert('success')
           }
        })
        console.log(paymentId)
    }

    function handlesubmit (){
        const options = {
            key:"rzp_test_y2qB89WOfmA87L",
            key_secret:"h4r4Aaz5CXZ022LIwylfdzZr",
            amount:fees*100,
            currency:"INR",
            name:'Motor Menders',
            description:'book your proffesional',
            handler:function(response){
                saveBooking(response.razorpay_payment_id)
                navigate('/successpage')
            },
            prefill:{
                name:'Motor Menders',
                email:'noorudheenajmal@gmail.com',
                contact:'8848813316'
            },
            notes:{
                address:'RazorPay'
            },
            theme:{
                color:'#3399cc',
                
                
            }
        };
        const pay = new Razorpay(options); // Use window.Razorpay
        pay.open();
    }

    return(
        <>
        </>
    )
}

export default RazorPay