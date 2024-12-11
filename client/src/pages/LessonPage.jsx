import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import axiosInstance from "../config/axios"

const LessonPage = () => {
  const { lesson, error } = useLoaderData();
  const [lessonContent, setLessonContent] = useState(null);
  const { contentType, content, title } = lesson;
  const navigate=useNavigate()
  const location = useLocation();

  // Check if the user is an admin or instructor based on the URL
  const isAdminRoute = location.pathname.includes("/admin");
  const isInstructorRoute = location.pathname.includes("/instructor");

  useEffect(() => {
    if (contentType === "video") {
      setLessonContent(content);
    } else {
      const parsedLesson = JSON.parse(content);
      setLessonContent(parsedLesson);
    }
  }, [content, contentType]);

  

  const handleDelete =async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/lessons/${lesson._id}`)
        navigate(-1)
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (error) {
    return <span className="block my-10 text-3xl w-full text-center">{error}</span>;
  }

  return (
    <main>
      <section id="lesson-content" className="xl:container mx-auto">
        {contentType === "text" ? (
          <div className="lesson-container">
            {lessonContent &&
            lessonContent.blocks &&
            lessonContent.blocks.length > 0 ? (
              lessonContent.blocks.map((block, index) => {
                let Tag;
                switch (block.type) {
                  case "header":
                    Tag = `h${block.data.level || 2}`;
                    return (
                      <Tag key={index}>
                        {parse(DOMPurify.sanitize(block.data.text))}
                      </Tag>
                    );
                  case "paragraph":
                    return (
                      <p key={index}>
                        {parse(DOMPurify.sanitize(block.data.text))}
                      </p>
                    );
                  default:
                    return <p key={index}>Unsupported block type</p>;
                }
              })
            ) : (
              <p>Loading or no content available.</p> // Fallback content
            )}
          </div>
        ) : (
          <div className="w-full h-full">
            <h1 className="text-4xl font-extrabold text-center mb-4">{title}</h1>
            <div className="mx-auto w-full max-w-screen-md aspect-video">
              <VideoPlayer videoUrl={lessonContent} />
            </div>
          </div>
        )}

        {/* Buttons for Admin/Instructor */}
        {(isAdminRoute || isInstructorRoute)? (
          <div className="flex justify-center p-4">
            <Link
             to={`/${isAdminRoute?"admin":"instructor"}/lesson/${lesson._id}/update`}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg mx-2"
            >
              Update Lesson
            </Link>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg mx-2"
            >
              Delete Lesson
            </button>
          </div>
        ):(<button className="btn btn-success">Mark as completed</button>)}
      </section>
    </main>
  );
};

export default LessonPage;
