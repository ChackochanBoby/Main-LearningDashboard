import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios"

function UpdateThumbnailForm({ courseId }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const [submitState, setSubmitState] = useState(null); // State to track submission status
  const selectedFile = watch("thumbnail");
  
  // Construct the URL for the API request
  const submitUrl = `/courses/${courseId}/update-thumbnail`;

  const onSubmit = async (data) => {
    const file = data.thumbnail[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("thumbnail", file);

    setSubmitState("loading");

    try {
      const response = await axiosInstance.put(submitUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Upload Success:", response.data);
      setSubmitState("success"); // Set success state after successful upload
    } catch (error) {
      console.error("Upload Error:", error);
      setSubmitState("error"); // Set error state if upload fails
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 p-4 bg-base-100 rounded shadow"
    >
      <div className="w-full">
        <label className="block text-base-content mb-2">Upload Course Thumbnail</label>
        <input 
          type="file" 
          accept="image/*" 
          {...register("thumbnail", { required: "File is required" })} 
          className="file-input file-input-bordered w-full max-w-xs" 
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
        )}
      </div>
      {selectedFile?.[0] && (
        <div className="w-24 h-24">
          <img
            src={URL.createObjectURL(selectedFile[0])}
            alt="Thumbnail Preview"
            className="w-full h-full rounded object-cover"
          />
        </div>
      )}
      <button
        type="submit"
        className="btn btn-primary"
      >
        Upload Thumbnail
      </button>

      {/* Displaying status messages based on submitState */}
      {submitState === "loading" && (
        <p className="mt-4 text-yellow-500">Uploading...</p>
      )}
      {submitState === "success" && (
        <p className="mt-4 text-green-500">Upload successful!</p>
      )}
      {submitState === "error" && (
        <p className="mt-4 text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export default UpdateThumbnailForm;
