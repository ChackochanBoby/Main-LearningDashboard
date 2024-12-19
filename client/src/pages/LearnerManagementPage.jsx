import { useLoaderData,useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LearnerManagementPage = () => {
  const { profile, enrolledCourses } = useLoaderData();
  const navigate=useNavigate()
  const notify = (message, type = 'success', callback = null) => {
    toast(message, { type, onClose: callback });
  };
  const handleUnenroll = async (enrollmentId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to unenroll this user? This action cannot be undone."
    );
  
    if (!userConfirmed) return; // Exit the function if the user cancels
  
    try {
      await axiosInstance.delete(`/admins/enrollment/${enrollmentId}`);
      notify("Successfully deleted enrollment", "success", () => navigate(0));
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  };
  

  const handleDeleteProfile = async() => {
    try {
      await axiosInstance.delete(`/admins/learner/${profile._id}`)
      notify("successfully deleted user Profile","success",()=>navigate("/admin/users"))
    } catch (error) {
      notify(error.response.data.message,"error")
    }
  };

  return (
    <main className="p-8 bg-base-100 h-full w-full col-span-2 md:col-span-1">
      <ToastContainer/>
      <h1 className="text-3xl font-bold text-center mb-8">Learner Profile</h1>

      <div className="mb-6 flex flex-col items-center">
        <img
          src={profile.profileImg} // Use a default image if none is provided
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-semibold">Learner Info</h2>
        <p className="text-lg">Name: {profile.name}</p>
        <p className="text-lg">Email: {profile.email}</p>
        {/* Add more learner details here */}
        <button
          onClick={handleDeleteProfile}
          className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-700"
        >
          Delete Profile
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
        <ul className="space-y-4">
          {enrolledCourses.length === 0 ? (
            <li>No courses enrolled.</li>
          ) : (
            enrolledCourses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-md"
              >
                <div>
                  <p className="font-semibold text-lg">{course.title}</p>
                </div>
                <button
                  onClick={() => handleUnenroll(course.enrollmentId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Unenroll
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
};

export default LearnerManagementPage;
