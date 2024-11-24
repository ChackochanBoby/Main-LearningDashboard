import { Outlet, useNavigate } from "react-router-dom"
import PrimarynavBarUser from "../components/PrimarynavBarUser"
import Footer from "../components/Footer"
import axiosInstance from "../config/axios"
import {  useDispatch } from 'react-redux'
import { removeUser, setUser } from '../redux/userSlice'
import { useEffect } from "react"

const UserLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkUserAuth = async() => {
    try {
      const response = await axiosInstance.get("/users/check-user")
      dispatch(setUser(response.data.data))
    } catch (error) {
      dispatch(removeUser())
      navigate("/user/login")
      console.error(error)
    }
  }
  useEffect(() => {
    checkUserAuth()
  })
  return (
      <div className="grid grid-rows-[min-content_1fr_min-content] min-h-screen">
          <PrimarynavBarUser />
          <Outlet />
          <Footer/>
    </div>
  )
}

export default UserLayout