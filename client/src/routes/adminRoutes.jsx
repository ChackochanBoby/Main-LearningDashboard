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
import CoursesPageAdmin from "../pages/CoursesPageAdmin"
import coursesPageLoaderAdmin from "../loaders/coursesPageLoaderAdmin"
import CoursesPendingReview from "../pages/CoursesPendingReview"
import coursesPendingReviewLoader from "../loaders/coursesPendingReviewLoader"
import UserManagementPage from "../pages/UserManagementPage"
import userManagementLoader from "../loaders/userManagementLoader"
import AdminDashboard from "../pages/AdminDashboard"
import AdminDashboardLoader from "../loaders/AdminDashboardLoader"
import LearnerManagementPage from "../pages/LearnerManagementPage"
import LearnerPageLoader from "../loaders/LearnerPageLoader"
import InstructorManagementPage from "../pages/InstructorManagementPage"
import InstructorPageLoader from "../loaders/instructorPageLoader"

const adminRoutes=[{
      path: "/admin",
      element: <AdminLayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {path:"",element:<AdminDashboard/>,loader:AdminDashboardLoader},
        {path:"courses",element:<CoursesPageAdmin/>,loader:coursesPageLoaderAdmin},
        {path:"pending-review",element:<CoursesPendingReview/>,loader:coursesPendingReviewLoader},
        {path:"courses/:courseId",element:<ManageCoursePage/>,loader:manageCoursePageLoader},
        {path:":courseId/course-dashboard",element:<CourseDashboardAdmin/>,loader:courseDashboardPageLoaderAdmin},
        {path:"lesson/:lessonId",element:<LessonPage/>,loader:lessonLoaderAdmin},
        {path:"profile", element:<ProfilePage/>, loader:profilePageLoaderAdminAndInstructor },
        {path:"lesson/:lessonId/update",element:<UpdateLessonPage/>,loader:updateLessonPageLoader},
        {path:"users",element:<UserManagementPage/>,loader:userManagementLoader},
        {path:"users/learners/:learnerId",element:<LearnerManagementPage/>,loader:LearnerPageLoader},
        {path:"users/instructors/:instructorId",element:<InstructorManagementPage/>,loader:InstructorPageLoader},
      ],
    }]

export default adminRoutes