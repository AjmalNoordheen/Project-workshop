// import React, { useEffect, useState } from 'react'
// import NavBar from '../../Components/Admin/NavBar/Navbar'
// import UserList from '../../Components/Admin/UsersList/UserList'
// import createAxiosInstance from '../../Axios/AdminAxios'
// import { AdminLogout } from '../../Redux/AdminState';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// function UserView() {
//   const [details, setDetails] = useState([]);
//   const [count, setCount] = useState(0);
//   const AdminAxios = createAxiosInstance()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   useEffect(() => {
//     AdminAxios
//       .get('/getuser')
//       .then((res) => {
//         console.log(res);
//         if(res.data.status==false){
//           setTimeout(() => {
//             dispatch(AdminLogout(''))
//             navigate('/admin/login')
//           }, 300);
//           return
//         }
//         if (res.status === 200) {
//           setDetails(res.data.userList);
//           console.log(details);
//         }else{
//           console.log('kookokokoko');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [count]);
//   return (
//     <>
//     <NavBar/>
//     <UserList details={details} setCount={setCount} count={count} type='user'/>
//     </>
//   )
// }

// export default UserView