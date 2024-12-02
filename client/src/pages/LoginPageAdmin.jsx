import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';

const LoginPageAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate=useNavigate()
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/auth/admin/login", data)
      navigate("/admin/")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <main className='flex justify-center items-center'>
      <div className="flex flex-col bg-base-200 py-16 gap-8 w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 rounded-2xl shadow-xl my-16">
      <div className="flex flex-row gap-3 pb-4">
        <h1 className="text-3xl font-bold my-auto">Login to MindSpring (admin)</h1>
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register('email', { required: 'Email is required' })}
            />
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </label>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input type="submit" value="Login" className="btn btn-primary" />
        </form>

        {/* <div className="w-full flex flex-row items-center py-2 before:content-[''] before:w-full before:h-[2px] before:bg-neutral after:content-[''] after:w-full after:h-[2px] after:bg-neutral">
          <span className="px-1">OR</span>
        </div> */}

        <p className="text-center">
          Don&apos;t have an Account? <Link to="/admin/signup" className="link link-primary">SignUp</Link>
        </p>
      </div>
    </div>
    </main>
  );
};

export default LoginPageAdmin;
