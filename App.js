import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin";
import AddUser from "./Components/AddUser";
import UsersList from "./Components/UsersList";
import AddEducation from "./Components/AddEducation";
import EditForm from "./Components/EditForm";
import Sidebar from "./Components/Sidebar";
import WelcomePage from "./Components/WelcomePage";
import Education from "./Components/Education";

const routes = [
  { path: "/", element: <WelcomePage /> },
  { path: "/courses", element: <Education /> },
  { path: "/users", element: <UsersList /> },
  { path: "/addUser", element: <AddUser /> },
  { path: "/addCourses", element: <AddEducation /> },
  { path: "/viewUser", element: <UsersList /> },
  { path: "/viewCourses", element: <Education /> },
  { path: "/addEducation", element: <AddEducation /> },
  { path: "/addEducation/edit/:courseId", element: <EditForm /> },
  // {
  //   path: "/addUser",
  //   element: (
  //     <>
  //       <AddUser />
  //       <UsersList />
  //     </>
  //   ),
  // },
  // { path: "/addEducation", element: <AddEducation /> },
  // { path: "/addEducation/edit/:courseId", element: <EditForm /> },
];

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {token ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-3" style={{ backgroundColor: "#f0f0f0" }}>
                <Sidebar />
              </div>
              <div className="col-9">
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
