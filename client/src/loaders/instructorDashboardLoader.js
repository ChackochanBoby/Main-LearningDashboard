import axiosInstance from "../config/axios";

  const instructorDashboardLoader = async () => {
    try {
        const response = await axiosInstance.get("/admins/managed-courses");
        return { managedCourses: response.data.data };
      } catch (error) {
        console.error("Error fetching courses:", error);
        return { managedCourses: [] };
      }
  }
  
  export default instructorDashboardLoader