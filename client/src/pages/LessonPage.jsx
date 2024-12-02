import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useLoaderData } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const LessonPage = () => {
  const { lesson, error } = useLoaderData();
  const [lessonContent, setLessonContent] = useState(null);
  const { contentType, content,title } = lesson;
  const lessonId = lesson._id
  useEffect(() => {
    if (contentType === "video") {
      setLessonContent(content);
    } else {
      const parsedlesson = JSON.parse(content);
      setLessonContent(parsedlesson);
    }
  }, [content, contentType]);

  if (error) {
    return <div>{error}</div>;
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
            <div className="mx-auto w-full max-w-screen-md aspect-video"><VideoPlayer videoUrl={lessonContent} /></div>
          </div>
          )}
      </section>
    </main>
  );
};

export default LessonPage;
