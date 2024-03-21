import { Route, Routes } from "react-router-dom";
import "./App.css";
import EmployerLogin from "./Components/Employer-auth/UserAuthentication/EmployerLogin/EmployerLogin";
import EmployerRegister from "./Components/Employer-auth/UserAuthentication/EmployerRegister/EmployerRegister";
import EmployerDash from "./Components/Employer-Dashboard/EmployerDash";
import CreateEmployer from "./Components/Employer-Dashboard/CreateEmployer/CreateEmployer";
import GetEmployerList from "./Components/Employer-Dashboard/GetEmployerlist/GetEmployerList";
import Homepage from "./Pages/Homepage";
import UpdateEmployer from "./Components/Employer-Dashboard/UpdateEmployer/UpdateEmployer";
import DeleteEmployee from "./Components/Employer-Dashboard/DeleteEmployee/Deleteemployee";
import GetAllEmployerList from "./Components/Employer-Dashboard/GetAllEmployerList/GetAllEmployerList";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EmployerLogin />} />
        <Route path="/EmployerRegister" element={<EmployerRegister />} />


        {token && (
          <>
            <Route path="/EmployerDashboard" element={<EmployerDash />} />
            <Route path="/CreateEmployer" element={<CreateEmployer />} />
            <Route path="/GetEmployerList" element={<GetEmployerList />} />
            <Route
              path="/GetAllEmployerList"
              element={<GetAllEmployerList />}
            />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/UpdateJobs/:id" element={<UpdateEmployer />} />
            <Route path="/DeleteEmployee/:id" element={<DeleteEmployee />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
