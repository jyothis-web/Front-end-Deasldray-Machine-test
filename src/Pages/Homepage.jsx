import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import EmployerLogout from '../Components/Employer-auth/UserAuthentication/EmployerLogout/EmployerLogout'

const Homepage = () => {
    const name = localStorage.getItem("name");
  return (
    <div><div style={{display:"flex",justifyContent:"space-evenly"}}>
    <div>
      {" "}
      <Link to="/EmployerDashboard">
        {" "}
        <Button variant="contained"> Home</Button>
      </Link>
    </div>
    <div>
      {" "}
      <Link to="/CreateEmployer">
        {" "}
        <Button variant="contained"> create employer</Button>
      </Link>
    </div>

    <div>
      {" "}
      <Link to="/GetEmployerList">
        {" "}
        <Button variant="contained"> employee list</Button>
      </Link>
    </div>
    <div>{name}</div>
    <div>
      {" "}
      <EmployerLogout />
    </div>
  </div></div>
  )
}

export default Homepage