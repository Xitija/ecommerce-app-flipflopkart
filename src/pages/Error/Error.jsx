import { NavLink } from "react-router-dom";

import "./Error.css"
import {errorimg} from "../../assets/pictures";

export const Error = () => {
  return (
    <div>
      <NavLink to="/products">
        <img
          className="img_error"
          src={errorimg}
          alt="Page_not_found"
        />
      </NavLink>
    </div>
  );
};
