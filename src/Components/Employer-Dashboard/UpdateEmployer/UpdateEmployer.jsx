import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radio } from "antd";
import { MenuItem, Select, Checkbox, FormControlLabel } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateEmployer = () => {
  const { id } = useParams();
//   const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    gender: "",
    designation: "",
    course: [],
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
//  console.log(formData);
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/employerDashboard/getSingleEmployee/${id}`
        );
        // setEmployee(response.data);
        console.log(response.data.existingEmployee);
        setFormData({
          name: response.data.existingEmployee.name ,
          email: response.data.existingEmployee.email || "",
          mobileNo: response.data.existingEmployee.mobileNo || "",
          gender: response.data.existingEmployee.gender || "",
          designation: response.data.existingEmployee.designation || "",
          course: response.data.existingEmployee.course || [],
          image: null,
        });
        if (response.data.image && response.data.image.imagePath) {
          setPreviewImage(
            `http://localhost:8080/${response.data.image.imagePath}`
          );
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  const handleCourseChange = (e, courseValue) => {
    const { checked } = e.target;
    if (checked) {
      setFormData({ ...formData, course: [...formData.course, courseValue] });
    } else {
      setFormData({
        ...formData,
        course: formData.course.filter((course) => course !== courseValue),
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleMobileNoChange = (e) => {
    setFormData({ ...formData, mobileNo: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleDesignationChange = (e) => {
    setFormData({ ...formData, designation: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithId = new FormData();
    formDataWithId.append("name", formData.name);
    formDataWithId.append("email", formData.email);
    formDataWithId.append("mobileNo", formData.mobileNo);
    formDataWithId.append("gender", formData.gender);
    formDataWithId.append("designation", formData.designation);
    formDataWithId.append("course", formData.course.join(", "));
    formDataWithId.append("file", formData.image);

    try {
      const response = await axios.put(
        `http://localhost:8080/employerDashboard/updateEmployee/${id}`,
        formDataWithId
      );
      console.log("Employee updated:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee.");
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      <h2 style={{ textAlign: "start" }}>Update Employee</h2>
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
              value={formData.name}
              onChange={handleNameChange}
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
              value={formData.email}
              onChange={handleEmailChange}
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
              value={formData.mobileNo}
              onChange={handleMobileNoChange}
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
              placeholder="Select"
              style={{ width: "150px" }}
              value={formData.designation}
              onChange={handleDesignationChange}
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
              value={formData.gender}
              onChange={handleGenderChange}
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
                    checked={formData.course.includes("MCA")}
                    onChange={(e) => handleCourseChange(e, "MCA")}
                  />
                }
                label="MCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.course.includes("BCA")}
                    onChange={(e) => handleCourseChange(e, "BCA")}
                  />
                }
                label="BCA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.course.includes("BSC")}
                    onChange={(e) => handleCourseChange(e, "BSC")}
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
            Upload image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
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
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployer;
