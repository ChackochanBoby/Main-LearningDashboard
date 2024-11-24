import axiosInstance from "../config/axios";

  const userDashboardLoader = async () => {
    try {
        const response = await axiosInstance.get("/users/enrolled-courses");
        return { courses: response.data.data };
      } catch (error) {
        console.error("Error fetching courses:", error);
        return { courses: [] };
      }
  }
  
  export default userDashboardLoader