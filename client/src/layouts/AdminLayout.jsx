import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import Footer from "../components/Footer"
import Sidebar from "../components/SidebarAdmin"
import { useState } from "react"

const AdminLayout = () => {
  const [isSidebarOpen,setSidebarOpen]= useState(false)

  const toggleSidebar= ()=>{
    setSidebarOpen(!isSidebarOpen)
  }


  return (
    <div className="w-full min-h-screen grid grid-rows-[min-content_1fr_min-content]">
      <AdminNavbar/>
      <div className="flex relative p-4">
        <button onClick={toggleSidebar} className="z-20 absolute left-2 top-0 lg:hidden">Open</button>
      <Sidebar isSidebarOpen={isSidebarOpen}/>
      <div className="w-full">
      <Outlet/>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminLayout