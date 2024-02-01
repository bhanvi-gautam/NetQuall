import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

const Form = ({ addData }) => {
  const [formData, setFormData] = useState({ courseName: "", semesters: [] });
  const [semesterField, setSemesterField] = useState([
    {
      semesterId: uuidv4(),
      semesterNo: "",
      subjects: [{ subjectId: uuidv4(), subjectName: "" }],
    },
  ]);

  const addSemester = () => {
    const newSemesterField = {
      semesterId: uuidv4(),
      semesterNo: "",
      subjects: [{ subjectId: uuidv4(), subjectName: "" }],
    };
    setSemesterField([...semesterField, newSemesterField]);
  };

  const addSubjects = (index) => {
    const newSubjectField = { subjectId: uuidv4(), subjectName: "" };
    const data = [...semesterField];
    data[index].subjects = [...data[index].subjects, newSubjectField];
    setSemesterField(data);

    setFormData({
      ...formData,
      semesters: data.map((semester) => ({
        semesterId: semester.semesterId,
        semesterNo: semester.semesterNo,
        subjects: semester.subjects.map((subject) => ({
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
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
      semesters: data.map((semester) => ({
        semesterNo: semester.semesterNo,
        subjects: semester.subjects.map((subject) => ({
          subjectName: subject.subjectName,
        })),
      })),
    });
  };

  const handleSubjectChange = (index1, index2, e) => {
    let data = [...semesterField];
    data[index1].subjects[index2][e.target.name] = e.target.value;
    setSemesterField(data);

    setFormData({
      ...formData,
      semesters: data.map((semester) => ({
        semesterId: semester.semesterId,
        semesterNo: semester.semesterNo,
        subjects: semester.subjects.map((subject) => ({
          subjectId: subject.subjectId,
          subjectName: subject.subjectName,
        })),
      })),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseName = e.target.elements.courseName.value;
    setFormData({
      ...formData,
      courseName,
    });

    addData(formData);

    // console.log("formdata===", formData);
    // console.log(semesterField);

    setFormData({ courseName: "", semesters: [] });
    setSemesterField([
      {
        semesterId: uuidv4(),
        semesterNo: "",
        subjects: [{ subjectId: uuidv4(), subjectName: "" }],
      },
    ]);
  };

  return (
    <>
      <div>
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
                  name="semesterNo"
                  value={semester.semesterNo}
                  onChange={(e) => handleSemesterChange(index1, e)}
                />
              </label>
              {semester.subjects.map((subject, index2) => (
                <div key={index2}>
                  <label>
                    Subject Name:
                    <input
                      className="subject"
                      type="text"
                      name="subjectName"
                      value={subject.subjectName}
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
    </>
  );
};

export default Form;
