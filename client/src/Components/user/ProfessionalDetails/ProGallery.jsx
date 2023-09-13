import React, { useEffect, useState } from 'react';
import AxiosInstsnce from '../../../Axios/proAxios'

function ProGallery({proId,fun}) {
    const proAxios = AxiosInstsnce()
    const [loading,setLoading] = useState('')
    const [gallery,setGallery] = useState([])

    useEffect(() => {
        setLoading(true);
        try {
          const getGallery = async () => {
            const response = await proAxios.post("getGallery", {proId});
            if (response) {
                console.log(response,'kokokokok')
              setGallery(response.data.gallery);
              setLoading(false); // Set loading to false after the API call completes
            }
          };
          getGallery();
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      }, []);
    

  return (
    <>
    <div className='bg-gray-200 min-h-screen overflow-scroll'>
        <button onClick={()=>fun(false)} className='flow-root mb-2 '><i class="fa-solid fa-backward text-xl hover:text-green-600 text-blue-700"></i></button>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-4 p-2">
    {gallery.map((item)=>{
        return( 
        <div className="grid border gap-4 ">
          <div className=''>
            <img className="h-40  w-full rounded-lg " src={item?item.image?item.image:"":""} alt="" />
          </div>
        </div>
      )
    })}
    </div>
    </div>
    </>
  );
}

export default ProGallery;
