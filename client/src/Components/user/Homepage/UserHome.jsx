import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import createAxiosInstance from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { Link, useNavigate } from 'react-router-dom'
import Reviews from './Reviews'
import {Carousel} from 'react-responsive-carousel'
import Bann from './bann'

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


<div className=' overflow-hidden  gap-5 h-fit bg-zinc-700 w-full grid  grid-cols-12'>
    <div className='h-[19.5rem]  bg-zinc-700 md:w-full col-span-5 bg-contain bg-no-repeat md:bg-cover bg-center' style={{backgroundImage: "url('/4ever.png')"}}></div>
    <div className='h-[19.5rem] flex flex-col col-span-6'>
  <h1  className='text-white  pb-4 md:pb-0 sm-lg text-sm md:text-sm  md:text-center pt-4 md:pt-8'>Convenient and Coefficient Services</h1>
  <p className='text-black lg:mt-10 text-xs md:text-sm md:text-center pb-4 md:pt-0 md:pb-8 ms:text-end'>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
    Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
    Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
  </p>
</div>
    </div>

<h1 className='text-white ml-3 mt-2'></h1>
<section class="text-neutral-700 dark:text-neutral-300">
  <div class="mx-auto text-center md:max-w-xl lg:max-w-3xl">
    <h3 class="mb-6 text-3xl font-bold">FEEDBACKs</h3>
    <p class="mb-6 pb-2 md:mb-12 md:pb-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
      error amet numquam iure provident voluptate esse quasi, veritatis
      totam voluptas nostrum quisquam eum porro a pariatur veniam.
    </p>
  </div>
  {/* Reviews */}
  <div class="grid h-fit gap-6 pb-20 text-center sm:grid-cols-12 grid-cols-6  ">
  <Reviews/>
  <Reviews/>
  <Reviews/> 
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