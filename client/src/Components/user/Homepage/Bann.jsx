import React from 'react'
import { Link } from 'react-router-dom'

function Bann() {
  return (
    <>
    
    <div
            className='sm-h-[11rem] lg:mx-4 text-center lg:my-1 mt-4 md:mt-0  col-span-6 md:h-[16rem] sm:w-[18rem] md:w-[26rem] lg:h-[19rem] border-b-[5px] border-blue-600 xl:h-[19rem] bg-black rounded-b  rounded-md text-white '> 
       <div className='bg-gradient-to-br rounded-t-md from-blue-600  to-orange-400 h-full pb-3 md:pb-0 w-full shadow-md  flex flex-col items-center '>
          <div className='flex justify-between w-full '>
            <h1 className='m-2 font-semibold text-white'>Connect to</h1>
            <Link to={'/proffesional/signup'}>
              <div className='flex justify-center gap-[5%] items-center m-2'>
                <h1 className=' font-semibold text-md'>G</h1>
                <i class="fa-solid text-sm mt-[10%] text-black fa-circle-chevron-right"></i>
              </div>
            </Link>
          </div>
          <div className='flex  w-full ml-3 items-center gap-1'>
            <h1 className='text-xl text-black md:text-3xl font-bold'>
              WorkShop
            </h1>
            <img src="/hammer.png" className='h-[3rem] w-[4rem] mt-1' alt="" />
          </div>
          <p className='text-xs sm:text-sm  font-Shrikand font-semibold text-slate-800  mt-[4%]'>Connect and Book to Your Nearest Work-Shop.Don't
            Loose Your Time Searching For a the Services.</p>
          <div className='ml-3 space-y-3 flex flex-col w-full mt-[8%]'>
            <div className='flex text-xs items-center w-fit h-5'>
              <img src="/cardImage1.png" className='' alt="" />
              <h1 className='ml-1 text-slate-900 font-medium'>Find Your Nearest Work-Shop.</h1>
            </div>
            <div className='flex text-xs items-center ml-1 w-fit h-5'>
              <img src="/cardimage2.png" alt="" />
              <h1 className='ml-3 text-slate-900 font-medium'>Filter Best Service Providers.</h1>
            </div>
            <div className='flex text-xs items-center  w-fit h-5'>
              <img src="/cardimage.png" alt="" />
              <h1 className='ml-1 text-slate-900 font-semibold w-fit md:font-medium'>Give Your Feedback and Rating.</h1>
            </div>
          </div>
        </div>
      </div>
      <div
            className='sm-h-[11rem] lg:mx-4 text-center lg:my-1 mt-4 md:mt-0  col-span-6 md:h-[16rem] sm:w-[18rem] md:w-[26rem] lg:h-[19rem] border-b-[5px] border-blue-600 xl:h-[19rem] bg-black rounded-md text-white '>
        <div className='bg-gradient-to-br from-blue-600 rounded-t-md to-orange-400 h-full pb-3 md:pb-0 w-full flex flex-col items-center '>
          <div className='flex justify-between w-full '>
            <h1 className='m-2 font-semibold text-white'>Register Your</h1>
            <Link to={'/proffesional/login'}>
              <div className='flex justify-center gap-[5%] items-center m-2'>
                <h1 className=' font-semibold text-md'>G</h1>
                <i class="fa-solid text-sm mt-[10%] text-black fa-circle-chevron-right"></i>
              </div>
            </Link>
          </div>
          <div className='flex  w-full ml-3 items-center gap-1'>
            <h1 className='text:xl text-black md:text-3xl font-bold'>
              WorkShop
            </h1>
            <img src="hammer.png" className='h-[3rem] w-[4rem] ' alt="" />
          </div>
          <p className='text-xs sm:text-sm  font-Shrikand text-slate-800 font-semibold  mx-2  mt-[4%]'>Register Your Work-Shop .Find

            the vehicles and give your

            Services. It Helps to Widen your

            Business.  </p>
          <div className='ml-3 space-y-3 flex flex-col w-full mt-[8%]'>
            <div className='flex text-xs items-center w-fit h-5'>
              <img src="/cardImage1.png" className='' alt="" />
              <h1 className='ml-1 text-slate-900 font-medium '>Register Your Work-Shop.</h1>
            </div>
            <div className='flex text-xs items-center ml-1 w-fit h-5'>
              <img src="/cardimage2.png" alt="" />
              <h1 className='ml-3 text-slate-900 font-medium'>Provide Your Best Services.</h1>
            </div>
            <div className='flex text-xs items-center  w-fit h-5'>
              <img src="/cardimage.png" alt="" />
              <h1 className='ml-1 text-slate-900 font-medium'>Connect with people.</h1>
            </div>
          </div>
        </div>
      </div>
      <div
            className='sm-h-[11rem] lg:mx-4 text-center lg:my-1  mt-4 md:mt-0 col-span-6  md:h-[16rem] sm:w-[18rem] md:w-[26rem] lg:h-[19rem] border-b-[5px] border-blue-600 xl:h-[19rem] bg-black rounded-md  text-white '>
        <div className='bg-gradient-to-br from-blue-600 rounded-t-md  to-orange-400 pb-3 md:pb-0 h-full w-full   flex flex-col items-center '>
          <div className='flex justify-between w-full '>
            <div className='text-left'>
              <h1 className='ml-2 mt-2 font-semibold text-white'>Connect to</h1>
              <div className='flex h-[60%] w-full ml-3 items-center '>
                <h1 className='text-xl text-black md:text-3xl w-[60%] font-bold'>
                  Freelance Mechanic
                </h1>
                <img src="/hand.png" className='h-[4rem] w-[3rem]' alt="" />
              </div>
            </div>
            <Link to={'/proffesional/login'}>
              <div className='flex justify-center gap-[5%] items-center m-2'>
                <h1 className=' font-semibold text-md'>G</h1>
                <i class="fa-solid text-sm mt-[10%] text-black fa-circle-chevron-right"></i>
              </div>
            </Link>
          </div>

          <p className='text-xs sm:text-sm  font-Shrikand font-semibold text-slate-800  mt-[1%]'>Connect and Book directly to Nearest Mechanic.Don’t Loose Your Time Searching For  the Services.</p>
          <div className='ml-3 space-y-3 flex flex-col w-full mt-[8%]'>
            <div className='flex text-xs items-center w-fit h-5'>
              <img src="/cardImage1.png" className='' alt="" />
              <h1 className='ml-1 text-slate-900 font-thin  md:font-medium'>Find an Individual Mechanic to you.</h1>
            </div>
            <div className='flex text-xs items-center ml-1 w-fit h-5'>
              <img src="/cardimage2.png" alt="" />
              <h1 className='ml-1 text-xs md:ml-3 text-slate-900  font-thin  md:font-medium'>Filter the Best Ones According to Rating.</h1>
            </div>
            <div className='flex text-xs items-center  w-fit h-5'>
              <img src="/cardimage.png" alt="" />
              <h1 className='ml-1 text-slate-900  font-thin  md:font-medium'>Give Your Feedback and Rating.</h1>
            </div>
          </div>
        </div>
      </div>
      <div
      className='bg-gradient-to-br from-blue-600  to-orange-400 sm-h-[11rem] lg:mx-4 text-center lg:my-1 mt-4 md:mt-0 col-span-6  md:h-[16rem] sm:w-[18rem] md:w-[26rem] lg:h-[19rem] border-b-[5px] border-blue-600 xl:h-[19rem] bg-black rounded-md text-white '>
        <div className='pb-3 md:pb-0 h-full w-full flex  flex-col items-center '>
          <div className='flex justify-between w-full '>
            <div className='text-left'>
              <h1 className='ml-2 mt-2 font-semibold text-white'>Register as</h1>
              <div className='flex h-[60%] w-full ml-3 items-center '>
                <h1 className='text-xl text-black md:text-3xl w-[60%] font-bold'>
                  Freelance Mechanic
                </h1>
                <img src="/hand.png" className='h-[4rem] w-[4rem]' alt="" />
              </div>
            </div>
            <Link to={'/proffesional/signup'}>
              <div className='flex justify-center gap-[5%] items-center m-2'>
                <h1 className=' font-semibold text-md'>G</h1>
                <i class="fa-solid text-sm mt-[10%] text-black fa-circle-chevron-right"></i>
              </div>
            </Link>
          </div>

          <p className='text-xs sm:text-sm font-Shrikand font-semibold text-slate-800 mx-1 w-[80%] sm:w-fit first-letter: mt-[1%]'>Register as a Mechanic .Find the vehicles and give your Services. It Helps to Widen your Business.</p>
          <div className='ml-3 space-y-3 flex flex-col w-full md:mt-[8%]'>
            <div className='flex text-xs items-center w-fit h-5'>
              <img src="/cardImage1.png" className='' alt="" />
              <h1 className='ml-1 text-slate-900  font-thin  md:font-medium'>Sign in as a Mechanic.</h1>
            </div>
            <div className='flex text-xs items-center ml-1 w-fit h-5'>
              <img src="/cardimage2.png" alt="" />
              <h1 className='ml-2 text-slate-900  font-thin  md:font-medium'>Provide Your Best Services..</h1>
            </div>
            <div className='flex text-xs items-center  w-fit h-5'>
              <img src="/cardimage.png" alt="" />
              <h1 className='ml-1 text-slate-900  font-thin  md:font-medium'>Connect with people..</h1>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Bann