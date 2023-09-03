import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosIns from '../../../Axios/proAxios'
import axiosInst from '../../../Axios/userAxios'
import { toast } from 'react-toastify';
function EditModal({fun}) {
  const [file, setFile] = useState("");
  const [proData,setProData]=useState("");
  const proemail = useSelector((store)=>store.Proffessional.email)
  const nameRef = useRef(null)
  const feeRef = useRef(null)
  const addressRef = useRef(null)
  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const proAxois = axiosIns()
  const userAxios = axiosInst()

  useEffect(()=>{
    userAxios.get(`/proSingleDetails?type=${'pro'}&proEmail=${proemail}`).then((res)=>{
        if(res.data.status=='success'){
          setProData(res.data.data)
        }
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const updateEditPro = async(e)=>{
    e.preventDefault()
    try {
      let time 
      const id = proData._id
       const starTime = startTimeRef.current.value;
       const endTime = endTimeRef.current.value;
       const name = nameRef.current.value;
       const fees = feeRef.current.value;
       const address = addressRef.current.value   

       if((startTimeRef.current.value === '' || endTimeRef.current.value === '') &&  nameRef.current.value==proData.name && feeRef.current.value ==proData.fees
       &&  addressRef.current.value===proData.address && file===''){
        toast.error('no changes applied')
        return
       }

       if( startTimeRef.current.value === '' || endTimeRef.current.value === ''){
         time = proData.workingTime
        }else{
          time = starTime + " am -" + " to - "  + endTime + " pm "
      }

     const res = await proAxois.patch('/updateEditPro',{time,name,fees,address,file,id},
      { headers: { "Content-Type": "multipart/form-data" } })
      if(res.data=='success'){
        toast.success(res.data)
        fun('hide')
      }else{
        console.log(error);
        toast.error(res.data)
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (

   <>
   <div className="flex flex-col backdrop-blur-md absolute right-[-6%] sm:right-[-4%] md:right-[-9%] md:top-[5%] lg:right-[-1%] md:flex-row items-center gap-6 md:justify-center">
            <div className="pb-5 font- md:pb-0 md:mb-10 grid gap-2 md:ml-4">
              <div className="bg-blue-200 shadow-sm p-4 rounded-lg ">
               <form action="" >
               
                   <img src={
                    
                file instanceof File
                  ? URL.createObjectURL(file)
                  :proData.image?proData.image: "/profileimage.png"} className='w-[4rem] object-cover rounded-full h-[4rem]' alt="" />
               
               <input type="file" name="file" accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                 className='text-xs cursor-pointer' />
               <div className="flex justify-between mt-2">
                  <span className="font-bold">Name:</span>
                 <input ref={nameRef} className='w-[7rem]' defaultValue={proData.name} type="text" />
                </div>
               <div className="flex justify-between mt-2">
                  <span className="font-bold">Service Fee:</span>
                 <input ref={feeRef} className='w-[7rem]' defaultValue={proData.fees} type="number" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-bold">Address:</span>
                  <input ref={addressRef} defaultValue={proData.address} className='w-[7rem] h-10   text-xs' type="text" />
                </div>
               
                <div className="flex justify-between mt-2">
                  <span className="font-bold">Working Hours:</span>
                </div>
                <div className='mt-1 flex gap-1'>
                    <label htmlFor="">from:</label>
                    <input ref={startTimeRef} type="time" />
                    <label htmlFor="">to:</label>
                    <input ref={endTimeRef} type="time"/>
                </div>
                <div className='w-full flex justify-center mt-2'>
                <button  onClick={updateEditPro} type='submit' className=' bg-purple-700 hover:bg-black mt-2 text-white rounded py-1  px-2'>Submit</button>
                </div>
             </form>
              </div>
            </div>
          </div>
   </>
)}

export default EditModal