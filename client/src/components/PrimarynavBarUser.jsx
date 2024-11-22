import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const PrimarynavBarUser = () => {
  return (
    <header className="z-10">
      <div className="drawer xl:container mx-auto">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col text-lg font-semibold">
        {/* Navbar */}
        <nav className="navbar bg-base-100 w-full text-base-content">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1"><Link className=" btn btn-ghost text-2xl font-extrabold">MindSpring</Link></div>
          <ThemeSwitcher/>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal text-primary hover:*:text-accent">
              {/* Navbar menu content here */}
              <li>
                <Link to={"/user"}>Dashboard</Link>
              </li>
              <li>
                <Link to={"/user/courses"}>Courses</Link>
              </li>
              <li>
                <Link to={"/user/profile"}>Profile</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"z
        ></label>
        <ul className="menu bg-base-200 text-primary min-h-full w-80 p-4 text-lg font-semibold focus:*:text-accent">
          {/* Sidebar content here */}
          <li>
            <Link to={"/user"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/user/courses"}>Courses</Link>
          </li>
          <li>
            <Link to={"/user/profile"}>Profile</Link>
          </li>
        </ul>
      </div>
      </div>
    </header>
  );
};

export default PrimarynavBarUser;
