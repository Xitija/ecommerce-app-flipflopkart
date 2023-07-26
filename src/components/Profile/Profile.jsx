import { useAuth } from "../../contexts/AuthContext";

import "./Profile.css";

export const Profile = () => {
  const { userAuth,logoutUser } = useAuth();
  const { loggedInUser } = userAuth;

  return (
    <div className="profile-container">
      <p>
        <label className="label">Name:</label>
        {" " + loggedInUser.firstName} {loggedInUser.lastName}
      </p>
      <p>
        <label className="label">Email:</label>
        {" " + loggedInUser.email}
      </p>
      <button className="logout-btn" onClick={logoutUser}>Logout</button>
    </div>
  );
};
