import ThemeSwitcher from "../components/ThemeSwitcher"
import { Link } from "react-router-dom"
const HeaderRoot = ({authRoutes}) => {
  return (
    <header className="bg-base-100 w-full">
      <div className="xl:container navbar justify-between mx-auto">
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
  )
}

export default HeaderRoot