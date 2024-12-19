import axiosInstance from "../config/axios";

const coursesPageLoaderAdmin = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const status = url.searchParams.get("status");
  const pageNo = page ? parseInt(page, 10) : 1;
  const limit = 10;

  // Validate page number
  if (isNaN(pageNo) || pageNo < 1) {
    return {
      error: "Invalid page number. Please provide a valid page number.",
    };
  }

  // Validate status
  const validStatuses = ["approved", "unpublished"];
  if (status && !validStatuses.includes(status)) {
    return {
      error: "Invalid status parameter.",
    };
  }

  // Build query parameters
  const queryParams = new URLSearchParams({
    page: pageNo,
    limit,
    status: status || "approved",
  });

  try {
    const response = await axiosInstance.get(`/admins/courses?${queryParams.toString()}`);
    return {
      courses: response.data.data,
      totalPages: response.data.totalPages,
      totalResults: response.data.totalResults,
      currentStatusFilter: status || "approved",
      currentPage: pageNo,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);

    // Handle cases where error.response may be undefined
    return {
      error: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
};

export default coursesPageLoaderAdmin;
