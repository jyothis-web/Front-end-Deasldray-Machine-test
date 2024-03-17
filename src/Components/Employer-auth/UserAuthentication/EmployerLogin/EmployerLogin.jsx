import React, {  useState } from 'react'
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
   //const { auth, setAuth } = useContext(employerAuth);

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
      localStorage.setItem("token", token);
      localStorage.setItem("name", name );

      navigate("/EmployerDashboard");
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
            type="text"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
