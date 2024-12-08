import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

const AdminSignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate()
  const onSubmit = async (data) => {
    try {
     const response = await axiosInstance.post("/auth/admin/register", data)
     const role=response.data.data.role
      navigate(`/${role}`)
    } catch (error) {
      console.log(error)
    }
    
  };

  // Watch password fields for matching validation
  const password = watch("password");

  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100">
  <div className="flex flex-col py-16 gap-8 w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl">
    <div className="flex flex-row gap-3 pb-4">
      <h1 className="text-2xl md:text-3xl font-bold">Signup to MindSpring <span className="text-lg font-semibold text-base-content">Instructor</span></h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" placeholder="Name" {...register("name", { required: "Name is required" })} className="grow" />
      </label>
      {errors.name && <p className="text-error">{errors.name.message}</p>}

      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="email" placeholder="Email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })} className="grow" />
      </label>
      {errors.email && <p className="text-error">{errors.email.message}</p>}

      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
        </svg>
        <input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} className="grow" />
      </label>
      {errors.password && <p className="text-error">{errors.password.message}</p>}

      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
        </svg>
        <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { validate: (value) => value === password || "Passwords do not match" })} className="grow" />
      </label>
      {errors.confirmPassword && <p className="text-error">{errors.confirmPassword.message}</p>}

      <input type="submit" value="Signup" className="btn btn-primary" />
    </form>
    <p className="text-center">
      Already have an Account?{" "}
      <Link to={"/management/login"} className="link link-primary">
        Login
      </Link>
    </p>
  </div>
</main>

  );
};

export default AdminSignupPage;
