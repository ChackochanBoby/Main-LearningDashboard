import AdminLayout from "../layouts/AdminLayout"
import AddLessonPage from "../pages/AddLessonPage"
import ErrorPage from "../pages/ErrorPage"

const adminRoutes=[{
      path: "/admin",
      element: <AdminLayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {path:"",element:<AddLessonPage/>}
      ],
    }]

export default adminRoutes