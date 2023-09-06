import React, { useEffect, useState } from 'react';
import createAxiosInstance from '../../../Axios/AdminAxios'

const UserList = ({ details, setCount, count, type }) => {
 const AdminAxios = createAxiosInstance()
  function blockUser(userid) {
      AdminAxios.post('/blockuser', { userid,type })
      .then((res) => {
        console.log(res.status);
        setCount(count + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="mx-auto max-w-screen flex justify-center bg-slate-300 px-4 py-8 sm:px-8">
      <div className="overflow-y-hidden w-11/12 rounded border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Full Name</th>
                <th className="px-5 py-3">E-mail</th>
               {type=='user'?<th className="px-5 py-3">Phone</th>:type=='pro'? <th className="px-5 py-3">Type</th>:''} 
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Block</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {details?details.length > 0 ? (
                details.map((item, index) => {
                  return (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="px-6 ">
                        {/* Add the image element to display the profile image */}
                        <img
                          src={item.image?item.image:'/profileimage.png'}
                          alt="Profile"
                          className="h-12 w-12 rounded-full"
                        />
                      </td>
                      <td className="p-6">{item.name}</td>
                      <td className="p-6">{item.email}</td>
                      <td className="p-6">{type==='user'?item.phone:type==='pro'?
                      item.types.map(item=>item.name).join('/'):''} 
                      </td>
                      <td className="p-6">
                        <span
                          className={
                            item.status === 'active' ? 'text-green-500' : 'text-red-500'
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => {
                            blockUser(item._id);
                            
                          }}
                          className={`h-10 w-10 rounded-full ${
                            item.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                          } hover:bg-red-600 transition duration-150`}
                        >
                          <i className={`fa ${item.isBlocked ? 'fa-unlock' : 'fa-lock'}`}></i>
                        </button>
                      </td>
                      <td className="p-6">
                        <button className='h-10 w-10 rounded-full hover:bg-blue-800 hover:text-white border  border-blue-700 border-spacing-1 text-sm
                            text-gray-600 transition duration-150
                            hover:bg-blue-800"'>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    No users found.
                  </td>
                </tr>
              ):''}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-2 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            {/* Showing 1 to {details.length} of {count} Entries */}
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Prev
            </button>
            <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
