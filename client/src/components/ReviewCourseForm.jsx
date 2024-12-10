import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"; // Adjust the import path

function ReviewCourseForm({ courseId }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitState, setSubmitState] = useState(null); // Submission state
  const [action, setAction] = useState(""); // Tracks the selected action

  // Handle form submission
  const onSubmit = async (data) => {
    if (!action) {
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");

    const payload = {
      action: action,
      feedback: action === "unpublished" ? data.feedback : null,
    };

    try {
      await axiosInstance.patch(`/admins/courses/${courseId}/review`, payload);
      setSubmitState("success");
      reset(); // Reset form on success
    } catch (error) {
      console.error("Error reviewing course:", error);
      setSubmitState("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 p-6 bg-base-100 rounded shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Review Course</h2>

      {/* Approve/Unpublish Selection */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Action</span>
        </label>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="select select-bordered"
          required
        >
          <option value="">Select an action</option>
          <option value="approved">Approve</option>
          <option value="unpublished">Unpublish</option>
        </select>
        {action === "" && (
          <p className="text-red-500 text-sm mt-1">Please select an action</p>
        )}
      </div>

      {/* Feedback (Only shown if 'Unpublish' is selected) */}
      {action === "unpublished" && (
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Feedback</span>
          </label>
          <textarea
            {...register("feedback", {
              required: "Feedback is required when unpublishing",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Provide feedback for unpublishing"
          ></textarea>
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn ${
          submitState === "loading" ? "btn-disabled" : "btn-primary"
        }`}
      >
        {submitState === "loading" ? "Submitting..." : "Submit Review"}
      </button>

      {/* Submission Feedback */}
      {submitState === "success" && (
        <p className="mt-4 text-green-500">Course reviewed successfully!</p>
      )}
      {submitState === "error" && (
        <p className="mt-4 text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default ReviewCourseForm;
