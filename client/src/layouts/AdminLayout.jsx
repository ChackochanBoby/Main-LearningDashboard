import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import BottomNavigation from "../components/BottomNavigation";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../config/axios";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAdmin, setAdmin } from "../redux/userSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const checkAdminAuth = async () => {
    try {
      const response = await axiosInstance.get("/admins/check-admin");
      if (response.data.data.role === "admin") {
        dispatch(
          setAdmin({
            id: response.data.data.id,
            role: response.data.data.role,
            name: response.data.data.name,
            profileImg: response.data.data.profileImg,
          })
        );
      } else {
        throw new Error("Unauthorized role");
      }
    } catch (error) {
      dispatch(removeAdmin());
      navigate("/management/login");
      console.error("Authentication Error:", error.message);
    } 
  };

  useEffect(() => {
    checkAdminAuth();
    window.scrollTo(0, 0); // Scroll to the top whenever the route changes
  }, [location.pathname]);
  return (
    <div className="min-h-screen w-full grid grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr] overflow-x-hidden">
      <AdminNavbar />
      <Sidebar />
      <Outlet />
      <div className="md:block hidden row-span-1 col-span-2">
        <Footer />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AdminLayout;
