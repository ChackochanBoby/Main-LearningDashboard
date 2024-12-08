import { useState } from "react";
import TextEditor from "../components/TextEditor";
import axiosInstance from "../config/axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const AddLessonPage = () => {
  const { register, handleSubmit } = useForm();
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [contentType, setContentType] = useState("text");
  const [videoFile, setVideoFile] = useState(null);
  const [editorData, setEditorData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSaveLesson = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("contentType", contentType);

    if (contentType === "text") {
      formData.append("textContent", JSON.stringify(editorData));
    } else {
      formData.append("videoContent", videoFile);
    }

    try {
      setLoading(true);
      setErrorMessage(""); // Clear previous errors
      const response = await axiosInstance.post(
        `/lessons/create/${moduleId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createdLesson = response.data.data;

      // Navigate to the new lesson page upon success
      navigate(`/instructor/lesson/${createdLesson._id}`);
    } catch (error) {
      console.error("Error creating lesson:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while creating the lesson."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full md:col-span-1 col-span-2 pb-6">
      <section className="xl:container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center">Add New Lesson</h2>

        {/* Show error message if it exists */}
        {errorMessage && (
          <div className="alert alert-error shadow-lg mb-6">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSaveLesson)}
          className="w-full flex flex-col gap-6 items-center"
        >
          <fieldset className="flex flex-col md:flex-row gap-6 justify-between items-center w-full md:max-w-4xl">
            <div className="form-control w-full sm:max-w-xs md:max-w-none">
              <label className="label">
                <span className="label-text">Lesson Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full sm:max-w-xs md:max-w-none">
              <label className="label">
                <span className="label-text">Lesson Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={contentType}
                onChange={handleContentTypeChange}
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="w-full form-control py-4 flex flex-col items-center">
            <label className="label mx-auto mb-4">
              <span className="label-text">Lesson Content</span>
            </label>
            {contentType === "video" ? (
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="file-input file-input-bordered w-full sm:max-w-xs"
              />
            ) : (
              <TextEditor onSave={setEditorData} />
            )}
          </fieldset>

          {loading ? (
            <div className="flex justify-center items-center w-full">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <input
              value="Create"
              type="submit"
              className="btn btn-success text-white mx-auto"
            />
          )}
        </form>
      </section>
    </main>
  );
};

export default AddLessonPage;
