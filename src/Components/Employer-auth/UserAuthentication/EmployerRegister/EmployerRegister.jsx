import React, { useState } from 'react'
import './EmployerRegister.css'
import { Link, useNavigate } from 'react-router-dom'
import {  Button, Card } from '@mui/material'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const EmployerRegister = () => {

    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        if (!username || !password) {
          console.log("fill all tha fields");
        } else {
          const response = await axios.post(
            `http://localhost:8080/Employerauth/register`,
            { username,  password } 
          );
          console.log(response.data);
           toast.success(response.data.message);
          setTimeout(() => {
            navigate('/');
          }, 1000);
           
        }
        // Assuming `navigate` is defined somewhere, navigate to "/UserLogin"
      } catch (error) {
        // if (error.message.statuscode === 400) {
        //   console.error(error.message);
        // }
        console.error(error.response.data.message);
       toast.error(error.response.data.message);
        // Use error.response.data.message
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
      <form onSubmit={handleSubmit}>
     
        <Card
          className="signup-card"
          sx={{
            width: "350px",
            padding: "15px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <h2>Signup Page</h2>

          <input
            type="text"
            name="name"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="authbtn">Sign up</button>

          {/* {value ? (
            <UserHomepage />
          ) : ( */}
          {/* <GoogleButton onClick={HandleGoogleSignIn}></GoogleButton> */}
          {/* )} */}

          <div>
            {" "}
            Already have an account{" "}
            <Link to="/">
              <Button sx={{ textTransform: "none" }}>log in</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
    </div>
  )
}

export default EmployerRegister
