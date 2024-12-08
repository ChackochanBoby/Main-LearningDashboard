import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path as needed

function UpdateCourseForm({ courseId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Import the reset function from useForm
  } = useForm();

  const [submitState, setSubmitState] = useState(null); // State to track submission status

  useEffect(() => {
    if (courseId) {
      const url = `/courses/${courseId}`; // Endpoint to fetch course details

      axiosInstance
        .get(url)
        .then((response) => {
          console.log(response);
          // Use reset to populate the form with fetched course details
          reset({
            title: response.data.data.title,
            price: response.data.data.price,
            description: response.data.data.description,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseId, reset]); // Include reset in dependency array

  const onSubmit = async (data) => {
    setSubmitState("loading");

    const submitUrl = `/courses/${courseId}/update`; // Endpoint to update course details

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
          <label className="label-text">Title</label>
        </div>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Course Title"
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Price</label>
        </div>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be a positive value" },
          })}
          placeholder="Course Price"
          className="input input-bordered w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Description</label>
        </div>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-ghost w-full"
          placeholder="Course Description"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Course
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

export default UpdateCourseForm;