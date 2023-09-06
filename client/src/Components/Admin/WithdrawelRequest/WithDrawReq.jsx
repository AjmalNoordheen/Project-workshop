import React, { useEffect, useState } from "react";
import adminInstance from "../../../Axios/AdminAxios";
import { toast } from "react-toastify";

function WithDrawReq() {
    const [withDrawReq, setWithDrawReq] = useState([]);
    const [refresh,setRefresh] = useState(1)
    
    const adminAxios = adminInstance();
    let type 

    
  useEffect(() => {
    adminAxios
      .get("/getWithdrawelRequest")
      .then((res) => {
        if (res.data.status == "success") {
          setWithDrawReq(res.data.data);
        } else if (res.data.status == "failed")  {
          toast.error("cant load the data or no data available");                    
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[refresh]);
  
  const handleWithDraw = async(withdrawel,holderId,type)=>{
    try {
    const res = await  adminAxios.patch('/updateWithdrawel',{withdrawel,holderId,type})
    if(res.data.message == 'success' ){
      setRefresh(refresh+1)
        toast.success('Succesfully accepted the Requested')   
    }else{
      toast.error('something went wrong')
    }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-screen  mt-3 flex items-center justify-center">
        <div className="w-10/12 bg-slate-300 flex-col ml-3  mr-3">
          <div className="relative overflow-x-auto sm:rounded-lg ">
            <div className="flex items-center justify-between py-2 sm:rounded-lg bg-slate-300 ">
              <div className="text-black ml-3 font-bold text-lg tracking-wide ">
                Withdraw Request
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase sm:rounded-lg  bg-blue-700 ">
                <tr>
                  {/* <th scope="col" className="pl-9">
                    No
                  </th> */}
                  <th scope="col" className="pl-9">
                    IMAGE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ifsc
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                  A/C Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {withDrawReq.length > 0
                  ? withDrawReq.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-gray-100 border-b text-slate-600 font-bold hover:bg-gray-50 dark:hover:bg-gray-200"
                      >
                        <td className="px-6 w-[10%] h-[10%] py-4">
                          <img
                            className="object-cover w-[90%] h-auto"
                            src={
                              item
                                ? item.userId
                                  ? item.userId.image
                                  : item.professional
                                  ? item.professional.image
                                  : "profileimage.png"
                                : ""
                            }
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4">
                          {item
                            ? item.userId
                              ? item.userId.name
                              : item.professional
                              ? item.professional.name
                              : "name"
                            : ""}
                        </td>
                        <td className="px-6 py-4">
                          {item
                            ? item.accDetails
                              ? item.accDetails.amount
                              : "number"
                            : ""}
                        </td>
                        <td className="px-6 py-4">
                          {item
                            ? item.accDetails
                              ? item.accDetails.ifsc
                              : "number"
                            : ""}
                        </td>
                        <td className="px-6 py-4">
                          {item
                            ? item.userId
                              ? item.userId.email
                              : item.professional
                              ? item.professional.email
                              : "email"
                            : ""}
                        </td>
                        <td className="px-6 py-4">
                          {item
                            ? item.accDetails
                              ? item.accDetails.accNo
                              : "number"
                            : ""}
                        </td>
                        {/* isBanned */}
                        <td className="space-x-3 py-4">
                          <button onClick={()=>{handleWithDraw(item._id,item.userId?item.userId._id:item.professional._id,type=item.userId?'user':'professional')}} className=" bg-green-600 w-15 text-white p-2  rounded-md w-[4rem]">
                            Accept
                          </button>
                          <button className=" bg-red-800 w-15 text-white p-2  rounded-md w-[4rem]">
                            Reject
                          </button>
                          ̥
                        </td>
                      </tr>
                    ))
                  : <tr className="text-red-800">No Requests Found</tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithDrawReq;
