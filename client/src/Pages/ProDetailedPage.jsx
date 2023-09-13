import React from 'react'
import NavBar from '../Components/user/Navbar/Navbar'
import ProDetailPage from '../Components/user/ProfessionalDetails/ProDetailPage'
import Footer from '../Components/user/Footer/Footer'
import { useLocation } from 'react-router-dom'

function ProDetailedPage() {
  const location = useLocation()
  const {Proemail,proId} = location.state
  return (
   <>
  <div className='w-full bg-[#793be4]'>
  <NavBar/>
  </div>
   <ProDetailPage email={Proemail} id={proId}/>
   <Footer/>
   </>
  )
}

export default ProDetailedPage