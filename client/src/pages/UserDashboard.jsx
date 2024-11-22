import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
    const userFromRedux = useSelector(state => state.user.user)
    const [user, setUser] = useState("user")
    useEffect(() => {
        setUser(userFromRedux)
    },[userFromRedux])

  return (
    <main className="bg-base-100">
      User Dashboard: {user.name}
    </main>
  );
};

export default UserDashboard;
