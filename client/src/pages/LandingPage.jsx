import { Link } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

const LandingPage = () => {
  return (
    <>
      <header className="bg-base-100">
        <div className="xl:container navbar justify-between px-8 mx-auto">
          <Link className="text-2xl font-extrabold text-base-content">
            MindSpring
          </Link>
          <div className="flex items-center gap-4 h-full">
            <ThemeSwitcher />
            <Link className=" btn bg-secondary rounded-full px-6 text-base-100 text-base font-semibold hidden md:flex ">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="py-8">
        <section className="xl:container px-8 mx-auto">
          <div className="hero-content grid lg:grid-cols-[70%_30%] gap-4">
            <div className="order-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1661602346960-dcb7b9b99779?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudHMlMjBjb21wdXRlcnxlbnwwfHwwfHx8MA%3D%3D"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-center lg:text-left">
                Welcome to <span className="block text-6xl">MindSpring</span>
              </h1>
              <p className="py-6 text-center max-w-96 lg:max-w-3xl lg:text-left ">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <div className="w-full flex justify-center lg:justify-start">
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
