import { useLocation,useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axiosInstance from "../config/axios"
import { removeAdmin, removeUser } from "../redux/userSlice"

const LogoutButton = () => {
  const location=useLocation()
  const navigate=useNavigate()
  const dispatch=useDispatch()

  let role = "admin"
  if(location.pathname.startsWith("/user")){
    role="user"
  }

  const onLogoutClick=async()=>{
    await axiosInstance.post(`/auth/${role}/logout`)
    if(role==="admin"){
      dispatch(removeAdmin)
    }
    else{
      dispatch(removeUser)
    }
    navigate("/")
  }
  return (
    <button onClick={onLogoutClick} className=" w-full bg-red-600 text-white hover:bg-black">Logout</button>
  )
}

export default LogoutButton