import InstructorLayout from "../layouts/InstructorLayout"
import AddLessonPage from "../pages/AddLessonPage"
import profilePageLoaderAdminAndInstructor from "../loaders/profilePageLoaderAdminAndInstructor"
import ProfilePage from "../pages/ProfilePage"
import ErrorPage from "../pages/ErrorPage"
import InstructorDashboard from "../pages/InstructorDashboard"
import instructorDashboardLoader from "../loaders/instructorDashboardLoader"
import ManageCoursePage from "../pages/ManageCoursePage"
import manageCoursePageLoader from "../loaders/manageCoursePageLoader"
import CourseDashboardAdmin from "../pages/CourseDashboardAdmin"
import courseDashboardPageLoaderAdmin from "../loaders/courseDashboardPageLoaderAdmin"
import LessonPage from "../pages/LessonPage"
import lessonLoaderAdmin from "../loaders/lessonLoaderAdmin"

const InstructorRoutes=[{
      path: "/instructor",
      element: <InstructorLayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {path:"",element:<InstructorDashboard/>,loader:instructorDashboardLoader},
        {path:"courses/:courseId",element:<ManageCoursePage/>,loader:manageCoursePageLoader},
        {path:":courseId/course-dashboard",element:<CourseDashboardAdmin/>,loader:courseDashboardPageLoaderAdmin},
        {path:"lesson/:lessonId",element:<LessonPage/>,loader:lessonLoaderAdmin},
        {path:":moduleId/add-lesson",element:<AddLessonPage/>},
        {path:"profile", element:<ProfilePage/>, loader:profilePageLoaderAdminAndInstructor },
        {path:":lessonId/update",element:<div>update lesson</div>}
      ],
    }]

export default InstructorRoutes