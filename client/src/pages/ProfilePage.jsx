import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal";
import UpdateProfileImageForm from "../components/UpdateProfileImg";
import UpdateProfileForm from "../components/UpdateProfileForm";

function ProfilePage() {
  const { profile, error } = useLoaderData();
  const [isUpdateImageModal, setUpdateImageModal] = useState(false);
  const [isUpdateProfileModal, setUpdateProfileModal] = useState(false);

  const openUpdateImageModal = () => {
    setUpdateImageModal(true);
  };
  const openUpdateProfileModal = () => {
    setUpdateProfileModal(true);
  };

  if (error) {
    return <div className="text-error">{error}</div>;
  }
  return (
    <main className="py-12">
      <section className="xl:container h-full mx-auto flex flex-col items-center justify-center">
        {/* Profile Image */}
        <div className="mb-6 flex flex-col justify-center items-center">
          <img
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-center"
            src={profile.profileImg || "https://via.placeholder.com/150"}
            alt="Profile image"
          />
          <button
            onClick={openUpdateImageModal}
            className="btn btn-primary mt-4"
          >
            Update Image
          </button>
          <Modal isOpen={isUpdateImageModal} modalControl={setUpdateImageModal}>
            <UpdateProfileImageForm />
          </Modal>
        </div>

        <div className="text-center px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-4xl font-bold text-base-content mb-2">
            {profile.name || "Unnamed User"}
          </h2>
          <p className="text-base-content text-sm md:text-md capitalize mb-1">
            {profile.role || "Learner"}
          </p>
          <p className="text-base-content text-md mb-4">
            {profile.email || "Email unavailable"}
          </p>
          <p className="mt-4 text-base-content text-pretty text-justify md:text-center text-base">
            {profile.bio || "No bio available"}
          </p>
          <button
            onClick={openUpdateProfileModal}
            className="my-4 btn btn-primary"
          >
            Update Profile Details
          </button>
          <Modal
            isOpen={isUpdateProfileModal}
            modalControl={setUpdateProfileModal}
          >
            <UpdateProfileForm />
          </Modal>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
