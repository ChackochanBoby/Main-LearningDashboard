import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ModuleAccordionAdmin = ({ module }) => {
  const { title, description, lessons } = module;
  const [isOpen, toggleAccordion] = useState(false);
  const [isDropdownOpen,setDropdownOpen] = useState(false)
  const location = useLocation();
const adminRole = location.pathname.startsWith("/admin")
  ? "admin"
  : "instructor";
const navigateUrl = `/${adminRole}/lesson/`;

const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
    <div className="absolute right-6 -bottom-20 mt-2 bg-base-100 z-50 shadow-md w-48 sm:w-60 md:w-72 lg:w-80">
      <ul className="py-2">
        {/* Add Lesson Option */}
        <li>
          <Link
            to={`/instructor/${module._id}/add-lesson`}
            className="block px-4 py-2 text-sm text-black"
          >
            Add Lesson
          </Link>
        </li>
        {/* Delete Module Option */}
        <li>
          <button className="block px-4 py-2 text-sm text-red-600">
            Delete Module
          </button>
        </li>
      </ul>
    </div>
  )}
</div>;
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
    </article>
  );
};

export default ModuleAccordionAdmin;


// Function to toggle dropdown menu visibility



