import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PrimarynavBarUser = () => {
  const user = useSelector((state)=>state.user.user)
  const [profileImg,setProfileImage] = useState(null)
  useEffect(()=>{
    setProfileImage(user.profileImg)
    console.log(user)
    },[user])

  return (
    <header className="z-10 drawer">
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
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={profileImg?profileImg:"https://th.bing.com/th?id=OIP.ggX8e6U3YzyhPvp8qGZtQwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-primary min-h-full w-80 p-4 text-lg font-semibold focus:*:text-accent">
          {/* Sidebar content here */}
          <li>
            <Link to={"/user"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/user/courses"}>Courses</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default PrimarynavBarUser;
