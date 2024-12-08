import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path as needed

function CreateCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitState, setSubmitState] = useState(null); // State to track submission status

  const onSubmit = async (data) => {
    setSubmitState("loading");

    try {
      const response = await axiosInstance.post("/courses/create", data);
      console.log("Course Created:", response.data);
      setSubmitState("success");
      reset();
    } catch (error) {
      console.error("Error Creating Course:", error);
      setSubmitState("error"); // Set error state
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 p-4 bg-base-100 rounded shadow"
    >
      {/* Course Title */}
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

      {/* Course Description */}
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

      {/* Course Price */}
      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Price</label>
        </div>
        <input
          type="number"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
            min: { value: 0, message: "Price must be a positive number" },
          })}
          placeholder="Course Price"
          className="input input-bordered w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Course
      </button>

      {/* Displaying status messages based on submitState */}
      {submitState === "loading" && (
        <p className="mt-4 text-yellow-500">Creating course...</p>
      )}
      {submitState === "success" && (
        <p className="mt-4 text-green-500">Course created successfully!</p>
      )}
      {submitState === "error" && (
        <p className="mt-4 text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default CreateCourseForm;
