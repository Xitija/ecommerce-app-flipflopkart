import { NavLink, Outlet } from "react-router-dom";

import "./Account.css";

export const Account = () => {

  const getActiveStyle= ({isActive}) => ({
    backgroundColor: isActive ? "white" : "#fc800b",
    color: isActive ? "#fc800b" : "white"
  })

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <nav className="nav-container">
        <NavLink className="nav-tab" style={getActiveStyle} to="/account/profile">My Profile</NavLink>
        <NavLink className="nav-tab" style={getActiveStyle} to="/account/address">My Addresses</NavLink>
        {/* <NavLink className="nav-tab" style={getActiveStyle} to="/account/orders">My Orders</NavLink> */}
      </nav>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};
