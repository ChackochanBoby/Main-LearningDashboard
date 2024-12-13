import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPageUser = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const notify = (message, type = "success", callback = null) => {
    toast(message, { type, onClose: callback });
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/user/login", data);
      if (response.status === 200) {
        notify("User logged in successfully", "success", () =>
          navigate("/user/")
        );
      }
    } catch (error) {
      if (error.response?.data?.message) {
        // Server-side general error message (if any)
        notify(error.response.data.message, "error");
      } else {
        // Handle specific field errors (e.g., email or password)
        if (error.response?.data?.errors?.email) {
          setError("email", { message: error.response.data.errors.email });
        }
        if (error.response?.data?.errors?.password) {
          setError("password", {
            message: error.response.data.errors.password,
          });
        }

        // If there are any unexpected errors, notify the user
        if (
          !error.response?.data?.errors?.email &&
          !error.response?.data?.errors?.password
        ) {
          notify("An unexpected error occurred. Please try again.", "error");
        }
      }
    }
  };

  return (
    <main className="flex justify-center mt-8 md:mt-0 md:items-center md:min-h-screen bg-base-100 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col gap-y-8 w-full max-w-md mx-auto py-6 md:py-10 px-6 md:px-12 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            MindSpring Login
          </h1>
          <span className="text-lg font-semibold text-base-content">User</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <label className="input input-bordered flex items-center gap-3 px-4 py-3">
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
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <label className="input input-bordered flex items-center gap-3 px-4 py-3">
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full py-3 mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Already have an Account?{" "}
          <Link to="/user/signup" className="link link-primary underline">
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPageUser;
