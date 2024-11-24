import { useLoaderData, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {
  const navigate = useNavigate();
  const { courses, totalPages, totalResults, currentPage, error } =
    useLoaderData();
  if (error) {
    return (
      <div className="w-full text-center text-red-500 flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }
  
  const nextPage = () => {
    let page = currentPage + 1;
    if (page >= totalPages) {
      page = 1;
    }
    navigate(`/user/courses?page=${page}`);
  };
  const previousPage = () => {
    let page = currentPage - 1;
    if (page <= 1) {
      page = totalPages;
    }
    navigate(`/user/courses?page=${page}`);
  };
  return (
    <main>
      <div className="xl:container mx-auto p-8 pb-1 grid grid-rows-[min-content_1fr] h-full">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl">Courses</h1>
          <span className="xl">total results: {totalResults}</span>
        </div>
        {totalResults > 0 ? (
          <div className="h-full flex flex-col justify-between w-full items-center">
            <div className="w-full my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map((course,index)=><CourseCard course={course} directTo={"details"} key={index}/>)}
            </div>
            <div className="flex items-center justify-center space-x-4 p-4 bg-inherit rounded-lg shadow-md">
{
    totalPages>0?  <button
    className="btn btn-primary"
    onClick={previousPage}
  >
    «
  </button>:null
}
  <div className="h-12 min-h-3 inline-flex place-items-center text-base-content font-semibold">
    Page {currentPage}/{totalPages}
  </div>
  {
    totalPages>0?  <button
    className="btn btn-primary"
    onClick={nextPage}
  >
    »
  </button>:null
}
  
</div>

          </div>
        ) : (
          <span className="block my-10 text-3xl w-full text-center">
            No courses to be found
          </span>
        )}
      </div>
    </main>
  );
};

export default CoursesPage;
