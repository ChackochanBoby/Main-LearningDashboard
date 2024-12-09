import {
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Modal from "../components/Modal";
import UpdateCourseDetailsForm from "../components/UpdateCourseDetailsForm";
import { useState } from "react";
import UpdateThumbnailForm from "../components/UpdateThumbnailForm";
import axiosInstance from "../config/axios";

const ManageCoursePage = () => {
  const { courseDetails, error } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCourseUpdateModalOpen, setCourseUpdateModal] = useState(false);
  const [isThumbnailUpdateModalOpen, setThumbnailUpdateModal] = useState(false);
  const adminRole = location.pathname.startsWith("/admin")
    ? "admin"
    : "instructor";

  if (error) {
    return <div>{error}</div>;
  }

  const sendForReviewAndPublish = async () => {
    try {
      await axiosInstance.patch(
        `/courses/${courseDetails._id}/send-for-review`
      );
      window.alert(
        "added for review, course will be reviewed by admins in a short while"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/courses/${courseDetails._id}/delete`);
        if (location.pathname.startsWith("/admin")) navigate("/admin/courses");
        else navigate("/instructor");
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <main>
      <section id="manage-course-details" className="w-full p-8 bg-base-300">
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
          <div className="md:col-span-2 lg:col-span-3 text-center md:text-left flex flex-col items-center justify-between gap-5">
            <div>
              <h1 className="text-5xl font-bold capitalize">
                {courseDetails.title}
              </h1>
              <p className="pt-6">{courseDetails.description}</p>
            </div>
            <div className=" mx-auto md:ml-0">
              <span className="text-lg font-semibold text-base-content capitalize block">{courseDetails.status}</span>
              <span className="font-semibold block text-lg">
                Price: ₹{courseDetails.price}
              </span>
            </div>
            {/* Buttons Section */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setCourseUpdateModal(true)}
                className="btn btn-secondary text-white"
              >
                Update Course
              </button>
              <button
                onClick={() => setThumbnailUpdateModal(true)}
                className="btn btn-primary text-white"
              >
                Update Thumbnail
              </button>
              <Link
                to={`/${adminRole}/${courseDetails._id}/course-dashboard`}
                className="btn btn-info text-white"
              >
                Course Content
              </Link>
              {
                adminRole==="instructor"&&(courseDetails.status!=="approved"&&courseDetails.status!=="pending_review")?<button onClick={sendForReviewAndPublish} className="btn btn-success">
                  Send for Review
                </button>:null
              }
              
                {
                  adminRole==="admin"&&(
                    <button className="btn btn-success">Review</button>
                  )
                }
              <button
                onClick={handleDeleteClick}
                className="btn btn-error text-white"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isCourseUpdateModalOpen}
          modalControl={setCourseUpdateModal}
        >
          <UpdateCourseDetailsForm courseId={courseDetails._id} />
        </Modal>
        <Modal
          isOpen={isThumbnailUpdateModalOpen}
          modalControl={setThumbnailUpdateModal}
        >
          <UpdateThumbnailForm courseId={courseDetails._id} />
        </Modal>
      </section>

      <section id="about-instructor" className="xl:container mx-auto p-8">
        <div className="text-base-content p-16">
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
            About the Instructor
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Profile Image */}
            <figure className="w-24 h-24 overflow-hidden rounded-full flex-shrink-0">
              <img
                src={courseDetails.instructor.profileImg}
                alt={courseDetails.instructor.name}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Instructor Info */}
            <div className="text-center md:text-left ml-3">
              <p className="text-2xl font-medium capitalize">
                {courseDetails.instructor.name}
              </p>
              <p className="text-base">{courseDetails.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ManageCoursePage;
