import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import axiosInstance from "../config/axios";

const LessonPage = () => {
  const { lesson, error } = useLoaderData();
  const [lessonContent, setLessonContent] = useState(null);
  const [lessonIsCompleted, setIsCompleted] = useState(false);

  const { contentType, content, title } = lesson;
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch lesson progress
  useEffect(() => {
    axiosInstance
      .get(`/progress/${lesson.course}/${lesson._id}/lesson-progress`)
      .then(response => {
        setIsCompleted(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching progress:", error);
      });
  }, [lesson.course, lesson.module, lesson._id]);

  // Mark lesson as completed
  const markAsCompleted = async () => {
    try {
      await axiosInstance.put(`/progress/${lesson.course}/${lesson.module}/${lesson._id}`);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  // Parse lesson content
  useEffect(() => {
    if (contentType === "video") {
      setLessonContent(content);
    } else {
      try {
        const parsedLesson = JSON.parse(content);
        setLessonContent(parsedLesson);
      } catch (error) {
        console.error("Error parsing lesson content:", error);
      }
    }
  }, [content, contentType]);

  // Handle lesson deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/lessons/${lesson._id}`);
        navigate(-1);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // Determine user role route
  const isAdminRoute = location.pathname.includes("/admin");
  const isInstructorRoute = location.pathname.includes("/instructor");
  const rolePath = isAdminRoute ? "admin" : "instructor";

  if (error) {
    return <span className="block my-10 text-3xl w-full text-center">{error}</span>;
  }

  return (
    <main>
      <section id="lesson-content" className="xl:container mx-auto">
        {contentType === "text" ? (
          <div className="lesson-container">
            {lessonContent?.blocks?.length > 0 ? (
              lessonContent.blocks.map((block, index) => {
                const Tag = block.type === "header" ? `h${block.data.level || 2}` : "p";
                return (
                  <Tag key={index}>
                    {parse(DOMPurify.sanitize(block.data.text))}
                  </Tag>
                );
              })
            ) : (
              <p>Loading or no content available.</p>
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

        {(isAdminRoute || isInstructorRoute) ? (
          <div className="flex justify-center p-4">
            <Link
              to={`/${rolePath}/lesson/${lesson._id}/update`}
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
        ) : (
          <div className="w-full flex justify-center pb-4">
            <button
            onClick={markAsCompleted}
            disabled={lessonIsCompleted}
            className={`btn ${lessonIsCompleted ? "btn-secondary" : "btn-success"}`}
          >
            {lessonIsCompleted ? "Completed" : "Mark as completed"}
          </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default LessonPage;
