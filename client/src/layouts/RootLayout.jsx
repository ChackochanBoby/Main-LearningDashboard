import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderRoot from '../components/HeaderRoot';

const RootLayout = () => {
  const location = useLocation();
  const authRoutes = ["/user/login", "/user/signup", "/management/login", "/management/signup"];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <HeaderRoot authRoutes={authRoutes} />
      <main className="flex-1">
        <Outlet />
      </main>
      {authRoutes.includes(location.pathname) ? null : <Footer />}
    </div>
  );
}

export default RootLayout;
