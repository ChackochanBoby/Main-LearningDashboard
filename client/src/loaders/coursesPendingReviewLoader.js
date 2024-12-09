import axiosInstance from "../config/axios";

const coursesPendingReviewLoader = async () => {
  try {
    const response = await axiosInstance.get("/admins/courses/pending-review"); // Use your dedicated API endpoint
    return {
      courses: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching pending review courses:", error);
    return {
      error: error.response?.data?.message || "An error occurred while loading courses.",
    };
  }
};

export default coursesPendingReviewLoader;