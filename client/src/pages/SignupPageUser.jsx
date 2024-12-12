import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPageUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const notify = (message, type = "success", callback = null) => {
    toast(message, { type, onClose: callback });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/user/register", data);
      if (response.status === 200) {
        notify("User registered successfully", "success", () =>
          navigate("/user")
        );
      }
    } catch (error) {
      if (error.response?.data?.message) {
        // Server-side general error message (if any)
        notify(error.response.data.message, "error");
      } else {
        // Handle specific field errors (e.g., name, email, password)
        if (error.response?.data?.errors?.name) {
          setError("name", { message: error.response.data.errors.name });
        }
        if (error.response?.data?.errors?.email) {
          setError("email", { message: error.response.data.errors.email });
        }
        if (error.response?.data?.errors?.password) {
          setError("password", {
            message: error.response.data.errors.password,
          });
        }
        if (error.response?.data?.errors?.confirmPassword) {
          setError("confirmPassword", {
            message: error.response.data.errors.confirmPassword,
          });
        }

        // If there are any unexpected errors, notify the user
        if (
          !error.response?.data?.errors?.name &&
          !error.response?.data?.errors?.email &&
          !error.response?.data?.errors?.password &&
          !error.response?.data?.errors?.confirmPassword
        ) {
          notify("An unexpected error occurred. Please try again.", "error");
        }
      }
    }
  };

  // Watch password fields for matching validation
  const password = watch("password");

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100">
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col py-16 gap-8 w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl">
        <div className="flex flex-row gap-3 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Signup to MindSpring
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="grow"
            />
          </label>
          {errors.name && <p className="text-error">{errors.name.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow outline-none"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </label>
          {errors.email && <p className="text-error">{errors.email.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
               type="password"
               className="grow outline-none"
               placeholder="Password"
               {...register("password", {
                 required: "Password is required",
                 pattern: {
                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                   message:
                     "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.",
                 },
               })}
            />
          </label>
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
               type="password"
               className="grow outline-none"
               placeholder="Confirm Password"
               {...register("confirmPassword", 
                {
                   validate: (value) => value === password || "Passwords do not match"
                }
               )}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-error">{errors.confirmPassword.message}</p>
          )}

          <input type="submit" value="Signup" className="btn btn-primary" />
        </form>
        <p className="text-center">
          Already have an Account?{" "}
          <Link to={"/user/login"} className="link link-primary">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPageUser;
