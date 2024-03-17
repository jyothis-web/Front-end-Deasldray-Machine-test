import React from "react";
import Homepage from "../../Pages/Homepage";

const EmployerDash = () => {
  const name = localStorage.getItem("name");

  return (
    <div>
      <Homepage />
      welcome
      {name && <h3>Welcome, {name} to the Employer panel!</h3>}
    </div>
  );
};

export default EmployerDash;
