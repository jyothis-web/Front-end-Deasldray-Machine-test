import React, { useState } from "react";
import axios from "axios";
import { Radio } from "antd";
import { MenuItem, Select, Checkbox, FormControlLabel } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const CreateEmployer = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [course, setCourse] = useState([]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileNoChange = (e) => {
    setMobileNo(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    const isChecked = course.includes(value);
    if (isChecked) {
      setCourse(course.filter((c) => c !== value));
    } else {
      setCourse([...course, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("gender", gender);
    formData.append("designation", designation);
    course.forEach((c) => formData.append("course", c));

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.error("Token is missing");
        // Handle authentication issues, e.g., redirect to login
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/employerDashboard/createEmployer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Error occurred while sending the request.");
      }
    }
  };

  return (
    <div>
      {" "}
      <Toaster position="top-center" />
      <h2 style={{ textAlign: "start" }}>Create New Employer</h2>
      <div style={{ marginLeft: "30px", maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span">Name:</span>
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              style={{ width: "100%" }}
            />
          </label>

          <br />
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span">Email:</span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ width: "100%" }}
            />
          </label>
          <br />
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span"> Mobile No:</span>

            <input
              placeholder="Mobile Number"
              type="tel"
              value={mobileNo}
              onChange={handleMobileNoChange}
              required
              style={{ width: "100%" }}
            />
          </label>
          <br />

          <label
            style={{
              marginBottom: "25px",

              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span"> Designation:</span>
            <Select
              placeholder="select"
              style={{ width: "150px" }}
              value={designation}
              onChange={handleDesignationChange}
              required
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </label>
          <br />
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span">Gender:</span>
            <Radio.Group
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              required
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </label>
          <br />
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="span"> Course:</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={course.includes("MCA")}
                    onChange={(e) => handleCourseChange(e, "MCA")}
                    value="MCA"
                  />
                }
                label="MCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={course.includes("BCA")}
                    onChange={(e) => handleCourseChange(e, "BCA")}
                    value="BCA"
                  />
                }
                label="BCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={course.includes("BSC")}
                    onChange={(e) => handleCourseChange(e, "BSC")}
                    value="BSC"
                  />
                }
                label="BSC"
              />
            </div>
          </label>
          <br />
          <label
            style={{
              marginBottom: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            upload image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            />
          </label>
          {previewImage && (
            <div>
              <p>Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
          <br />
          <button className="authbtn" type="submit">
            Create new user
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployer;
