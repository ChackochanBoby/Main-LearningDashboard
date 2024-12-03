import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <main className="pt-8">
      <section className="xl:container mt-12 px-8 mx-auto">
        <div className="hero-content max-w-full grid lg:grid-cols-[70%_30%] gap-4">
          <div className="order-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1661602346960-dcb7b9b99779?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudHMlMjBjb21wdXRlcnxlbnwwfHwwfHx8MA%3D%3D"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="px-2">
            <h1 className="text-4xl font-bold text-center lg:text-left">
              Welcome to <span className="block text-6xl">MindSpring</span>
            </h1>
            <p className="py-6 mx-auto lg:mx-0 text-center max-w-96 lg:max-w-3xl lg:text-left ">
              join MindSpring today and embark on a transformative learning
              journey. Whether you&apos;re mastering new skills, exploring fresh
              ideas, or building a future-ready career, we&apos;ve got you
              covered.
            </p>
            <div className="pt-0 pb-6 flex flex-col items-center *:text-center lg:items-start lg:*:text-left">
              <p>📚 Explore Diverse Courses</p>
              <p>🧠 Learn at Your Pace</p>
              <p>🌱 Grow Beyond Boundaries</p>
            </div>
            <div className="w-full flex justify-center lg:justify-start">
              <Link
                to={"/user/login"}
                className="btn btn-primary rounded-full px-6 text-base-100 text-base font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="xl:container mx-auto p-8 flex justify-center items-center">
        <div className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aspect-square rounded-xl bg-accent flex justify-center items-center w-full p-8 shadow-xl">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">
              We offer courses from multiple industries
            </h2>
          </div>
          <div className="aspect-square rounded-xl flex flex-col justify-center items-center w-full p-8 shadow-xl text-base-content">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              🎨 Design & Creativity
            </h3>
            <p className="text-pretty text-center text-sm sm:text-base">
              Unlock your creative potential with courses in graphic design,
              UI/UX, and digital art. Develop the skills to create stunning
              visuals and user-friendly experiences.
            </p>
          </div>
          <div className="aspect-square rounded-xl flex flex-col justify-center items-center w-full p-8 shadow-xl text-base-content">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              📊 Business & Marketing
            </h3>
            <p className="text-pretty text-center text-sm sm:text-base">
              Gain the skills needed to thrive in the business world. From
              digital marketing and sales strategies to project management and
              entrepreneurship, we cover it all.
            </p>
          </div>
          <div className="aspect-square rounded-xl flex flex-col justify-center items-center w-full p-8 shadow-xl text-base-content">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              💻 Technology & Coding
            </h3>
            <p className="text-pretty text-center text-sm sm:text-base">
              Dive into the world of programming, web development, and
              cybersecurity. Learn to build websites, apps, and secure systems
              with practical, hands-on projects.
            </p>
          </div>
          <div className="aspect-square rounded-xl flex flex-col justify-center items-center w-full p-8 shadow-xl text-base-content">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              🛠️ Personal Development
            </h3>
            <p className="text-pretty text-center text-sm sm:text-base">
              Build essential soft skills like leadership, communication, and
              time management. Empower yourself to succeed both professionally
              and personally.
            </p>
          </div>
          <div className="aspect-square rounded-xl flex flex-col justify-center items-center w-full p-8 shadow-xl text-base-content">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              🚀 Data Science & AI
            </h3>
            <p className="text-pretty text-center text-sm sm:text-base">
              Explore the world of data, machine learning, and artificial
              intelligence. Learn to analyze data and harness cutting-edge
              technologies for career growth.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full mt-8 bg-base-100">
        <section
          id="about"
          className="xl:container py-8 px-8 mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="max-w-5xl py-6 text-center">
            At MindSpring, we believe that learning is more than just acquiring
            knowledge—it’s about growth, discovery, and transformation. Our
            platform is designed to make high-quality education accessible,
            practical, and enjoyable for everyone. Whether you&apos;re a student
            looking to build new skills, a professional aiming to advance your
            career, or a lifelong learner exploring new passions, we’re here to
            support your journey.
          </p>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
