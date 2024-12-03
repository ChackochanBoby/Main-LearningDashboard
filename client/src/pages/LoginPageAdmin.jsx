import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';

const LoginPageAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/auth/admin/login", data);
      navigate("/admin/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col bg-white gap-y-8 w-full max-w-md mx-auto py-6 md:py-10 px-6 md:px-12 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Login to MindSpring</h1>
          <span className="text-lg font-semibold text-gray-600">Admin</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <label className="input input-bordered flex items-center gap-3 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow outline-none"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
          </label>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          <label className="input input-bordered flex items-center gap-3 px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              className="grow outline-none"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </label>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          <button type="submit" className="btn btn-primary w-full py-3 mt-2">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Don&apos;t have an Account?{' '}
          <Link to="/admin/signup" className="link link-primary underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPageAdmin;
