import React from 'react'

function Footer() {
  return (
<>
    <div className='w-full grid border-t-2 grid-cols-12 gap-3 h-fit bg-zinc-900'>
    <div className='col-span-3  bg-zinc-900'>
      <img className='w-60' src="/footer/map.png" alt="" />
    </div>
    <div className='col-span-6 flex-col pt-3'>
      <h1 className='text-slate-300'>Connect us On</h1>
      <div className='flex gap-2'>
      <img className='w-fit h-fit' src="/footer/mail.png" alt="" />
      <img className='w-fit h-fit' src="/footer/facebook footer.png" alt="" />
      <img className='w-fit h-7' src="/footer/Whatsup-icon.png" alt="" />
      <img className='w-fit h-fit' src="/footer/twitter footer.png" alt="" />
      </div>
       <p className='text-xs text-slate-500 pt-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Minima, quibusdam corrupti sit optio repellat delectus tenetur, eveniet magnam numquam, 
        architecto doloremque incidunt officia alias magni
         praesentium necessitatibus nobis veniam? Saepe.
         iure quaerat, nemo autem maxime nihil excepturi quidem. Quas!
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vero autem 
         libero tenetur ipsam. Recusandae, alias? Quaerat doloremque nobis hic, magnam,
          omnis, reprehenderit error corporis 
         suscipit nihil pariatur repellat iste.
         </p>
    </div>
    <div className='col-span-3 flex-col text-center mt-16 text-slate-300'>
      <p className='text-slate-500  font-semibold'>News and Updates</p>
      <p className='text-slate-500  font-semibold'>Legal Statements</p>
      <p className='text-slate-500  font-semibold'>Careers</p>
      <p className='text-slate-500  font-semibold'>About Us</p>
    </div>
    </div>
</>
  )
}

export default Footer