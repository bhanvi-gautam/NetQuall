import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin.jsx";
import AddUser from "./Components/AddUser.jsx";
import UsersList from "./Components/UsersList.jsx";
import AddEducation from "./Components/AddEducation.jsx";
import EditForm from "./Components/EditForm.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import './App.css';
const App = () => {

  const token = localStorage.getItem('token');
  
  return (
    <BrowserRouter>


      {!token ? (
        <>
          <Login />
        </>
      ) : (
       
       <>
          <Navbar />
          <div className="wrapper">
          <div className="sidebar">
          <Sidebar/>
          </div>
          <div className="main-content">
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/addUser" element={<><AddUser /><UsersList/></>} />
            <Route path="/addEducation" element={<AddEducation />} />
            <Route path="/addEducation/edit/:courseId" element={<EditForm/>} />
          </Routes>
          </div>
          </div>
          </>
        
      )}

    </BrowserRouter>
  );
}

export default App

