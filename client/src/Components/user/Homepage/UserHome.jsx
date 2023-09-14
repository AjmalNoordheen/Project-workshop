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
<div className='w-full h-fit bg-white'>
  <div
    className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] flex flex-col justify-end backdrop-blur-sm xl:h-[550px] bg-cover"
    style={{ backgroundImage: "url('/two-car-mechanic-technician-rk0rdiryvybk5hca.jpg')" }}
  >
   <div className='backdrop-blur-md w-1/3 mb-[10%]'>
   <h1 className="text-2xl sm:text-3xl m-3 md:text-4xl font-bold backd text-white md:text-black">
      "Your Trusted Mechanic <br /> Booking Platform"
    </h1>
    <p className="text-base  sm:text-lg md:text-xl text-red-700">Get Your Vehicle Back on the Road with Ease</p>
   </div>
  </div>
  {/* <div className=" bottom-[2rem] left-0 right-0 text-center">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white md:text-black">
      "Your Trusted Mechanic <br /> Booking Platform"
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-red-700">Get Your Vehicle Back on the Road with Ease</p>
  </div> */}
  {/* <p className='text-white bg-zinc-900 '>Services</p> */}
{/* <Carousel /> */}
<div className='w-full  bg-zinc-100 flex items-center justify-center'>
<div  class='sm:w-full lg:w-[95%]    grid grid-cols-12 gap-x-1 md:gap-x-0  md:flex md:items-center sm:place-items-center sm:justify-evenly   gap-y-1 md:gap-6 bg-zinc-100 pl-2 sm:pl-5 pr-3 sm:pr-5 py-5'>
  <Bann/>     
</div>
</div>
{/* <Carousel/> */}

<div className='overflow-hidden gap-5 bg-white w-full grid grid-cols-12'>
    <div className='h-[19.5rem] bg-white md:w-full col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url('/4ever.png')"}}></div>
    <div className='h-[19.5rem] flex flex-col col-span-7 md:col-span-6'>
        <h1 className='text-white sm:pb-4 md:pb-0 text-sm md:text-lg md:text-center sm:pt-4 md:pt-8'>Convenient and Coefficient Services</h1>
        <p className='text-black lg:mt-4 text-xs md:text-sm font-semibold  sm:pb-4 md:pb-8 text-center md:text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
        </p>
    </div>
</div>

<section class="text-neutral-700 dark:text-neutral-300 mt-2">
    <div className='bg-white w-full h-auto md:h-96 flex md:flex-row items-center justify-evenly'>
        <div className=' w-1/2 sm:ml-4'>
            {/* <p className='text-black text-xs md:text-sm font-semibold'>
                Welcome to AutoPro Connect, your go-to destination for all your vehicle maintenance needs! Our user-friendly website is designed to make the process of booking and registering with skilled mechanics hassle-free and efficient.
            </p> */}

            <p className='text-black text-xs md:text-base font-semibold'>🔧 Seamless Booking: Say goodbye to long waits and uncertain appointments. With AutoPro Connect, you can easily schedule your vehicle service or repair appointments with certified mechanics in just a few clicks. Our intuitive interface ensures a smooth booking experience.
            </p>

            <p className='text-black text-xs md:text-base font-semibold'>🚗 Comprehensive Services: Whether it's a routine checkup, major repairs, or even custom upgrades, our platform connects you with a wide network of experienced mechanics specializing in various vehicle makes and models.
            </p>
        </div>
        <img src="\home_subscription.png" alt="" className=" w-2/5 md:h-[45rem]" />
    </div>
    <div className='flex w-full h-fit justify-end'>
        <img src="/car.png" className='xl:w-32 sm:w-20 w-16' alt="" />
    </div>
</section>

</div>
    </>
  )
}

export default UserHome