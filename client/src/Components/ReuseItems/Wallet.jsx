import React, { useEffect, useState } from "react";
import userAxiosInstance from "../../Axios/userAxios";
import proAxiosInstance from "../../Axios/proAxios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import WithdrawWallet from "../user/WithdrawWallet/WithdrawWallet";

function Wallet() {
  const [wallet, setWallet] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [withDrawel, setWithdrawel] = useState(false);

  const location = useLocation();
  const type = location.pathname.includes("proffesional")
    ? "professional"
    : "user";

  let BaseAxois = location.pathname.includes("proffesional")
    ? proAxiosInstance()
    : userAxiosInstance();

  const senderData = useSelector((store) =>
    type === "professional"
      ? store.Proffessional.proData
      : store.Client.userData
  );

  useEffect(() => {
    BaseAxois.get(
      `/walletdetails?senderData=${senderData._id}&type=${type}`
    ).then((res) => {
      if (res.data) {
        setWallet(res.data.wallet);
        setTransaction(res.data.transactions);
      }
    });
  }, []);

// const debitedData =async(req,res)=>{
//   try {
//     BaseAxios.get(`/debitedDatas?senderId=${senderData._id}&type=${type}`)
//   } catch (error) {
    
//   }
// }

  return (
    <>
      

      <div className="min-h-screen max-h-full pb-3 w-screen flex flex-col  gap-5 items-center  bg-slate-200">
      <div className="space-y-16 mt-5">
            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform ">
              <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" alt="Credit Card" />
              <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light text-xs">Name</p>
                    <p className="font-medium tracking-widest">{senderData.name}</p>
                  </div>
                  <img className="w-[5rem] h-[5rem]" src="/sim1.png" alt="Card Logo" />
                </div>
                <div className="mb-3">
                  <p className="font-light text-xs">Wallet Amount</p>
                  <p className="font-medium text-xl tracking-more-wider">₹ {wallet}</p>
                </div>
                <div className="pt- pr-6">
                  <div className="flex justify-between ">
                    <div>
                      <p className="font-light text-xs">{senderData.email}</p>
                      <p className="font-medium tracking-wider text-sm"></p>
                    </div>
                
                    <div className="">
                      <button onClick={() => setWithdrawel(true)} title="withdraw" className="font-light text-md  block">WithDraw
                      <br />  
                      <i  class="fa-solid text-xl fa-arrow-right-from-bracket"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div
          className={
            withDrawel
              ? "h-[90%]  relative rounded-xl   items-center  w-3/6 text-center bg-slate-300"
              : "h-[25rem]  relative rounded-xl  items-center  w-7/12 text-center bg-gradient-to-r from-blue-600 to-blue-500"
          }
        >
          {withDrawel ? (
            <WithdrawWallet wallet={wallet} setWithdraw={setWithdrawel} />
          ) : (
            <>
              <div className="w-full h-full flex flex-col items-center gap-2 border overflow-scroll  rounded-md bg-opacity-80">
                <div className="flex w-10/12 h-[12%] mt-2 items-end justify-between ">
                  <div className="flex gap-2">
                    <button className="bg-slate-300 px-5 py-1 hover:bg-slate-200  rounded-xl font-semibold">
                      Credited
                    </button>
                    {/* <button onClick={debitedData} className="bg-slate-300 px-5 py-1 rounded-xl hover:bg-slate-200 font-semibold">
                      Debited
                    </button> */}
                  </div>
                </div>
                {transaction.map((item) => (
                  <>
                    <div className="w-[85%] h-[15%] flex  border justify-evenly items-center rounded bg-white">
                      <img
                        src="/Ellipse20.png"
                        className="h-[70%] w-[8%]"
                        alt=""
                      />
                     <div className="bg-white  border-slate-500 text-red-600  flex-col rounded w-[5rem]">
                          <span className=" text-center text-2xl font-bold italic">
                            {new Date(item.date).getDate()}
                          </span>
                          <span className=" text-center text-xs font-bold text-blue-700">
                            {item
                              ? new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                      <div>
                        <small className="block font-Shrikand">
                          from :
                          <span className="font-bold text-md font-Shrikand"> {type == "professional"
                            ? item.userId.name
                            : type == "user"
                            ? item.professional.name
                            : ""}
                            </span>
                        </small>
                        <small className="font-bold text-xs  text-slate-400">Id : {item._id}</small>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">+{item.professional.fees}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
             
              
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Wallet;
