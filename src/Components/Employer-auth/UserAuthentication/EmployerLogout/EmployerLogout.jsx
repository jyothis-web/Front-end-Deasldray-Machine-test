import React, { useContext } from "react";
import { employerAuth } from "../../../../Context/AuthContext";

const EmployerLogout = () => {
  const { Handlelogout } = useContext(employerAuth);

  return (
    <div>
      {" "}
      <div className="margin-left">
        <button className="authbtn" onClick={Handlelogout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default EmployerLogout;
