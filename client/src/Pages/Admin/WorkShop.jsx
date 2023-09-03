import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Admin/NavBar/Navbar'
import UserList from '../../Components/Admin/UsersList/UserList'
import createAxiosInstance from '../../Axios/AdminAxios'


function ProView() {
  const [details, setDetails] = useState([]);
  const [count, setCount] = useState(0);
  const AdminAxios = createAxiosInstance()
  useEffect(() => {
    AdminAxios
      .get('/getMechanic')
      .then((res) => {
        console.log(count,'====================');
        if (res.status === 200) {
          setDetails(res.data.WorkShop);
          console.log(details);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  return (
    <>
    <NavBar/>
    <UserList details={details} setCount={setCount} count={count} type='pro'/>
    </>
  )
}

export default ProView