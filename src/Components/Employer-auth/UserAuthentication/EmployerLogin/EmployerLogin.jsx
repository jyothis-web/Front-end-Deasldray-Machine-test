import React, { useState } from 'react'
import './EmployerLogin.css'
import { Button, Card } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
 //import { employerAuth } from '../../../../Context/AuthContext'

const EmployerLogin = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/Employerauth/login`, {
        username,
        password,
      });
      console.log(response.data);
      toast.success(response.data.message);
      const token = response.data.token;
      const name = response.data.user.username;
      console.log("token",name );
      // setAuth({
      //   ...auth,
      //   user:response.data.user ,
      // });
      localStorage.setItem("token", token);
      localStorage.setItem("name", name );

      navigate("/EmployerDashboard");
      window.location.reload()
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div><Toaster
    position="top-center"
  />
      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    
      }}
    >
      {" "}
      
      <form onSubmit={handleSubmit}>
        <Card
          className="login-card"
          sx={{
            width: "350px",
            padding: "15px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            position:"relative"
          }}
        >
          <h2>Login Page</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <div style={{cursor:"pointer",position:"absolute",right:"35px",bottom:"135px"}} onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"}
      </div>
          <button className="authbtn" type="submit">
            Log in
          </button>
          <div>
            {" "}
            Already have an account{" "}
            <Link to="/EmployerRegister">
              <Button sx={{ textTransform: "none" }}>Sign in</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
    </div>
  )
}

export default EmployerLogin
