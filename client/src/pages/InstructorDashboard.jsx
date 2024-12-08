import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import CreateCourseForm from "../components/CreateCourseForm";

const InstructorDashboard = () => {
  const instructorFromRedux = useSelector((state) => state.user.admin);
  const [instructor, setInstructor] = useState("instructor");
  const { managedCourses } = useLoaderData();
  const [isCreateCourseModalOpen,setCreateCourseModal]=useState(false)

  const openModal = () =>{
    setCreateCourseModal(true)
  }

  // State to manage visibility of courses
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setInstructor(instructorFromRedux);
  }, [instructorFromRedux]);

  const visibleCourses = showAll ? managedCourses : managedCourses.slice(0, 4);

  return (
    <main className="bg-base-100">
      {/* Greeting Section */}
      <section
        id="greeting"
        className="xl:container mx-auto flex justify-start md:justify-center items-center p-8"
      >
        <h1 className="text-3xl text-left md:text-center">
          Welcome, <span className="block md:inline text-5xl">{instructor.name}</span>
        </h1>
      </section>

      {/* Managed Courses Section */}
      <section className="xl:container mx-auto py-8 px-8">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-left my-4 text-3xl">Managed Courses</h2>
          {managedCourses.length > 4 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="link text-base-content"
            >
              View All
            </button>
          )}
        </div>

        {managedCourses.length === 0 ? (
          <div>
            <p>You are not managing any courses yet.</p>
            <button onClick={openModal} className="btn btn-primary">
            Create a Course
          </button>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
            {visibleCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}

        {/* Create Course Button */}
        <div className="mt-8 flex justify-end">
          <button onClick={openModal} className="btn btn-primary">
            Create a Course
          </button>
        </div>
        <Modal isOpen={isCreateCourseModalOpen} modalControl={setCreateCourseModal}>
            <CreateCourseForm/>
        </Modal>
      </section>
    </main>
  );
};

export default InstructorDashboard;
