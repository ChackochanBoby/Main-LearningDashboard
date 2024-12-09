import AdminLayout from "../layouts/AdminLayout"
import profilePageLoaderAdminAndInstructor from "../loaders/profilePageLoaderAdminAndInstructor"
import ErrorPage from "../pages/ErrorPage"
import ProfilePage from "../pages/ProfilePage"
import ManageCoursePage from "../pages/ManageCoursePage"
import manageCoursePageLoader from "../loaders/manageCoursePageLoader"
import CourseDashboardAdmin from "../pages/CourseDashboardAdmin"
import courseDashboardPageLoaderAdmin from "../loaders/courseDashboardPageLoaderAdmin"
import LessonPage from "../pages/LessonPage"
import lessonLoaderAdmin from "../loaders/lessonLoaderAdmin"
import UpdateLessonPage from "../pages/UpdateLessonPage"
import updateLessonPageLoader from "../loaders/updateLessonPageLoader"

const adminRoutes=[{
      path: "/admin",
      element: <AdminLayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {path:"",element:<div>admin dashboard</div>},
        {path:"courses/:courseId",element:<ManageCoursePage/>,loader:manageCoursePageLoader},
        {path:":courseId/course-dashboard",element:<CourseDashboardAdmin/>,loader:courseDashboardPageLoaderAdmin},
        {path:"lesson/:lessonId",element:<LessonPage/>,loader:lessonLoaderAdmin},
        {path:"profile", element:<ProfilePage/>, loader:profilePageLoaderAdminAndInstructor },
        {path:"lesson/:lessonId/update",element:<UpdateLessonPage/>,loader:updateLessonPageLoader}
      ],
    }]

export default adminRoutes