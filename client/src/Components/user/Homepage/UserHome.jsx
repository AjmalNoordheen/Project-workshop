import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAxiosInstance from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { Link, useNavigate } from 'react-router-dom'
import Reviews from './Reviews'
import {Carousel} from 'react-responsive-carousel'
import Bann from './Bann'

function UserHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userAxios = createAxiosInstance()
  const token = useSelector((state)=>state.Client.Token)
  useEffect(() => {
    console.log(token);
  if(token){
       userAxios.get(`/getDetails`
    ).then((res)=>{
      console.log(res.data);
      if(res.data.status === false ){
        dispatch(ClientLogout())
        navigate('/')
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  },[])
  
  return (
    <>
  <hr />
<div className='w-full h-fit bg-black'>
  <div
    className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-cover"
    style={{ backgroundImage: "url('/banner.jpg')" }}
  >
  </div>
  {/* <p className='text-white bg-zinc-900 '>Services</p> */}
{/* <Carousel /> */}
<div className='w-full  bg-zinc-900 flex items-center justify-center'>
<div  class='sm:w-full lg:w-[95%]    grid grid-cols-12 gap-x-1 md:gap-x-0  md:flex md:items-center sm:place-items-center sm:justify-evenly   gap-y-1 md:gap-6 bg-zinc-900 pl-2 sm:pl-5 pr-3 sm:pr-5 py-5'>
  <Bann/>
</div>
</div>
{/* <Carousel/> */}


<div className=' overflow-hidden  gap-5 h-fit bg-white w-full grid  grid-cols-12'>
    <div className='h-[19.5rem]  bg-white md:w-full col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url('/4ever.png')"}}></div>
    <div className='h-[19.5rem] flex flex-col col-span-6'>
  <h1  className='text-white  pb-4 md:pb-0 sm-lg text-sm md:text-sm  md:text-center pt-4 md:pt-8'>Convenient and Coefficient Services</h1>
  <p className='text-black lg:mt-10 text-xs md:text-sm md:text-center pb-4 md:pt-0 md:pb-8 ms:text-end'>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
    Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
    Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
  </p>
</div>
    </div>

<section class="text-neutral-700 dark:text-neutral-300">
 <div className='bg-white w-full h-96 flex items-center'>
<div className='' >
<p className='text-black '>
Welcome to AutoPro Connect, your go-to destination for all your vehicle maintenance needs! Our user-friendly website is designed to make the process of booking and registering with skilled mechanics hassle-free and efficient.</p>

<p className='text-black '>🔧 Seamless Booking: Say goodbye to long waits and uncertain appointments. With AutoPro Connect, you can easily schedule your vehicle service or repair appointments with certified mechanics in just a few clicks. Our intuitive interface ensures a smooth booking experience.
</p>
<p className='text-black '>🚗 Comprehensive Services: Whether it's a routine checkup, major repairs, or even custom upgrades, our platform connects you with a wide network of experienced mechanics specializing in various vehicle makes and models.
</p>
</div>
<img src="\home_subscription.png" alt="" />
 </div>
<div className='flex w-full h-fit justify-end'>
<img src="/car.png" className=' xl:w-32 sm:w-20 w-16'  alt="" />
</div>
</section>
</div>
    </>
  )
}

export default UserHome