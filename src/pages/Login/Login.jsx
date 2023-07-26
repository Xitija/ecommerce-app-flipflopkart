import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useAuth } from "../../contexts/AuthContext";

import "./Login.css";

export const Login = () => {
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const loginHandler = (e, guest) => {
    e.preventDefault();
    if (guest) {
      loginUser("adarshbalika@gmail.com", "adarshbalika");
    } else {
      loginUser(loginCredentials.email, loginCredentials.password);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="form">
        {/* onSubmit={(e) => loginHandler(e)}> */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <label htmlFor="email">Password</label>
        <div className="password-container">
          <input
            id="password"
            placeholder="Shh..."
            type={showPassword ? "text" : "password"}
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>
        <button type="submit" onClick={loginHandler}>
          Login
        </button>
        <button
          className="guest-login"
          type="submit"
          onClick={(e) => loginHandler(e, true)}
        >
          Guest Login
        </button>
      </form>
      <NavLink className="signup-link" to="/signup">
        Create New Account{" "}
      </NavLink>
      {/* <p>Create New Account</p> */}
    </div>
  );
};
