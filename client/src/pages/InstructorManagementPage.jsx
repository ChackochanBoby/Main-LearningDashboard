import { useLoaderData,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../config/axios";

const InstructorManagementPage = () => {
  const { profile, managedCourses } = useLoaderData();
  const navigate=useNavigate()
  const notify = (message, type = 'success', callback = null) => {
    toast(message, { type, onClose: callback });
  };

  const handleDeleteProfile = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this instructor profile? This action cannot be undone."
    );
  
    if (!userConfirmed) return;
  
    try {
      await axiosInstance.delete(`/admins/instructors/${profile._id}`);
      notify("Instructor successfully deleted", "success", () => navigate(-1));
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  };
  

  const visitCourse = (courseId) => {
    navigate(`/admin/courses/${courseId}`)
  };

  return (
    <main className="p-8 bg-base-100 h-full w-full col-span-2 md:col-span-1">
      <h1 className="text-3xl font-bold text-center mb-8">Instructor Profile</h1>

      <div className="mb-6 flex flex-col items-center">
        <img
          src={profile.profileImg} // Use a default image if none is provided
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-semibold">Instructor Info</h2>
        <p className="text-lg">Name: {profile.name}</p>
        <p className="text-lg">Email: {profile.email}</p>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700"
        >
          Delete Profile
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">managed Courses</h2>
        <ul className="space-y-4">
          {managedCourses.length === 0 ? (
            <li>No courses enrolled.</li>
          ) : (
            managedCourses.map((course,index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-md flex gap-x-4"
              >
                <div>
                  <p className="font-semibold text-lg">{course.title}</p>
                </div>
                <button
                  onClick={() => visitCourse(course._id)}
                  className="btn btn-primary"
                >
                  go to
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
};

export default InstructorManagementPage;
