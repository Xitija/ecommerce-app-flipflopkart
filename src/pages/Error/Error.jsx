import { NavLink } from "react-router-dom";

import "./Error.css"
import errorimg from "../../assets/errorimg.gif";

export const Error = () => {
  return (
    <div>
      <NavLink to="/products">
        <img
          className="img"
          src={errorimg}
          alt="Page_not_found"
        />
      </NavLink>
    </div>
  );
};
