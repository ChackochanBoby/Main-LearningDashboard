import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { Link, useLoaderData } from "react-router-dom";

const UserDashboard = () => {
  const userFromRedux = useSelector((state) => state.user.user);
  const [user, setUser] = useState("user");
  const {courses} = useLoaderData()

  // State to manage visibility of courses
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setUser(userFromRedux);
  }, [userFromRedux]);


  const visibleCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <main className="bg-base-100">
      <section id="greeting" className="xl:container mx-auto flex justify-start md:justify-center items-center p-8">
        <h1 className="text-3xl text-left md:text-center">
          Hello! <span className="block md:inline text-5xl">{user.name}</span>
        </h1>
      </section>
      <section className="xl:container mx-auto py-8 px-8">
        <div className="w-full flex justify-between items-center">
        <h2 className="text-left my-4 text-3xl">My Courses</h2>
        {(courses.length>4&&!showAll) && (
            <button
              onClick={() => setShowAll(true)}
              className="link text-base-content"
            >
              View All
            </button>
        )}
        </div>
        {!courses.length>0?<div className="xl:container mx-auto p-8 flex flex-col justify-center items-center gap-4">
          <p>you are not enrolled in any courses.</p>
          <Link to={"/user/courses"} className="btn btn-primary">Explore</Link>
        </div>:<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-8">
        {visibleCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>}
        

        
      </section>
    </main>
  );
};

export default UserDashboard;
