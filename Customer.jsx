import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addpost } from './rtk/addSlice';
import './Customer.css'

import { useAddNewPostMutation } from "./rtk/AddSlice";



const Form = () => {
  const [formData, setFormData] = useState({ courseName: "", semester: [] });
  const [semesterField, setSemesterField] = useState([
    {
      sem: 0,
      subject: [{ subjectName: "" }],
    },
  ]);
 const [addNewPost] = useAddNewPostMutation();
  const addSemester = () => {
    const newSemesterField = {
      sem: 0,
      subject: [{ subjectName: "" }],
    };
    setSemesterField([...semesterField, newSemesterField]);
  };

  const addSubjects = (index) => {
    const newSubjectField = { subjectName: "" };
    const data = [...semesterField];
    data[index].subject = [...data[index].subject, newSubjectField];
    setSemesterField(data);

    setFormData({
      ...formData,
      semester: data.map((sem) => ({
        sem: sem.sem,
        subject: sem.subject.map((sub) => ({
          subjectName: sub.subjectName,
        })),
      })),
    });
  };

  const handleSemesterChange = (index, e) => {
    let data = [...semesterField];
    data[index][e.target.name] = e.target.value;
    setSemesterField(data);

    setFormData({
      ...formData,
      semester: data.map((sem) => ({
        sem: sem.sem,
        subject: sem.subject.map((sub) => ({
          subjectName: sub.subjectName,
        })),
      })),
    });
  };

  const handleSubjectChange = (index1, index2, e) => {
    let data = [...semesterField];
    data[index1].subject[index2][e.target.name] = e.target.value;
    setSemesterField(data);

    setFormData({
      ...formData,
      semester: data.map((sem) => ({
        sem: sem.sem,
        subject: sem.subject.map((sub) => ({
          subjectName: sub.subjectName,
        })),
      })),
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const courseName = e.target.elements.courseName.value;
    const updatedFormData = {
      ...formData,
      courseName,
      "userID" : 8,
      "user_Id": 8,
    };
    await addNewPost(updatedFormData).unwrap();
    // console.log("formData2===",updatedFormData);
  
    setFormData({ courseName: "", semester: [] });
    setSemesterField([
      {
        sem: 0,
        subject: [{subjectName: "" }],
      },
    ]);
  };



  return (
   
      <div>
      {/* <div style="display: flex; flex-direction: column;"> */}
        
        <div>
          <h1>Get details</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Course Name:
              <input
                type="text"
                name="courseName"
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
              />
            </label>
          </div>

          {semesterField.map((semester, index1) => (
            <div className="semester" key={index1}>
              <label>
                Semester No:
                <input
                  type="number"
                  name="sem"
                  value={semester.sem}
                  onChange={(e) => handleSemesterChange(index1, e)}
                />
              </label>
              {semester.subject.map((sub, index2) => (
                <div key={index2}>
                  <label>
                    Subject Name:
                    <input
                      className="subject"
                      type="text"
                      name="subjectName"
                      value={sub.subjectName}
                      onChange={(e) => handleSubjectChange(index1, index2, e)}
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={() => addSubjects(index1)}>
                Add more subjects
              </button>
            </div>
          ))}
          <button type="button" onClick={addSemester}>
            Add more semester
          </button>

          <button type="submit">Submit</button>
        </form>
      </div>
    // </div>
  );
};

export default Form;
