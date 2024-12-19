import { useNavigate } from 'react-router-dom';

const UserCard = ({ id, name, email, role, profileImg }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (role === 'learner') {
      navigate(`/admin/users/learners/${id}`);
    } else if (role === 'instructor') {
      navigate(`/admin/users/instructors/${id}`);
    } else {
      navigate(`/user/${id}`);
    }
  };

  return (
    <article
      className="w-full bg-base-100 hover:bg-base-300 transition-colors duration-300 rounded-md shadow-md p-4 cursor-pointer flex items-center gap-4"
      onClick={handleClick}
    >
      {profileImg && (
        <img
          src={profileImg}
          alt={`${name}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
      <div>
        <h2 className="text-lg font-bold text-base-content">{name}</h2>
        <p className="text-sm text-base-content">{email}</p>
        {role && <p className="text-sm text-base-content italic">{role}</p>}
      </div>
    </article>
  );
};

export default UserCard;