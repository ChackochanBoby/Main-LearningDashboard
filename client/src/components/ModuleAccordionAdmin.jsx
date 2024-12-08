import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import Modal from "../components/Modal"
import UpdateModuleForm from "./UpdateModuleForm";

const ModuleAccordionAdmin = ({ module }) => {
  const { title, description, lessons } = module;
  const [isOpen, toggleAccordion] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  
  const openModal=()=>{
    setModalOpen(true)
  }


  const adminRole = location.pathname.startsWith("/admin")
    ? "admin"
    : "instructor";
  const navigateUrl = `/${adminRole}/lesson/`;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onDeleteClick = async () => {
    try {
      await axiosInstance.delete(`/modules/${module._id}`);
      navigate(0);
    } catch (error) {
      console.log("error deleting module", error);
    }
  };

  return (
    <article className="shadow-lg rounded-lg bg-base-200">
      <div className=" w-full px-8 py-4 flex items-center justify-between">
        <h3 className="text-xl capitalize font-semibold">{title}</h3>
        <div className="flex items-center">
          <button
            onClick={() => toggleAccordion(!isOpen)}
            className="btn btn-info btn-sm h-full"
          >
            {isOpen ? "Close" : "Open"}
          </button>
          <div className="relative">
            <button className="btn btn-circle" onClick={toggleDropdown}>
              <span className="material-symbols-outlined">more_vert</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-6 -bottom-28 mt-2 bg-base-100 z-50 shadow-md w-48 sm:w-60 md:w-72 lg:w-80">
                <ul className="py-2">
                  {/* Add Lesson Option */}
                  {
                    adminRole==="instructor"?(<li>
                      <Link
                        to={`/instructor/${module._id}/add-lesson`}
                        className="block px-4 py-2 text-sm text-black"
                      >
                        Add Lesson
                      </Link>
                    </li>):null
                  }
                  {/* Delete Module Option */}
                  <li>
                    <button
                      onClick={openModal}
                      className="block px-4 py-2 text-sm"
                    >
                      Update Module
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onDeleteClick}
                      className="block px-4 py-2 text-sm text-red-600"
                    >
                      Delete Module
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          ;
        </div>
      </div>
      <div className={`w-full px-8 text-left ${isOpen ? null : "hidden"} `}>
        <p className="w-full md:w-3/4 text-pretty text-center md:text-left text-base">
          {description}
        </p>
        <ul className="w-full py-4 flex flex-col gap-4 *:bg-base-100 *:rounded-lg *:shadow-md *:p-4">
          {lessons.map((lesson, index) => (
            <li key={index}>
              <Link to={`${navigateUrl}${lesson._id}`}>{lesson.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} modalControl={setModalOpen}>
          <UpdateModuleForm moduleId={module._id}/>
      </Modal>
    </article>
  );
};

export default ModuleAccordionAdmin;

// Function to toggle dropdown menu visibility
