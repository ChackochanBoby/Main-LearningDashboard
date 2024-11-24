import axiosInstance from "../config/axios";

const coursesPageLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const pageNo = page ? parseInt(page) : 1;
  const limit = 10;
  if (isNaN(pageNo) || pageNo < 1) {
    return {
      error: "Invalid page number. Please provide a valid page number.",
    };
  }
  try {
    const response = await axiosInstance.get(
      `/courses?page=${pageNo}&limit=${limit}`
    );
    return {
      courses: response.data.data,
      totalPages: response.data.totalPages,
      totalResults: response.data.totalResults,
      currentPage: pageNo,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      error: error.response.data.message,
    };
  }
};

export default coursesPageLoader;
