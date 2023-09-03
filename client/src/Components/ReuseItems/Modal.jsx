import ReactModal from "react-modal";
import interceptor from '../../Axios/userAxios'
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteAccountModal = ({fun, isOpen, closeModal,id}) => {
  const [loader,setLoader] = useState(false)
    const userAxios = interceptor()
    const cancelBooking = async()=>{
        try {
          setLoader(true)
          const res = await userAxios.patch(`/cancelBooking?id=${id}`)
          console.log(res.data);
          if(res.data.message=='success'){ 
            toast.success('succesfully Cancelled  the booking')
              closeModal()
                fun(true)
                setLoader(false)
            }else{
              console.log('hmmmm');
            }
          
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className=" ">
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className=" absolute top-1/2 left-1/2 translate-x-[-50%] border translate-y-[-50%]"
      // overlayClassName="overlay"
      
    >
      <div className="bg-white shadow-xl rounded-lg relative top-1/2 max-w-md  m-auto p-4">
      <i class="fa-solid fa-circle-exclamation"></i>
        <div className="flex items-center">
          {/* <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto"> */}
          {/* </div> */}
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">Cancel Your Booking</p>
            <p className="text-sm text-gray-700 mt-1">
              Your Advanced Payment Will not be Refunded . Do you Really want to continue ?
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          {loader?( <button
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
           
          >
           <i class="fa-solid fa-circle-notch animate-spin text-red-800"></i>
          </button>): <button
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            onClick={cancelBooking}
          >
           Confirm
          </button>}
         
          <button
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
    </div>
  );
};

export default DeleteAccountModal;
