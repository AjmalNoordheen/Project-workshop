import React, { useEffect, useRef, useState } from "react";
import proAxoisInstance from "../../../Axios/proAxios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ProGallery() {
  const proAxios = proAxoisInstance();
  const proData = useSelector((state) => state.Proffessional.proData);
  const [content, setContent] = useState(null);
  const [file, setFile] = useState("");
  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState("");
  const img = useRef();

  useEffect(() => {
    setLoading(true);

    try {
      const getGallery = async () => {
        const response = await proAxios.post("getGallery", { proId:proData._id });
        if (response) {
          setGallery(response?.data?.gallery);
          setLoading(false);
        }
      };
      getGallery();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }, [state]);

  const changeimg = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;
    if (!allowedExtensions.test(file.name)) {
      toast.error("Invalid file format");
      return;
    }
    setFile(file);
  };

  const uploadGallery = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!file) {
      setLoading(false)
      toast.error("Please provide an image file.");
      return;
    }
    try {
      const response = await proAxios.post(
        "/proGalleryAdd",
        {file: file, proId:  proData._id },
        { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.status === true) {
        setGallery(response.data.gallery); 
        toast.success("Saved Successfully");
        setLoading(false)
        setState(state+1)
        setFile('')
        
      }else{
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const removeGallery = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "REMOVE",
      });
      
      if (confirmed.isConfirmed) {
        // User confirmed, send a request to delete the image
        const result = await proAxios.post("/removeGallery", { proId: proData._id, id });
  
        if (result.data.status) {
          // Image successfully removed
          Swal.fire("Successfully removed");
          setGallery(result.data.gallery);
          setState(state+1);
        } else {
          Swal.fire("Failed to remove");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <form
        onSubmit={uploadGallery}
        className="bg-gray-300 m-2 p-2 bg-opacity-60  grid grid-cols-1 md:grid-cols-3 sm:gap-4"
      >
        <div className="mx-auto w-full  col-span-1">
          <div className="col-span-1  md:col-span-1/3">
            {/* image - start */}
            <a
              onChange={changeimg}
              className="group  flex h-48 items-end overflow-hidden rounded-lg bg-white shadow-lg md:h-72 object-contain"
            >
           <div className="w-full h-full flex items-center justify-center">
           <img
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQ8ld9CFGwZyOnXEchyjggPCU4G6gDWbRL4A-ELNf3t4YD3jQAeDZb0InTyUmm7E00H4&usqp=CAU"
                }
                loading="lazy"
                onClick={() => img.current.click()}
                alt="Photo by Minh Pham"
                className=" inset-0 h-[60%] w-fit object-cover  object-center transition duration-200 group-hover:scale-110"
              />
           </div>
              <input type="file" name="file" hidden ref={img} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray- via-transparent to-transparent opacity-50"></div>
            </a>
          </div>
          <div className="mt-2 ">
            <button type="submit" className="w-full h-12 bg-white text-black hover:bg-black hover:text-white font-bold rounded-md md:w-[99%]">
             {loading?<i class="fa-solid fa-gear text-xl animate-spin"></i>:"SAVE"} 
            </button>
          </div>
        </div>
        <div className="col-span-2 mt-4 sm:mt-0 justify-items-center  bg-white grid md:gap-2 grid-cols-12 rounded-lg gallery overflow-scroll h-[360px]">
          {loading ? (
            <div className="flex justify-center col-span-12  mt-40 h-80">
           <span class="loader"></span>
            </div>
          ) : gallery.length ? (
            gallery?.map((data) => (
              <div
                key={data._id}
                className=" bg-opacity-60 border-2 col-span-4 md:col-span-3 w-fit h-fit justify-center m-1 flex flex-col items-center md:w-fit  p-1 md:gap-1 rounded-lg "
              >
                <img
                  src={data?.image} // Use the actual image URL from the data
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="sm:w-32 object-contain sm:h-24 w-16 h-16"
                />
              
                <button
                  key={data?._id}
                  onClick={() => removeGallery(data._id)}
                type="button"
                  className="w-1/2  bg-slate-700 rounded-full  text-red-600 hover:text-green-500"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="flex justify-center md:col-span-12 w-full  mt-36 h-screen">
              <p className="text-xl text-black font-bold">EMPTY GALLERY</p>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default ProGallery;


