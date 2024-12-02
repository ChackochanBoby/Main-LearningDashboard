import { NavLink } from "react-router-dom";

const Sidebar = ({isSidebarOpen}) => {
  return (
    <aside className={`h-full absolute z-10 md:static md:z-0 ${isSidebarOpen?"block":"hidden"} lg:block`}>
      <nav className="flex flex-col items-center justify-start gap-4 bg-base-100 border-r-2 border-r-gray-600 text-primary min-h-full w-80 p-4 text-lg font-semibold focus:*:text-accent">
        <NavLink to={"/user"}>Dashboard</NavLink>
        <NavLink to={"/user/courses"}>Courses</NavLink>
        <NavLink to={"/user/profile"}>Profile</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
