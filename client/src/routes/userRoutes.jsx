import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/UserDashboard";
import userDashboardLoader from "../loaders/userDashboardLoader";
import CoursesPage from "../pages/CoursesPage";
import coursesPageLoader from "../loaders/coursesPageLoader";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import CourseDashboard from "../pages/CourseDashboard";
import ErrorPage from "../pages/ErrorPage";
import courseDetailsLoader from "../loaders/courseDetailsLoader";
import courseDashboardPageLoader from "../loaders/courseDasboardPageLoader";
import LessonPage from "../pages/LessonPage";
import lessonLoader from "../loaders/lessonLoader"
import ProfilePage from "../pages/ProfilePage";
import profilePageLoaderUser from "../loaders/profilePageLoaderUser";

const userRoutes=[
  {
    path: "user",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <UserDashboard />, loader: userDashboardLoader },
      {
        path: "courses",
        element: <CoursesPage />,
        loader: coursesPageLoader,
      },
      {
        path: "courses/:courseId", 
        element: <CourseDetailsPage />,
        loader: courseDetailsLoader
      },
      {
        path: "courses/:courseId/course-dashboard",
        element: <CourseDashboard />,
        loader: courseDashboardPageLoader
      },
      {
        path:"course-dashboard/lesson/:lessonId",
        element:<LessonPage/>,
        loader: lessonLoader
      },
      {
        path:"profile",
        element:<ProfilePage/>,
        loader: profilePageLoaderUser
      }
    ],
  }
]
export default userRoutes