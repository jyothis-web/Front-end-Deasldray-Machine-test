import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const employerAuth = createContext();

const Context = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const navigate = useNavigate();

  //for authdetails
  useEffect(() => {
    // Set initial auth state when component mounts
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  
  // Fetch user details
  const fetchUser = async () => {
    try {
      const response = auth;
      const user = response.data.user;
      console.log("user", user);
      setAuth({
        ...auth,
        user,
      });
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  //for logout
  const Handlelogout = () => {
    console.log(localStorage.getItem("auth"));
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      console.log("sucessfully logout");
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("comment");
      localStorage.removeItem("avatarUrl");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <employerAuth.Provider
        value={{
          auth,
          setAuth,
          Handlelogout,
          fetchUser,
        }}
      >
        {children}
      </employerAuth.Provider>
    </div>
  );
};

export default Context;
