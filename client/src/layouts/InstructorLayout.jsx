import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAdmin, setAdmin } from "../redux/userSlice";
import PrimarynavBarInstructor from "../components/PrimarynavBarInstructor";
import Footer from "../components/Footer";
import axiosInstance from "../config/axios";

const InstructorLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAdminAuth = async () => {
    try {
      const response = await axiosInstance.get("/admins/check-admin");
      if (response.data.data.role === "instructor") {
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
  });

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen overflow-hidden">
          <PrimarynavBarInstructor />
          <Outlet />
          <Footer/>
    </div>
  );
};

export default InstructorLayout;
