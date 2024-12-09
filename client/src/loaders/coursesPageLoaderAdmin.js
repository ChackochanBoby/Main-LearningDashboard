import axiosInstance from "../config/axios";

const coursesPageLoaderAdmin = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const pageNo = page ? parseInt(page) : 1;
  const limit = 10;
  const status= url.searchParams.get("status")
  if (isNaN(pageNo) || pageNo < 1) {
    return {
      error: "Invalid page number. Please provide a valid page number.",
    };
  }
  if(status&&status!=="approved"&&status!=="unpublished"){
    return{
        error:"Invalid status parameter"
    }
  }
  try {
    const response = await axiosInstance.get(
      `/admins/courses?page=${pageNo}&limit=${limit}${status&&`&status=${status}`}`
    );
    return {
      courses: response.data.data,
      totalPages: response.data.totalPages,
      totalResults: response.data.totalResults,
      currentStatusFilter:status||"approved",
      currentPage: pageNo,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      error: error.response.data.message,
    };
  }
};

export default coursesPageLoaderAdmin;
