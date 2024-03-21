import React from "react";
import Homepage from "../../Pages/Homepage";

const EmployerDash = () => {
  const name = localStorage.getItem("name");
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   // If token doesn't exist, you may want to handle unauthorized access, 
  //   // such as redirecting to the login page or displaying an error message
  //   return <div>You are not authorized to view this page. Please log in.</div>;
  // }
  return (
    <div>
      <Homepage /> 
      {name && <h3>Welcome, {name} to the Employer panel!</h3>}
    </div>
  );
};

export default EmployerDash;
