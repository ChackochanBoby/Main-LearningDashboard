import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path as needed

function UpdateModuleForm({moduleId}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitState, setSubmitState] = useState(null); // State to track submission status

  useEffect(() => {
    if (moduleId) {
      const url = `/modules/${moduleId}/manage`; 

      axiosInstance
        .get(url)
        .then((response) => {
          console.log(response);
          // Use reset to populate the form with fetched course details
          reset({
            title: response.data.data.title,
            description: response.data.data.description,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [moduleId, reset]);
  // Function to handle form submission
  const onSubmit = async (data) => {
    setSubmitState("loading");

    try {
      const response = await axiosInstance.put(`/modules/${moduleId}/update`, data);
      console.log("Module Updated:", response.data);
      setSubmitState("success");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error Updating Module:", error);
      setSubmitState("error"); // Set error state on failure
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 p-4 bg-base-100 rounded shadow"
    >
      {/* Module Title */}
      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Title</label>
        </div>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Module Title"
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Module Description (Optional) */}
      <div className="form-control w-full">
        <div className="label">
          <label className="label-text">Description (Optional)</label>
        </div>
        <textarea
          {...register("description")}
          className="textarea textarea-ghost w-full"
          placeholder="Module Description (Optional)"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Module
      </button>

      {/* Displaying status messages based on submitState */}
      {submitState === "loading" && (
        <p className="mt-4 text-yellow-500">Updating module...</p>
      )}
      {submitState === "success" && (
        <p className="mt-4 text-green-500">Module updated successfully!</p>
      )}
      {submitState === "error" && (
        <p className="mt-4 text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default UpdateModuleForm;
