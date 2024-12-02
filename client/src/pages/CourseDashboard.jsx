import ModuleAccordion from "../components/ModuleAccordion";
import { useLoaderData } from "react-router-dom";

const CourseDashboard = () => {
  const {courseContent,error} = useLoaderData()
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <section
        id="title-and-progress"
        className="xl:container p-8 mx-auto flex flex-col items-center"
      >
        <h1 className="text-center text-5xl font-bold">{courseContent.title}</h1>
        <progress
          className="progress progress-secondary w-4/6 my-8"
          value="70"
          max="100"
        />
      </section>
      <section id="Modules" className="xl:container mx-auto p-8">
        <h2 className="text-3xl capitalize text-center">Modules</h2>
        <div className="w-full md:w-10/12 flex flex-col gap-4 mt-8 mx-auto">
        {courseContent.modules.map((module,index)=><ModuleAccordion key={index} module={module}/>)}
        
        </div>
      </section>
    </main>
  );
};

export default CourseDashboard;
