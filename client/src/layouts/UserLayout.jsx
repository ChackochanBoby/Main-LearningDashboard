import { Outlet, useNavigate,useLocation } from "react-router-dom"
import PrimarynavBarUser from "../components/PrimarynavBarUser"
import Footer from "../components/Footer"
import axiosInstance from "../config/axios"
import {  useDispatch } from 'react-redux'
import { removeUser, setUser } from '../redux/userSlice'
import { useEffect } from "react"

const UserLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location=useLocation()
  const checkUserAuth = async() => {
    try {
      const response = await axiosInstance.get("/users/check-user")
      dispatch(setUser({id:response.data.data.id,role:response.data.data.role,name:response.data.data.name,profileImg:response.data.data.profileImg}))
    } catch (error) {
      dispatch(removeUser())
      navigate("/user/login")
      console.error(error)
    }
  }
  useEffect(() => {
    checkUserAuth()
  },[])

  useEffect(()=>{
      window.scrollTo(0, 0); 
  },[location.pathname])

  return (
      <div className="grid grid-rows-[min-content_1fr_min-content] min-h-screen">
          <PrimarynavBarUser />
          <Outlet />
          <Footer/>
    </div>
  )
}

export default UserLayout