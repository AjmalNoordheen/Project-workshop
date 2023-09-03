import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAxios } from '../../../Axios/userAxios'
import { ClientLogout } from '../../../Redux/userState'
import { useNavigate } from 'react-router-dom'
import userAxiosInstance from '../../../Axios/userAxios'

function UserHome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  userAxios=userAxiosInstance()

  useEffect(() => {
  if(token){
    userAxios.get('/getDetails',
    ).then((res)=>{
      if(res.data.status === false ){
        dispatch(ClientLogout())
        navigate('/')
      }
    }).catch(()=>{
      console.log(error);
    })
  }

  },)
  
  return (
    <>
  <hr />
<div className='w-full h-[2440px] bg-black'>
  <div
    className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-cover"
    style={{ backgroundImage: "url('/banner.jpg')" }}
  >
  </div>
  {/* <p className='text-white bg-zinc-900 '>Services</p> */}
  {/* <div class='w-full md:h-[20.5rem] lg:h-[24rem] bg-zinc-900 grid  grid-cols-12  gap-4 sm:gap-6 lg:gap-4 pt-6 pl-5 pr-5 pb-5 sm:pb-0 '>
  <div class='h-[15rem] md:h-[17rem]  lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black col-span-6 md:col-span-3 rounded-b text-white'>jhbjbjhbsd</div>
  <div class='h-[15rem] md:h-[17rem] lg:h-[19rem] text-white border-b-[5px] border-sky-700 xl:h-[21rem] bg-black col-span-6 md:col-span-3 rounded-b'>
    hi
  </div>
  <div class='h-[15rem] md:h-[17rem] lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black  col-span-6 md:col-span-3 rounded-b'>
    <p className='text-white'>hfajhjkahlkjhlk jdhsjh</p>
  </div>
  <div class='h-[15rem] md:h-[17rem] lg:h-[19rem] text-white border-b-[5px] border-sky-700  xl:h-[21rem] bg-black col-span-6 md:col-span-3 rounded-b'>
    hi
  </div>

    
</div> */}

<div class='w-full md:h-[20.5rem] flex items-center justify-evenly lg:h-[25rem]  gap-6 bg-zinc-900  pl-5 pr-5 pb-5 sm:pb-0'>
  <div className='h-[15rem] md:h-[17rem] w-[18rem] lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black rounded-b text-white '></div>
  <div className='h-[15rem] md:h-[17rem] w-[18rem] lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black rounded-b text-white'></div>
  <div className='h-[15rem] md:h-[17rem] w-[18rem] lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black rounded-b text-white'></div>
  <div className='h-[15rem] md:h-[17rem] w-[18rem] lg:h-[19rem] border-b-[5px] border-sky-700 xl:h-[21rem] bg-black rounded-b text-white'></div>
</div>



<div className='h-[19.5rem] bg-zinc-700 w-full grid  grid-cols-12'>
    <div className='h-[19.5rem]  bg-zinc-700 md:w-full col-span-5  bg-cover bg-center' style={{backgroundImage: "url('/4ever.png')"}}></div>
    <div className='h-[19.5rem] flex flex-col col-span-6'>
  <h1  className='text-white pb-4 md:pb-0 pt-4 md:pt-8'>Convenient and Coefficient Services</h1>
  <p className='text-black  md:text-center pb-4 md:pt-0  md:pb-8 ms:text-end'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod porro perspiciatis aspernatur dicta voluptatibus iusto?
    Minima nulla ad eius nemo laboriosam recusandae cum quas et ipsam, quisquam saepe sed sapiente.
  </p>
</div>


    </div>


</div>


    </>
  )
}

export default UserHome