import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../Pages/Admin/Login'
import DashBoard from '../Pages/Admin/DashBoard'
import UserView from '../Pages/Admin/UserView'
import ListtypesPage from '../Pages/Admin/ListTypes'
import ProView from '../Pages/Admin/WorkShop'
import FreelancerView from '../Pages/Admin/FreelancerView'
import { useSelector } from 'react-redux'

function AdminRoutes() {
  const token = useSelector((store)=>store.Admin.Token)
  return (
    <>
    <Routes>
    <Route path='/login' element={token?<DashBoard/>:<Login/>}/>
    <Route path='/dashbord' element={token?<DashBoard/>:<Login/>}/>
    <Route path='/userlist' element={token?<UserView/>:<Login/>}/>
    <Route path='/workshop' element={token?<ProView/>:<Login/>}/>
    <Route path='/freelancer' element={token?<FreelancerView/>:<Login/>}/>
    <Route path='/listtypes' element={token?<ListtypesPage/>:<Login/>}/>
    </Routes>
    </>
  )
}

export default AdminRoutes