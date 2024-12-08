import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path as needed
import { useLocation } from "react-router-dom";

function UpdateProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Import the reset function from useForm
  } = useForm();

  const location = useLocation();
  const [submitState, setSubmitState] = useState(null); // State to track submission status

  useEffect(() => {
    let url = location.pathname.startsWith("/user")
      ? "/users/profile"
      : "/admins/profile";
    axiosInstance
      .get(url)
      .then((response) => {
        console.log(response);
        // Use reset to update default values dynamically
        reset({
          name: response.data.data.name,
          bio: response.data.data.bio,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.pathname, reset]); // Include reset in dependency array

  const submitUrl = location.pathname.startsWith("/user")
    ? "/users/update-profile"
    : "/admins/update-profile";

  const onSubmit = async (data) => {
    setSubmitState("loading");

    try {
      const response = await axiosInstance.put(submitUrl, data);
      console.log("Update Success:", response.data);
      setSubmitState("success"); // Set success state after successful update
    } catch (error) {
      console.error("Update Error:", error);
      setSubmitState("error"); // Set error state if update fails
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 p-4 bg-base-100 rounded shadow"
    >
      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Name</label>
        </div>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Bio</label>
        </div>
        <textarea
          {...register("bio", { required: "Bio is required" })}
          className="textarea textarea-ghost w-full"
          placeholder="Bio"
        ></textarea>
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Details
      </button>

      {/* Displaying status messages based on submitState */}
      {submitState === "loading" && (
        <p className="mt-4 text-yellow-500">Updating...</p>
      )}
      {submitState === "success" && (
        <p className="mt-4 text-green-500">Update successful!</p>
      )}
      {submitState === "error" && (
        <p className="mt-4 text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default UpdateProfileForm;
