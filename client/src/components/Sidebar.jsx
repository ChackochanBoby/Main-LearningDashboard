import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 h-full row-span-1 bg-base-200 shadow-inner border-accent hidden md:block">
      <nav className="flex flex-col items-center justify-start gap-4  text-primary min-h-full w-full p-4 text-lg font-semibold focus:*:text-accent">
        <Link to={"/admin"}>Dashboard</Link>
        <Link to={"/admin/courses"}>Courses</Link>
        <Link to={"/admin/pending-review"}>Pending Review</Link>
        <Link to={"/admin/users"}>Users</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
