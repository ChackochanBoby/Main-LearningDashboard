import { useLoaderData, useNavigate } from "react-router-dom";
import AdminDashboardPieChart from "../components/AdminDashboardPieChart";

const AdminDashboard = () => {
    const {totalLearners,totalInstructors,pendingReview,publishedCourses}=useLoaderData()
    const navigate=useNavigate()
  
    return (
      <main className="p-8 bg-base-100 h-full col-span-2 md:col-span-1 w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-fit mx-auto">
          <div className="bg-base-200 shadow-md rounded-lg p-6 text-center cursor-pointer" onClick={()=>navigate("/admin/users?tab=learner")}>
            <h2 className="text-xl font-semibold mb-2">Learners</h2>
            <p className="text-4xl font-bold text-blue-500">{totalLearners}</p>
          </div>
  
          <div className="bg-base-200 shadow-md rounded-lg p-6 text-center cursor-pointer" onClick={()=>navigate("/admin/courses?page=1&status=approved")}>
            <h2 className="text-xl font-semibold mb-2">Published Courses</h2>
            <p className="text-4xl font-bold text-blue-500">{publishedCourses}</p>
          </div>
  
          <div className="bg-base-200 shadow-md rounded-lg p-6 text-center cursor-pointer" onClick={()=>navigate("/admin/users?tab=instructor")}>
            <h2 className="text-xl font-semibold mb-2">Instructors</h2>
            <p className="text-4xl font-bold text-blue-500">{totalInstructors}</p>
          </div>
  
          <div className="bg-base-200 shadow-md rounded-lg p-6 text-center cursor-pointer" onClick={()=>navigate("/admin/pending-review")}>
            <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
            <p className="text-4xl font-bold text-blue-500">{pendingReview}</p>
          </div>
        </div>
        <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Learners vs. Instructors</h2>
        <AdminDashboardPieChart learners={totalLearners} instructors={totalInstructors} />
      </div>
      </main>
    );
  };
  
  export default AdminDashboard;