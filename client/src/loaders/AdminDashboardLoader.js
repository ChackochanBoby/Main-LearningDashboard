import axiosInstance from "../config/axios"

const AdminDashboardLoader =async () => {
  try {
    const response= await axiosInstance.get("/admins/stats")
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    return {error:error.response.data.message}
  }
}

export default AdminDashboardLoader