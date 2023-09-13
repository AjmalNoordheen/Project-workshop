import React from 'react'
import AdminDash from '../../Components/Admin/Home.jsx/AdminDash'
import NavBar from '../../Components/Admin/NavBar/Navbar'

function DashBoard() {
  return (
<div className='bg-slate-300 min-h-screen'>
<NavBar/>
<AdminDash/>
</div>  )
}

export default DashBoard