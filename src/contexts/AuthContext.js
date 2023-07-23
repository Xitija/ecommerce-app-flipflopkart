import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  const [userAuth, setUserAuth] = useState({
    loggedInUser: user,
    isLoggedIn: token ? true : false,
  });

  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    console.log(email, password);
    try {
      const passValue = JSON.stringify({
        email: email,
        password: password,
      });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: passValue,
      });

      const data = await response.json();

      console.log(data, "dt");
      if (response.status === 200) {
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", JSON.stringify(data.foundUser));
        setUserAuth((prevAuth) => ({
          ...prevAuth,
          loggedInUser: data.foundUser,
          isLoggedIn: true,
        }));
        toast.success("Login Successful!");
        navigate(location ? location : "/products");
      } else {
        console.log(data.errors[0]);
        throw new Error(JSON.stringify(data.errors[0]));
      }
    } catch (e) {
      toast.error(JSON.parse(e.message));
      console.error(e);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserAuth((prevAuth) => ({
      ...prevAuth,
      loggedInUser: {},
      isLoggedIn: false,
    }));
    toast.success("Logged Out Successfully!");
    navigate("/");
  };

  const value = {
    loginUser,
    userAuth,
    logoutUser
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);
