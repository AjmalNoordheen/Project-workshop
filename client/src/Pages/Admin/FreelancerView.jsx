import React, { useEffect, useState } from 'react'
import UserList from '../../Components/Admin/UsersList/UserList';
import NavBar from '../../Components/Admin/NavBar/Navbar'
import createAxiosInstance from '../../Axios/AdminAxios'

function FreelancerView() {
    const [details, setDetails] = useState([]);
    const [count, setCount] = useState(0);
    const AdminAxios = createAxiosInstance()

    useEffect(() => {
      let subcribed = true
      if(subcribed){
     AdminAxios
        .get('/getProfessionals')
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data.Freelancer);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
      return (()=>{
        subcribed = false
      })
    }, [count]);
  
    return (
      <>
      <NavBar/>
      <UserList details={details} setCount={setCount} count={count} type='pro'/>
      </>
    )
  }
  

export default FreelancerView