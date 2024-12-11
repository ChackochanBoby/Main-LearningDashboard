import { useState } from "react";
import ModuleAccordionAdmin from "../components/ModuleAccordionAdmin";
import { useLoaderData, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import CreateModuleForm from "../components/CreateModuleForm";

const CourseDashboardAdmin = () => {
  const { courseContent, error } = useLoaderData();
  const location=useLocation()
  const isInstructor= location.pathname.startsWith("/instructor")?true:false;
  const [isModalOpen,setModalOpen]=useState(false)
  
  if (error) {
    return <span className="block my-10 text-3xl w-full text-center">{error}</span>;
  }

  return (
    <main>
      <section
        id="title-and-progress"
        className="xl:container p-8 mx-auto flex flex-col items-center"
      >
        <h1 className="text-center text-5xl font-bold">{courseContent.title}</h1>
      </section>

      <section id="Modules" className="xl:container mx-auto p-8">
        <h2 className="text-3xl capitalize text-center">Modules</h2>
        <div className="w-full md:w-10/12 flex flex-col gap-4 mt-8 mx-auto">
          {courseContent.modules.map((module, index) => (
            <ModuleAccordionAdmin key={index} module={module} />
          ))}
        </div>
      </section>

      {/* Button to add a new module */}
      {isInstructor?(<section className="flex justify-center mt-8">
        <button
          onClick={() => {setModalOpen(true)
           }}
          className="btn btn-primary"
        >
          Add Module
        </button>
        <Modal isOpen={isModalOpen} modalControl={setModalOpen}>
           <CreateModuleForm courseId={courseContent._id}/>
        </Modal>
      </section>):null}
    </main>
  );
};

export default CourseDashboardAdmin;
