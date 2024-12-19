import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {
  const admin = useSelector((state)=>state.user.admin)
    const [profileImg,setProfileImage] = useState(null)
    useEffect(()=>{
      setProfileImage(admin.profileImg)
      },[admin])
  return (
      <header className=" mx-auto navbar bg-base-100 col-span-2 row-span-1 shadow-md">
        <div className="flex-1">
          <Link to={"/admin"} className="btn btn-ghost text-xl">
            MindSpring
          </Link>
        </div>
        <div className="flex gap-4">
          <ThemeSwitcher/>
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
                <Link to={"/admin/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <LogoutButton/>
              </li>
            </ul>
          </div>
        </div>
      </header>
  );
};

export default AdminNavbar;
