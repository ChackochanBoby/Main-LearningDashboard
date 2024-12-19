import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path as needed

function UpdateCourseForm({ courseId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitState, setSubmitState] = useState(null);

  useEffect(() => {
    if (courseId) {
      const url = `/courses/${courseId}/manage`;

      axiosInstance
        .get(url)
        .then((response) => {
          const course = response.data.data;
          reset({
            title: course.title,
            price: course.price,
            description: course.description,
            duration: course.duration,
          });
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [courseId, reset]);

  const onSubmit = async (data) => {
    setSubmitState("loading");

    // Convert text inputs for price and duration to numbers and validate
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      if (key === "price" || key === "duration") {
        const numericValue = parseFloat(data[key]);
        if (!isNaN(numericValue) && numericValue > 0) {
          acc[key] = numericValue;
        } else {
          setSubmitState("validation-error");
          return acc;
        }
      } else {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    if (submitState === "validation-error") return;

    const submitUrl = `/courses/${courseId}/update`;

    try {
      const response = await axiosInstance.put(submitUrl, updatedFields);
      console.log("Update Success:", response.data);
      setSubmitState("success");
    } catch (error) {
      console.error("Update Error:", error);
      setSubmitState("error");
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
          type="text"
          {...register("price", {
            required: "Price is required",
            validate: (value) =>
              !isNaN(parseFloat(value)) && parseFloat(value) > 0 || 
              "Price must be a positive number",
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
          <label className="label-text">Duration (in weeks)</label>
        </div>
        <input
          type="text"
          {...register("duration", {
            required: "Duration is required",
            validate: (value) =>
              !isNaN(parseInt(value)) && parseInt(value) > 0 || 
              "Duration must be a positive number",
          })}
          placeholder="Course Duration"
          className="input input-bordered w-full"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration.message}</p>
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
      {submitState === "validation-error" && (
        <p className="mt-4 text-red-500">
          Price and Duration must be positive numbers.
        </p>
      )}
    </form>
  );
}

export default UpdateCourseForm;
