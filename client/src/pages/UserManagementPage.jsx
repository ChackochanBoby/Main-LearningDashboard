import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserCard from "../components/UserCard";

const UserManagementPage = () => {
  // Fetch data from loader
  const { users, currentTab: initialTab, error } = useLoaderData();
  const [activeTab, setActiveTab] = useState(initialTab); // Set initial tab from loader
  const navigate = useNavigate();

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`); // Update URL to reflect the selected tab
  };

  return (
    <div className="w-full h-full flex flex-col md:col-span-1 col-span-2 pb-6">
      {/* Header */}
      <header className="p-4 mx-auto xl:container">
        <h1 className="text-xl font-bold">User Management</h1>
      </header>

      {/* Tab Navigation */}
      <nav className="flex bg-white shadow">
        <button
          onClick={() => handleTabChange("learner")}
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "learner"
              ? "bg-primary text-white"
              : "bg-base-200 text-base-content"
          }`}
        >
          Learners
        </button>
        <button
          onClick={() => handleTabChange("instructor")}
          className={`flex-1 py-2 px-4 text-center ${
            activeTab === "instructor"
              ? "bg-primary text-white"
              : "bg-base-200 text-base-content"
          }`}
        >
          Instructors
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 w-full mx-auto xl:container">
        {error ? (
          <div className="h-full w-full bg-red-100 rounded shadow p-4 flex items-center justify-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div className="h-full w-full bg-base-100 rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-4 capitalize text-left">
              {activeTab} Management
            </h2>
            {users.length > 0 ? (
              <ul className="w-full">
                {users.map((user,index) => (
                  <li
                    key={index}
                    className="w-full"
                  >
                    <UserCard profileImg={user.profileImg} name={user.name} email={user.email} id={user._id} role={user.role}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-lg text-center">
                No {activeTab === "learner" ? "learners" : "instructors"} found.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagementPage;
