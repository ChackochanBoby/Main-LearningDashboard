import axiosInstance from "../config/axios";

const courseDetailsLoader = async ({ params }) => {
    const { courseId } = params;
  
    try {
      const [courseResponse, enrollmentResponse] = await Promise.all([
        axiosInstance.get(`/courses/${courseId}`),
        axiosInstance.get(`/users/check-enrollment/${courseId}`),
      ]);
  
      console.log(enrollmentResponse.data.data); // Will now log true or false
      return {
        courseDetails: courseResponse.data.data,
        userIsEnrolled: enrollmentResponse.data.data,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error.response?.data?.message || "An error occurred",
      };
    }
  };

  export default courseDetailsLoader