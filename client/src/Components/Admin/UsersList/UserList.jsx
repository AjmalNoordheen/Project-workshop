import React, { useEffect, useState } from 'react';
import createAxiosInstance from '../../../Axios/AdminAxios'

const UserList = ({ details, setCount, count, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const AdminAxios = createAxiosInstance()

  function blockUser(userid) {
      AdminAxios.post('/blockuser', { userid,type })
      .then((res) => {
        setCount(count + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }
   // Calculate the indexes for the current page
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = details ? details.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div className="  h-full max-w-screen flex justify-center bg-slate-300 px-4 py-8 sm:px-14">
      <div className={type=='user'?"overflow-y-hidden w-11/12 h-full  rounded ":"overflow-y-hidden w-11/12 h-screen rounded "}>
      {type=='user'? <p className='font-bold'>Users</p> : ""}
        <div className="overflow-x-auto ">
          <table className="w-full ">
            <thead>
              <tr className="bg-blue-700 text-left text-xs md:font-semibold uppercase tracking-widest text-white">
                <th className="px-5 md:px-5 py-3">Image</th>
                <th className="px-2 md:px-5 py-3">Name</th>
                <th className="px-2 md:px-5 py-3">E-mail</th>
               {type=='user'?<th className="px-2 md:px-5 py-3">Phone</th>:type=='pro'? <th className="px-2 md:px-5 py-3">Type</th>:''} 
                <th className="px-2 md:px-5 py-3">Status</th>
                <th className="px-2 md:px-5 py-3">Block</th>
                <th className="px-2 md:px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => {
                  return (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="px-6 py-3">
                        {/* Add the image element to display the profile image */}
                        <img
                          src={item.image?item.image:'/profileimage.png'}
                          alt="Profile"
                          className="h-14 w-14 "
                        />
                      </td>
                      <td className="px-2 md:px-6 py-3 text-xs md:text-base font-semibold">{item.name}</td>
                      <td className="px-2 md:px-6 py-3 text-xs md:text-base font-semibold">{item.email}</td>
                      <td className="px-2 md:px-6 py-3 text-xs md:text-base font-semibold">{type==='user'?item.phone:type==='pro'?
                      item.types.map(item=>item.name).join('/'):''} 
                      </td>
                      <td className="px-2 md:px-6 py-3 text-sm md:text-base font-semibold">
                        <span
                          className={
                            item.status !== 'Blocked' ? 'text-green-500' : 'text-red-500'
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-2 md:px-6 py-3  md:text-base font-semibold">
                        <button
                          onClick={() => {
                            blockUser(item._id);
                            
                          }}
                          className={`h-7 w-7 md:h-10 md:w-10 rounded-full ${
                            item.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                          } hover:bg-red-600 transition duration-150`}
                        >
                          <i className={`fa ${item.isBlocked ? 'fa-unlock' : 'fa-lock'}`}></i>
                        </button>
                      </td>
                      <td className="px-6 py-3">
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
                  <td colSpan="7" className="px-6  text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white sm:px-5 sm:py-2 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
          Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {details ? details.length : 0} Entries
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 h-10 w-10 md:h-12 md:w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= (details ? details.length : 0)}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
