import { Link } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <div className="btm-nav btm-nav-xs sm:btm-nav-sm row-span-1 col-span-2 md:hidden">
      <Link to={"/admin/dashboard"}>
        <span className="sr-only">dashboard</span>
        <span aria-hidden="true" className="material-icons-outlined">home</span>
      </Link>
      <Link to={"/admin/users"}>
        <span className="sr-only">user management</span>
        <span aria-hidden="true" className="material-icons-outlined">people</span>
      </Link>
      <Link to={"/admin/courses"}>
      <span className="sr-only">courses</span>
      <span aria-hidden="true" className="material-icons-outlined">library_books</span>
      </Link>
      <Link to={"/admin/pending-reviews"}>
      <span className="sr-only">pending reviews</span>
      <span aria-hidden="true" className="material-icons-outlined">approval</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
