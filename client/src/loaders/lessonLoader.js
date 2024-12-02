import axiosInstance from "../config/axios";

const lessonLoader = async ({ params }) => {
  const { lessonId } = params;
  try {
    const response = await axiosInstance.get(`/lessons/${lessonId}`);
    return { lesson: response.data.data };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      error: error.response.data.message,
    };
  }
};

export default lessonLoader;
