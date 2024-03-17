
import { Button } from 'antd';
import axios from 'axios';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';


const DeleteEmployee = ({id}) => {

    const handleDelete = async () => {
        try {
          const response = await axios.delete(`http://localhost:8080/employerDashboard/deleteEmployee/${id}`);
          console.log(response.data);
          toast.success(response.data.message);
          // Handle success message or any other action upon successful deletion
        } catch (error) {
          console.error("Error deleting employee:", error);
          // Handle error message or any other action upon failure
        }
      };
  return (
    <div>  <Toaster position="top-center" />  <Button onClick={handleDelete}>
    Delete 
  </Button></div>
  )
}

export default DeleteEmployee