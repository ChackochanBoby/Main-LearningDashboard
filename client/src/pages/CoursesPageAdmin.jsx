import { useLoaderData, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CoursesPageAdmin = () => {
  const navigate = useNavigate();
  const {
    courses,
    totalPages = 1, // Default to 1 if undefined
    totalResults,
    currentPage,
    currentStatusFilter,
    error,
  } = useLoaderData();

  const handleStatusChange = (e) => {
    const status = e.target.value;
    navigate(`/admin/courses?page=1&status=${status}`);
  };

  const nextPage = () => {
    let page = currentPage + 1;
    if (page > totalPages) {
      page = 1;
    }
    navigate(`/admin/courses?page=${page}&status=${currentStatusFilter}`);
  };

  const previousPage = () => {
    let page = currentPage - 1;
    if (page < 1) {
      page = totalPages;
    }
    navigate(`/admin/courses?page=${page}&status=${currentStatusFilter}`);
  };

  return (
    <main className="w-full md:col-span-1 col-span-2 pb-6">
      <div className="xl:container mx-auto p-8 pb-1 grid grid-rows-[min-content_1fr] h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl">Courses</h1>
          <span className="xl">Total results: {totalResults || 0}</span>
        </div>
        <div className="form-control w-40">
          <div className="label">
            <label htmlFor="status-filter" className="label-text">
              Filter by status
            </label>
          </div>
          <select
            id="status-filter"
            value={currentStatusFilter}
            onChange={handleStatusChange}
            className="select select-bordered"
          >
            <option value="approved">Approved</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        {totalResults > 0 ? (
          <div className="h-full flex flex-col justify-between w-full items-center">
            <div className="w-fit mx-auto md:w-full my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 sm:gap-x-6 ">
              {courses.map((course, index) => (
                <CourseCard course={course} directTo={"details"} key={index} />
              ))}
            </div>
            {totalPages > 1 && ( // Ensure pagination is only shown for more than 1 page
              <div className="flex items-center justify-center space-x-4 p-4 bg-inherit rounded-lg">
                <button className="btn btn-primary" onClick={previousPage}>
                  «
                </button>
                <div className="h-12 min-h-3 inline-flex place-items-center text-base-content font-semibold">
                  Page {currentPage}/{totalPages}
                </div>
                <button className="btn btn-primary" onClick={nextPage}>
                  »
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="block my-10 text-3xl w-full text-center">{error}</span>
        )}
      </div>
    </main>
  );
};

export default CoursesPageAdmin;
