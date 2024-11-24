import { Outlet,Link, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import ThemeSwitcher from "../components/ThemeSwitcher"

const RootLayout = () => {
    const location=useLocation()
    const authRoutes=["/user/login","/user/signup","/admin/login/","/admin/signup"]
  return (
    <div className='w-full grid grid-rows-[min_content_1fr_min-content'>
    <header className="bg-base-100 w-full">
      <div className="xl:container navbar justify-between px-8 mx-auto">
        <Link className="text-2xl font-extrabold text-base-content">
          MindSpring
        </Link>
        <div className="flex items-center gap-4 h-full">
          <ThemeSwitcher/>
          {authRoutes.includes(location.pathname)?null:<Link to={"/user/login"} className=" btn bg-secondary rounded-full px-6 text-base-100 text-base font-semibold hidden md:flex ">
            Get Started
          </Link>}
          
        </div>
      </div>
    </header>
    <Outlet/>
    {authRoutes.includes(location.pathname)?null:<Footer/>}
    </div>
  )
}

export default RootLayout