import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Admin from "./layouts/Admin.js";
import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import ChangePassword from "./views/ChangePassword.js";
//import {ReactDOM } from "react-dom";
import { createRoot } from "react-dom/client";
import Login from "./views/auth/Login.js";
import Register from "./views/auth/Register.js";
import Maps from "./views/admin/Maps.js";
import ForgotPassword from "./views/auth/ForgotPassword.js";
import ResetPassword from "./views/auth/ResetPassword.js";
import { Provider,useSelector } from "react-redux";
import { store } from "./components/rtk/store.js";
import CourseTable from "./components/course/CourseTable.js";
import ViewCourseDetail from "./components/Cards/ButtonsFunctions/ViewCourseDetail.js";
import ViewFaculty from "./components/Cards/ButtonsFunctions/ViewFaculty.js";
import ViewStudents from "./components/Cards/ButtonsFunctions/ViewStudents.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import AdminNavbar from "./components/Navbars/AdminNavbar.js";
import MigrationForm from "./components/Forms/MigrationForm.js";
import AddCourse from "./components/Forms/AddCourse.js";
import ListTeachers from "./components/Lists/ListTeachers.js";
import ListStudents from "./components/Lists/ListStudents.js";
import ListSubjectForTeacher from "./components/Lists/ListSubjectForTeacher.js";
import ListStudentSubjectWise from "./components/Lists/ListStudentSubjectWise.js";
import ListCourses from "./components/Lists/ListCourses.js";
import ViewAssignment from "./components/Lists/ViewAssignment.js";
import ViewStudentCourse from "./components/Lists/ViewStudentCourse.js";
import ViewAssignmentStudent from "./components/Lists/ViewAssignmentStudent.js";
import ViewSubjectAssignment from "./components/Lists/ViewSubjectAssignment.js";
import EditCourseForm from "./components/Forms/EditCourseForm.js";
import StudentAssignmentDetails from "./components/Lists/StudentAssignmentDetails.js";
import ViewCourseFaculty from "./components/Lists/ViewCourseFaculty.js";
import Settings from "./views/admin/Settings.js";
import CreateQuiz from "./components/Quiz/CreateQuiz.js";
import ViewAllQuizzes from "./components/Quiz/ViewAllQuizzes.js";
import ViewStudentQuizPerformance from "./components/Quiz/ViewStudentQuizPerformance.js";
import EditQuiz from "./components/Forms/EditQuiz.js";
import QuizForStudent from "./components/Lists/QuizForStudent.js";
import AddAnnouncement from "./components/Forms/AddAnnouncement.js";
import ViewSubjectQuiz from "./components/Lists/ViewSubjectQuiz.js";
import Quiz from "./components/Quiz/Quiz.js";
import ImplementingTrello from "./views/admin/ImplementingTrello.js";
import Finished from "./components/Quiz/Finished.js";

const App = () => {
  let token=useSelector((state)=>state.token.strValue)

  const routes = [
    { path: "/", element: <Admin /> },
    { path: "/profile", element: <Profile /> },
    { path: "/migrationForm", element: <MigrationForm /> },
    { path: "/addCourse", element: <AddCourse /> },
    { path: "/viewAssignment", element: <ViewAssignment /> },
    { path: "/viewTeacher", element: <ListTeachers /> },
    { path: "/viewStudent", element: <ListStudents /> },
    { path: "/viewStudentCourse", element: <ViewStudentCourse /> },
    { path: "/viewAssignmentStudent", element: <ViewAssignmentStudent /> },
    { path: "/viewCourseFaculty", element: <ViewCourseFaculty /> },
    { path: "/viewStudentUnderTeacher", element: <ListSubjectForTeacher /> },
    { path: "/viewStudentUnderTeacher/:subject", element: <ListStudentSubjectWise/> },
    { path: "/viewStudentUnderTeacher/:subject/:studentId", element: <StudentAssignmentDetails/> },
    { path: "/viewSubjectAssignment/:subject", element: <ViewSubjectAssignment/> },
    { path: "/viewSubjectQuiz/:subject", element: <ViewSubjectQuiz/> },
    { path: "/course/viewCourseDetail/:course_Id",element: <ViewCourseDetail /> },
    { path: "/courseDetail/editCourse/:courseId", element: <EditCourseForm />,},
    { path: "/course/viewFaculty/:courseId",element: <ViewFaculty />},
    { path: "/course/viewStudents/:courseId", element: <ViewStudents />},    
    { path: "/admin/maps", element: <Maps /> },
    { path: "/course", element: <CourseTable /> },
    { path: "/courseDetail", element: <ListCourses /> },
    { path: "/settings", element: <Settings /> },
    { path: "/change_password", element: <ChangePassword /> },
    { path: "/makeQuiz", element: <CreateQuiz/> },
    { path: "/viewAllQuizzes/edit/:quizId",element: <EditQuiz />},
    { path: "/viewAllQuizzes", element: <ViewAllQuizzes /> },
    { path: "/viewStudentQuizPerformance", element: <ViewStudentQuizPerformance /> },
    { path: "/viewStudentQuizzes", element: <QuizForStudent /> },
    { path: "/addAnnouncement", element: <AddAnnouncement /> },
    { path: "/quiz/:quizId", element: <Quiz/> },
    { path: "/finished", element: <Finished/> },
    { path: "/implementingTrello", element: <ImplementingTrello/> },
  ];

 
 if(!token){
    token=localStorage.getItem('token')
 }
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        {!token ? (
          <>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path= "/register" element= {<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:emailid" element={<ResetPassword />}/>
            </Routes>
          </>
        ) : (
          <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
              <AdminNavbar />

              <Routes>
                {routes?.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </div>
          </>
        )}
      </BrowserRouter>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
     <App />
    </Provider>
)