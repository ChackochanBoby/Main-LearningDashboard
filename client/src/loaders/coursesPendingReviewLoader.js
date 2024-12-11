import axiosInstance from "../config/axios";

const coursesPendingReviewLoader = async () => {
  try {
    const response = await axiosInstance.get("/admins/courses/pending-review"); // Use your dedicated API endpoint
    return {
      courses: response.data.data.courses,
      
    };
  } catch (error) {
    return {
      error: error.response?.data?.message || "An error occurred while loading courses.",
      statusCode:error.response.status,
      totalResults:0
    };
  }
};

export default coursesPendingReviewLoader;