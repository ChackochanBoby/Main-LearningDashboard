import axiosInstance from "../config/axios";

const lessonLoaderAdmin = async ({ params }) => {
  const { lessonId } = params;
  try {
    const response = await axiosInstance.get(`/lessons/${lessonId}/manage`);
    console.log(response.data.data)
    return { lesson: response.data.data };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      error: error.response.data.message,
    };
  }
};

export default lessonLoaderAdmin;
