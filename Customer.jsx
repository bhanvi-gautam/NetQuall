import React, { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './Customer.css'
import { useAddNewPostMutation } from "./rtk/AddSlice";
import { useNavigate } from "react-router-dom";



const Form = () => {
  let navigate = useNavigate();
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

  const removeSubject = (semesterIndex, subjectIndex) => {
    if (subjectIndex > 0) {
      const data = [...semesterField];
      data[semesterIndex].subject.splice(subjectIndex, 1);
      setSemesterField(data);
    }
  };

  const removeSemester = (semesterIndex) => {
    if (semesterIndex > 0) {
      const data = [...semesterField];
      data.splice(semesterIndex, 1);
      setSemesterField(data);
    }
  }


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseName = e.target.elements.courseName.value;
    let id= localStorage.getItem('userId');
    const updatedFormData = {
      ...formData,
      courseName,
      "userID": id,
      "user_Id": id,
    };
    await addNewPost(updatedFormData).unwrap();

    setFormData({ courseName: "", semester: [] });
    setSemesterField([
      {
        sem: 0,
        subject: [{ subjectName: "" }],
      },
    ]);
    navigate('/viewCourses');
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Get details</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name:</label>
          <input
            type="text"
            className="form-control"
            name="courseName"
            onChange={(e) =>
              setFormData({ ...formData, courseName: e.target.value })
            }
            required
          />
        </div>

        <div class="row my-3"></div>
        {semesterField.map((semester, index1) => (
          <div className="col-md-6" key={index1}>
            <label className="form-label">Semester No:</label>
            <button type="button" className="btn btn-primary  mt-2" onClick={() => addSemester()}>
              <AddIcon/>
            </button>
            <div className="d-flex">
            <input
              type="number"
              className="form-control"
              name="sem"
              value={semester.sem}
              onChange={(e) => handleSemesterChange(index1, e)}
              required
            />
            <button type="button" className="btn btn-danger mt-2 " onClick={() => removeSemester(index1)}>
             <RemoveIcon/>
            </button>
            </div>
            {semester.subject.map((sub, index2) => (
              <div className="mb-3" key={index2}>
                <label className="form-label">Subject Name:</label>
                <button type="button" className="btn btn-primary  mt-2" onClick={() => addSubjects(index1)}>
                <AddIcon/>
                </button>
                <div className="d-flex">
                <input
                  className="form-control"
                  type="text"
                  name="subjectName"
                  value={sub.subjectName}
                  onChange={(e) => handleSubjectChange(index1, index2, e)}
                  required
                />
                <button type="button" className="btn btn-danger mt-2" onClick={() => removeSubject(index1, index2)}>
                <RemoveIcon/>
                </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        <button type="submit" className="btn btn-success mt-2">Submit</button>
      </form>
    </div>


  );
};

export default Form;
