import React, { useState } from "react";
import "./Education.css";

const Education = ({ info, deleteData, editBool, editData }) => {
  console.log("Education===", info);
  const [semesterNo, setSemesterNo] = useState("");
  const [editSemesterId, setEditSemesterId] = useState(null);
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [showSemester, setShowSemester] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const handleSubmit = (e, courseId, semesterId, subjectId) => {
    e.preventDefault();

    const courseNameElement = e.target.elements.courseName;
    const subjectNameElement = e.target.elements.subjectName;

    const value = courseNameElement ? courseNameElement.value : null;
    const subjectName = subjectNameElement ? subjectNameElement.value : null;
    console.log(semesterNo, courseId, semesterId, subjectId);

    if (semesterId && subjectId) {
      // subject edit
      editData(subjectName, courseId, semesterId, subjectId);
    } else if (semesterId && semesterNo) {
      // semester edit
      editData(semesterNo, courseId, semesterId);
    } else if (value) {
      // course edit
      editData(value, courseId);
    }
  };

  return (
    <div>
      <h1>Courses:</h1>
      {info?.map(
        (data) =>
          data?.id !== "" && (
            <div key={data.id}>
              <div>
                <button onClick={() => setShowSemester(!showSemester)}>
                  <p>{data.task.courseName}</p>
                  <p>{data.id}</p>
                </button>
                <button onClick={() => deleteData(data.id)}>Delete</button>
                <button onClick={() => editBool(!data.edit, data.id)}>
                  Edit
                </button>

                {data.edit && (
                  <form onSubmit={(e) => handleSubmit(e, data.id)}>
                    <input
                      type="text"
                      placeholder="course name"
                      name="courseName"
                      defaultValue={data.task.courseName}
                    />
                    <button type="submit">Update</button>
                  </form>
                )}
              </div>
              {showSemester && <h1>Semester</h1>}
              {showSemester &&
                data.task.semesters &&
                data.task.semesters.map((sem) => (
                  <div key={sem.semesterId}>
                    <button onClick={() => setShowSubject(!showSubject)}>
                      <p>{sem.semesterNo}</p>
                      <p>{sem.semesterId}</p>
                    </button>
                    <button onClick={() => deleteData(data.id, sem.semesterId)}>
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setEditSemesterId(
                          editSemesterId !== sem.semesterId
                            ? sem.semesterId
                            : null
                        )
                      }
                    >
                      Edit
                    </button>
                    {editSemesterId === sem.semesterId && (
                      <form
                        onSubmit={(e) =>
                          handleSubmit(e, data.id, sem.semesterId)
                        }
                      >
                        <h4>Semester List</h4>
                        {data.task.semesters.map((items, index) => {
                          return (
                            <div key={index}>
                              <div className="semesters">
                                Semester {index + 1}
                                <input
                                  type="number"
                                  value={semesterNo}
                                  defaultValue={items?.semesterNo}
                                  onChange={(e) =>
                                    setSemesterNo(e.target.value)
                                  }
                                  style={{ margin: "10px" }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <button type="submit">Update</button>
                      </form>
                    )}
                    {showSubject && <h1>Subject</h1>}
                    {showSubject &&
                      sem.subjects &&
                      sem.subjects.map((sub) => (
                        <div key={sub.subjectId}>
                          <p>{sub.subjectName}</p>
                          <button
                            onClick={() =>
                              deleteData(data.id, sem.semesterId, sub.subjectId)
                            }
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              setEditSubjectId(
                                editSubjectId !== sub.subjectId
                                  ? sub.subjectId
                                  : null
                              )
                            }
                          >
                            Edit
                          </button>
                          {editSubjectId === sub.subjectId && (
                            <form
                              onSubmit={(e) =>
                                handleSubmit(
                                  e,
                                  data.id,
                                  sem.semesterId,
                                  sub.subjectId
                                )
                              }
                            >
                              <input
                                type="text"
                                placeholder="subject name"
                                name="subjectName"
                                defaultValue={sub.subjectName}
                              />
                              <button type="submit">Update</button>
                            </form>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          )
      )}
    </div>
  );
};

export default Education;
