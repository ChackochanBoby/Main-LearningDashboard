import { useState } from "react";
import TextEditor from "../components/TextEditor";
import axiosInstance from "../config/axios";
import { useForm } from "react-hook-form"

const AddLessonPage = () => {
  const {
    register,
    handleSubmit,
  } = useForm()

  const moduleId= "67487a077179e3e987af3f9b"
  const [contentType, setContentType] = useState("text");
  const [videoFile, setVideoFile] = useState(null);
  const [editorData, setEditorData] = useState({});
  const [loading,setLoading]=useState(false)

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSaveLesson = async (data) => {
    const formData=new FormData()

    formData.append("title", data.title);
    formData.append("contentType", contentType);

    if(contentType==="text"){
      formData.append("textContent",JSON.stringify(editorData))
    }
    else{
      formData.append("videoContent",videoFile)
    }

    try {
      setLoading(true)
      const response = await axiosInstance.post(`/lessons/create/${moduleId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    console.log("Lesson created successfully:", response.data.data);
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }

  }


  return (
    <main>
      <section className="xl:container p-8 mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Add New Lesson</h2>
        <form onSubmit={handleSubmit(handleSaveLesson)} className="w-ful flex flex-col items-start gap-4 enctype=”multipart/form-data”">
          <fieldset className="flex py-2 flex-col md:flex-row items-center md:justify-center gap-4 w-full">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Lesson Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Lesson Type</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                value={contentType}
                onChange={handleContentTypeChange}
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="w-full form-control py-2 flex flex-col items-center">
            <label className="label mx-auto mb-4">
              <span className="label-text">Lesson Content</span>
            </label>
            {contentType === "video" ? (
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
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