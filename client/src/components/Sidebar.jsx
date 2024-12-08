import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 h-full row-span-1 bg-base-200 shadow-inner border-accent hidden md:block">
      <nav className="flex flex-col items-center justify-start gap-4  text-primary min-h-full w-full p-4 text-lg font-semibold focus:*:text-accent">
        <NavLink to={"/user"}>Dashboard</NavLink>
        <NavLink to={"/user/courses"}>Courses</NavLink>
        <NavLink to={"/user/profile"}>Profile</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
