import { useLoaderData, useNavigate } from "react-router-dom";

const CourseDetailsPage = () => {
  const { courseDetails, error,userIsEnrolled } = useLoaderData();
  const navigate = useNavigate()
  if (error) {
    return <div>{error}</div>;
  }

  const navigateLink=userIsEnrolled?`/user/courses/${courseDetails._id}/course-dashboard`:null

  
  return (
    <main>
      <section id="course-details" className="w-full p-8 bg-base-200">
        <div className="xl:container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <figure className="h-72 aspect-[3/4] overflow-hidden mx-auto rounded-lg">
              <img
                src={
                  courseDetails.thumbnail ||
                  "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                }
                alt={courseDetails.title || "Course Thumbnail"}
                className="w-full h-full object-cover shadow-xl"
              />
            </figure>
          </div>
          <div className="md:col-span-2 lg:col-span-3 text-center md:text-left flex flex-col items center justify-between gap-5">
            <div>
              <h1 className="text-5xl font-bold capitalize">{courseDetails.title}</h1>
              <p className="pt-6">{courseDetails.description}</p>
            </div>
            <div>
              <p>Duration: 12 weeks</p>
              <p>Rating: 4.5</p>
            </div>
            <div>
              <button onClick={()=>navigate(navigateLink)} className="btn btn-primary w-">{userIsEnrolled?"Course Dashboard":"Enroll"}</button>
            </div>
          </div>
        </div>
      </section>
      <section id="about-instructor" className="xl:container mx-auto p-8">
        <div className="text-base-content p-16">
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">About the Instructor</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <figure className="w-20 h-20 overflow-hidden rounded-full">
              <img
                src={courseDetails.instructor.profileImg}
                alt={courseDetails.instructor.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="text-center md:text-left">
              <p className="text-2xl font-medium capitalize">
                {courseDetails.instructor.name}
              </p>
              <p className="text-lg ">{courseDetails.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="course-reviews"></section>
    </main>
  );
};

export default CourseDetailsPage;
