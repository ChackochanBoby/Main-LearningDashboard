import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, directTo }) => {
  const navigate = useNavigate();
  const actions=["detail","content"]
  if(!actions.includes(directTo)){
    directTo="detail"
  }
  const cardAction = () => {
    let navigateUrl = `/user/courses/${course.id}`;
    if (directTo === "content") {
      navigateUrl += "/course-dashboard";
    }
    navigate(navigateUrl);
  };

  return (
    <article 
      className="card w-full max-w-sm bg-base-200 text-base-content shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 rounded-lg overflow-hidden cursor-pointer"
      onClick={cardAction}
    >
      {/* Image Section */}
      <figure className="h-48 bg-gray-200">
        <img 
          src={course.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"} 
          alt={course.title || "Course Thumbnail"} 
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold text-base-content capitalize">
          {course.title}
        </h2>
        <p className="mt-2 text-base-content">
          Instructor: <span className="font-medium">{course.instructor?.name || "Unknown"}</span>
        </p>
      </div>
    </article>
  );
};

export default CourseCard;
