import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link} from "react-router-dom";
import { Button } from "antd";
import Homepage from "../../../Pages/Homepage";
import DeleteEmployee from "../DeleteEmployee/Deleteemployee";

const GetAllEmployerList = () => {
  const [employerList, setEmployerList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const { id } = useParams();
  useEffect(() => {
    const fetchEmployerList = async () => {
      try {      
        const response = await axios.get(
          `http://localhost:8080/employerDashboard/GetAllEmployerList`,
          {
          
          }
        );
        setEmployerList(response.data.employerList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employer list:", error);
        setError("Failed to fetch employer list");
        setLoading(false);
      }
    };

    fetchEmployerList();
  }, []);
  const filteredEmployers = employerList.filter((employer) =>
    employer.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Homepage />
      <h2>Employer List</h2>
      <TextField
        label="Search name"
        variant="outlined"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Created date</TableCell>
              <TableCell>image</TableCell>
              <TableCell>update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployers.map((employer) => (
              <TableRow key={employer._id}>
                <TableCell>{employer.name}</TableCell>
                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.mobileNo}</TableCell>
                <TableCell>{employer.designation}</TableCell>
                <TableCell>{employer.gender}</TableCell>
                <TableCell>{employer.course.join(", ")}</TableCell>
                <TableCell>{employer.created_time}</TableCell>
                <TableCell>
                  {employer.image && (
                    <img
                      src={`http://localhost:8080/${employer.image.imagePath}`}
                      alt={employer.name}
                      style={{ width: "70px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {" "}
                  <Link to={`/UpdateJobs/${employer._id}`}>
                    <Button>update</Button>{" "}
                  </Link>
                </TableCell>
                <TableCell>
                  {" "}
                  <DeleteEmployee id={employer._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetAllEmployerList;
