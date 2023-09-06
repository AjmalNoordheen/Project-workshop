import React, { useRef } from 'react';
import userInstance from '../../../Axios/userAxios'
import proInstance from '../../../Axios/proAxios'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function WithdrawWallet({ setWithdraw,wallet }) {

  const location = useLocation()
  const type = location.pathname.includes('proffesional') ? 'professional' : 'user'
  const Axios = location.pathname.includes('proffesional') ? proInstance() : userInstance()
  const holder = type=='user'? useSelector((store)=>store.Client.userData) : useSelector((store)=>store.Proffessional.proData) 

  // Create refs for the input elements
  const amountInputRef = useRef(null);
  const holderNameInputRef = useRef(null);
  const accountNumberInputRef = useRef(null);
  const bankNameInputRef = useRef(null);
  const ifscCodeInputRef = useRef(null);
  const branchInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Access the current values of the input refs
      const amount = amountInputRef.current.value.trim();
      const holderName = holderNameInputRef.current.value.trim();
      const accountNumber = accountNumberInputRef.current.value.trim();
      const bankName = bankNameInputRef.current.value.trim();
      const ifscCode = ifscCodeInputRef.current.value.trim();
      const branch = branchInputRef.current.value.trim();
  
      if (
        amount === "" ||
        holderName === "" ||
        accountNumber === "" ||
        bankName === "" ||
        ifscCode === "" ||
        branch === ""
      ) {
        toast.error("Please fill in all fields");
        return;
      }
  
      if (isNaN(amount) || parseFloat(amount) <= 100) {
        toast.error("Amount must be a number greater than 100");
        return;
      }
  
      if (!/^[a-zA-Z\s]+$/.test(holderName)) {
        toast.error("Account holder name must contain only alphabets");
        return;
      }
  
      if (!/^\d{10,20}$/.test(accountNumber)) {
        toast.error("Account number must be a number with 10 to 20 digits");
        return;
      }
  
      if (!/^[a-zA-Z\s]+$/.test(bankName) || bankName.length < 3 || bankName.length > 40) {
        toast.error("Bank name must contain only alphabets and be 3 to 40 characters long");
        return;
      }
  
      if (!ifscCode || ifscCode.length < 8 || ifscCode.length > 20) {
        toast.error("IFSC code must be 8 to 20 characters long");
        return;
      }
  
      if (branch.length < 2 || branch.length > 50) {
        toast.error("Branch must be 2 to 50 characters long");
        return;
      }
  
      const withDrawel = {
        amount,
        holderName,
        accountNumber,
        bankName,
        ifscCode,
        branch,
        type,
        holderID: holder._id,
      };
  
      const res = await Axios.post('/withDrawelRequest', { withDrawel });
      if (res.data === 'success') {
        toast.success('Request successful');
        setWithdraw(false);
      } else {
        toast.error('Request unsuccessful');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {/* <div className='h-screen w-screen flex items-center justify-center bg-slate-200'> */}
        <div className='h-full flex flex-col pb-2 gap-2 rounded-xl items-center w-full text-center bg-white'>
          <p onClick={()=>setWithdraw(false)} className='cursor-pointer w-full pl-3 h-fit text-start'>Back</p>    
          <div className='flex flex-col'>
            <h1 className='text-black text-sm'>Account Balance</h1>
            <h1 className='text-black text-4xl font-bold'>₹{wallet}</h1>
          </div>
          <div className='w-[60%] h-[80%] mb-2  bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl bg-opacity-80'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col text-center mt-[4%] gap-y-4 items-center'>
                <input
                  ref={amountInputRef}
                  placeholder='₹ Enter Amount'
                  className='w-2/6 h-11 text-center rounded-md bg-white'
                  type='number'
                />
                <input
                  ref={holderNameInputRef}
                  placeholder=' Account Holder Name'
                  className='w-4/6 h-11 rounded-md text-center bg-white'
                  type='text'
                />
                <input
                  ref={accountNumberInputRef}
                  placeholder=' Account Number'
                  className='w-4/6 h-11 rounded-md text-center bg-white'
                  type='text'
                />
                <input
                  ref={bankNameInputRef}
                  placeholder=' Bank Name '
                  className='w-4/6 h-11 rounded-md text-center bg-white'
                  type='text'
                />
                <input
                  ref={ifscCodeInputRef}
                  placeholder='IFSC Code '
                  className='w-4/6 h-11 rounded-md text-center bg-white'
                  type='text'
                />
                <input
                  ref={branchInputRef}
                  placeholder='Branch '
                  className='w-4/6 h-11 rounded-md text-center bg-white'
                  type='text'
                />
                <button  className='w-2/6 h-10 mb-2 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-800 border' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default WithdrawWallet;
