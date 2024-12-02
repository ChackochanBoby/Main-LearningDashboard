import LoginPageUser from "../pages/LoginPageUser";
import SignupPageUser from "../pages/SignupPageUser";
import LandingPage from "../pages/LandingPage";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPageAdmin from "../pages/LoginPageAdmin";

const publicRoutes=[{
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/user/login",
        element: <LoginPageUser />,
      },
      {
        path: "/user/signup",
        element: <SignupPageUser />,
      },
      {
        path: "/management/login",
        element: <LoginPageAdmin />,
      },
      {
        path: "/management/signup",
        element: <SignupPageUser />,
      },
    ],
  }]
  export default publicRoutes