import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import UserLayout from './layouts/UserLayout';
import LoginPageUser from './pages/LoginPageUser';
import SignupPageUser from './pages/SignupPageUser';
import store from '../src/redux/store'
import { Provider } from 'react-redux'
import UserDashboard from './pages/UserDashboard';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/user",
    element: (
        <UserLayout />
    ),
    children: [
      { path: "", element: <UserDashboard/> },
    ],
  },
  {
    path: "/user/login",
    element: <LoginPageUser />,
  },
  {
    path: "/user/signup",
    element: <SignupPageUser />,
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute>
  //       <AdminLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: "", element: <AdminDashboard /> },
  //   ],
  // },
  {
    path: "/admin/login",
    element: <LoginPageUser />,
  },
  {
    path: "/admin/signup",
    element: <SignupPageUser />,
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
)
