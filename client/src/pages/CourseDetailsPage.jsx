import { Link, useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../config/axios";

const CourseDetailsPage = () => {
  const { courseDetails, error, userIsEnrolled } = useLoaderData();
  if (error) {
    return <span className="block my-10 text-3xl w-full text-center">{error}</span>;
  }

  const navigateLink = userIsEnrolled
    ? `/user/courses/${courseDetails._id}/course-dashboard`
    : null;

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE);

      const product = {
        image: courseDetails.thumbnail,
        title: courseDetails.title,
        price: courseDetails.price,
        id: courseDetails._id,
      };

      const session = await axiosInstance.post(
        "/payment/create-payment-session",
        product,
        { withCredentials: true }
      );
      stripe.redirectToCheckout({ sessionId: session.data.sessionId });
    } catch (error) {
      if (error.response.status === 400) {
        window.alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <section id="course-details" className="w-full p-8 bg-base-200">
        <div className="xl:container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <figure className="h-72 aspect-[3/4] overflow-hidden mx-auto rounded-lg">
              <img
                src={
                  courseDetails.thumbnail ||
                  "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                }
                alt={courseDetails.title || "Course Thumbnail"}
                className="w-full h-full object-cover shadow-xl"
              />
            </figure>
          </div>
          <div className="md:col-span-2 lg:col-span-3 text-center md:text-left flex flex-col items center justify-between gap-5">
            <div>
              <h1 className="text-5xl font-bold capitalize">
                {courseDetails.title}
              </h1>
              <p className="pt-6">{courseDetails.description}</p>
            </div>
            <div>
                {
                  userIsEnrolled?(<span className="text-2xl font-semibold text-primary">Owned</span>):(
                    <>
                    <span className="text-2xl font-semibold text-primary">
                  ₹{courseDetails.price}
                </span>
                <span className="ml-2 text-sm text-base-content block">
                  (One-time payment)
                </span>
                    </>)
                }
            </div>
            <div>
              {userIsEnrolled === true ? (
                <Link to={navigateLink} className="btn btn-primary w-">
                  Course Dashboard
                </Link>
              ) : (
                <button onClick={makePayment} className="btn btn-primary">
                  Enroll
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="about-instructor" className="xl:container mx-auto p-8">
        <div className="text-base-content p-16">
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
            About the Instructor
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Profile Image */}
            <figure className="w-24 h-24 overflow-hidden rounded-full flex-shrink-0">
              <img
                src={courseDetails.instructor.profileImg}
                alt={courseDetails.instructor.name}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Instructor Info */}
            <div className="text-center md:text-left ml-3">
              <p className="text-2xl font-medium capitalize">
                {courseDetails.instructor.name}
              </p>
              <p className="text-base">{courseDetails.instructor.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="course-reviews"></section>
    </main>
  );
};

export default CourseDetailsPage;
