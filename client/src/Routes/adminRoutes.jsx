import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../Pages/Admin/Login'
import DashBoard from '../Pages/Admin/DashBoard'
import UserView from '../Pages/Admin/UserView'
import ListtypesPage from '../Pages/Admin/ListTypes'
import ProView from '../Pages/Admin/WorkShop'
import FreelancerView from '../Pages/Admin/FreelancerView'
import { useSelector } from 'react-redux'
import WithdrawRequest from '../Pages/Admin/WithdrawRequest'

function AdminRoutes() {
  const token = useSelector((store)=>store.Admin.Token)
  return (
    <>
    <Routes>
    <Route path='/login' element={token?<Navigate to={'/admin/dashbord'}/>:<Login/>}/>
    <Route path='/dashbord' element={token?<DashBoard/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/userlist' element={token?<UserView/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/workshop' element={token?<ProView/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/freelancer' element={token?<FreelancerView/>:<Navigate to={'/admin/login'}/>}/>
    <Route path='/listtypes' element={token?<ListtypesPage/>:<Navigate to={'/admin/login'}/>}/>
    <Route path="/withdrawreq" element={<WithdrawRequest/>} />

    </Routes>
    </>
  )
}

export default AdminRoutes