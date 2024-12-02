import { useState } from "react";
import { Link } from "react-router-dom";

const ModuleAccordion = ({ module }) => {
  const {title,description,lessons}=module
  const [isOpen, toggleAccordion] = useState(false);
  const navigateUrl="/user/course-dashboard/lesson/"

  return (
    <article className="shadow-lg rounded-lg overflow-hidden bg-base-200">
      <div className=" w-full px-8 py-4 flex items-center justify-between">
        <h3 className="text-xl capitalize font-semibold">{title}</h3>
        <button
          onClick={() => toggleAccordion(!isOpen)}
          className="btn btn-info btn-sm h-full"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <div className={`w-full px-8 text-left ${isOpen ? null : "hidden"} `}>
        <p className="w-full md:w-3/4 text-pretty text-center md:text-left text-base">
        {description}
        </p>
        <ul className="w-full py-4 flex flex-col gap-4 *:bg-base-100 *:rounded-lg *:shadow-md *:p-4">
          {lessons.map((lesson,index)=><li key={index}><Link to={`${navigateUrl}${lesson._id}`}>{lesson.title}</Link></li>)}
        </ul>
      </div>
    </article>
  );
};

export default ModuleAccordion;
