import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAxiosInstance from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { Link, useNavigate } from 'react-router-dom'

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
<div className='overflow-hidden  h-auto sm:h-[300px] md:h-[350px] lg:h-[450px] flex flex-col md:flex-row justify-around items-center'>
    <div className=' sm:h-[22rem] ml-2 md:w-[45%] flex flex-col items-center justify-center '>
        <h1 className='text-black  text-sm md:text-xl md:text-center  font-bold  '>Convenient and Coefficient Services</h1>
        <p className='text-black  text-xs md:text-sm font-semibold   text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
        </p>
    </div>
    <div className='h-[22rem] w-full md:w-[52%]  bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url(homebanner.jpg)"}}></div>
</div>
  {/* <div
    className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] flex flex-col justify-end backdrop-blur-sm xl:h-[550px] bg-cover"
    style={{ backgroundImage: "url('/two-car-mechanic-technician-rk0rdiryvybk5hca.jpg')" }}
  >
   <div className='backdrop-blur-md w-1/3 mb-[10%]'>
   <h1 className="text-2xl sm:text-3xl m-3 md:text-4xl font-bold backd text-white md:text-black">
      "Your Trusted Mechanic <br /> Booking Platform"
    </h1>
    <p className="text-base  sm:text-lg md:text-xl text-red-700">Get Your Vehicle Back on the Road with Ease</p>
   </div>
  </div> */}
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
<div style={{backgroundImage:'url(https://img.freepik.com/free-vector/new-background-gradien-abstract_125964-1144.jpg?w=826&t=st=1694722814~exp=1694723414~hmac=0c01b859642e20a77f4f3a2db463e34fab316765252de6cd901f2fee229676a3)',backgroundSize:'cover'}} className='overflow-hidden gap-5 bg-white w-full grid grid-cols-12'>
    <div className='h-[20.5rem] ml-2 flex flex-col col-span-7 md:col-span-6'>
        <h1 className='text-black sm:pb-4 md:pb-0 text-sm md:text-xl md:text-center sm:pt-4 font-bold  md:pt-8'>Convenient and Coefficient Services</h1>
        <p className='text-black lg:mt-4 text-xs md:text-sm font-semibold  sm:pb-4 md:pb-8 text-center md:text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
        </p>
    </div>
    <div className='h-[20.5rem]  md:w-full col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url(car1.png)"}}></div>
</div>
<div style={{backgroundImage:'url(https://img.freepik.com/free-photo/blue-background-with-dark-blue-background-light-blue-background_1340-35644.jpg?t=st=1694723961~exp=1694727561~hmac=aa902f56071b131c100b1c624c5d1ea6daec82e9742f467bf17bd51cc76b2d04&w=740)',backgroundSize:'cover'}} className='overflow-hidden gap-5 bg-white w-full grid grid-cols-12'>
    <div className='h-[22rem]  md:w-full col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url('/4ever.png')"}}></div>
    <div className='h-[22rem] flex flex-col col-span-7 md:col-span-6'>
        <h1 className='text-black sm:pb-4 md:pb-0 text-sm md:text-xl md:text-center sm:pt-4 font-bold  md:pt-8'>Convenient and Coefficient Services</h1>
        <p className='text-black lg:mt-4 text-xs md:text-sm font-semibold  sm:pb-4 md:pb-8 text-center md:text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto? Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
        </p>
    </div>
</div>

<div className='bg-white w-full h-[18rem] flex justify-center  items-center'>
  <div className='bg-slate-100 w-full gap-1 rounded-md md:w-11/12 h-4/6 flex flex-col items-center justify-center'>
    <h1 className='font-bold'>How It Works</h1>
    <div className='flex items-center justify-evenly w-full'>
      <div className='flex flex-col items-center justify-center'>
        <img loading='lazy' src="/pic.png" className='h-[7rem] w-[7rem]  rounded-full  border border-black' alt="" />
        <p>Register</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img loading='lazy' src="/loc.png" className='h-[7rem] w-[7rem]   rounded-full  border border-black' alt="" />
        <p>Search location</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img loading='lazy' src="/mec.png" className='h-[7rem] w-[7rem]   rounded-full  border border-black' alt="" />
        <p>Select provider</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img loading='lazy' src="/book.png" className='h-[7rem] w-[7rem]   rounded-full  border border-black' alt="" />
        <p>Book Appointment</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <img loading='lazy' src="/ser.png" className='h-[7rem] w-[7rem]   rounded-full  border border-black' alt="" />
        <p>Avail the Service</p>
      </div>
    </div>
  </div>
</div>
<section class="text-neutral-700 dark:text-neutral-300 mt-2">
    <div className='flex w-full h-fit justify-end'>
        <img src="/car.png" className='xl:w-32 sm:w-20 w-16' alt="" />
    </div>
</section>

</div>
    </>
  )
}

export default UserHome