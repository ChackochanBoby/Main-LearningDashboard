import { useLoaderData } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CoursesPendingReview = () => {
  const { courses, error , statusCode } = useLoaderData();
  console.log(useLoaderData())
  console.log(courses)

  return (
    <main className="w-full md:col-span-1 col-span-2 pb-6">
      <div className="xl:container mx-auto p-8 pb-1 grid grid-rows-[min-content_1fr] h-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl">Courses Pending Review</h1>
          <span className="xl">Total courses: {courses ? courses.length : 0}</span>
        </div>
        {courses && courses.length > 0 ? (
          <div className="h-full flex flex-col justify-between w-full items-center">
            <div className="w-fit mx-auto md:w-full my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 sm:gap-x-6 ">
              {courses.map((course, index) => (
                <CourseCard course={course} directTo={"details"} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <span className="block my-10 text-3xl w-full text-center">
            <p>{statusCode===404?"No courses pending review at the moment.":error}</p>
          </span>
        )}
      </div>
    </main>
  );
};

export default CoursesPendingReview;