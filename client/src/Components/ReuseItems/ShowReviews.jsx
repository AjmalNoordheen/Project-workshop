import React, { useState } from "react";

const ShowReviews = (review) => {
    const data=review.review.reviews
  
    return (
    data?data.map((doc)=>{
        return(
    
            <div key={data?data._id:''}  className="flex gap-4 h-[35%] bg-slate-100 border-b border-b-slate-300">
          <div className="w-[6%] object-cover ml-[1%] mt-[1%]">
              <img src={doc?doc.user?doc.user.image?doc.user.image:"/profileimage.png":"/profileimage.png":"/profileimage.png"} className="h-fit object-cover w-fit rounded-full" alt="" />
          </div>
              <div className=" mt-1 w-full"> 
               <div className="flex w-full">
               <p className="text-xs w-11/12 font-semibold text-slate-500">{doc?doc.user.name:''}</p>
               <p className="text-xs w-11/12 font-semibold text-slate-500 text-end mr-1">{doc.createdAt.split("T")[0]}</p>
               </div>
                <p className="text-xs w-11/12 font-semibold text-slate-500">{doc?doc.user.email:''}</p>
                <div className="cursor-pointer text-xs mt-2 md:mt-0 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 cursor-pointer ${
                      star <=doc.rating? "text-yellow-400 " : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" 
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
                <p className="text-base mt-2 font-semibold text-slate-800">{doc.description}</p>
              </div>
          </div>
    
        )
    }):<p>no review added</p>
       
    );
};



 
export default ShowReviews;