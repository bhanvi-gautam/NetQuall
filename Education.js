import React, { useState } from "react";
import './Education.css'

const Education = ({ info, deleteData, editBool,editData }) => {
    console.log("Education===", info);
    const [showSemester, setShowSemester] = useState(false);
    const [showSubject, setShowSubject] = useState(false);
    const handleSubmit = (e, courseId, semesterId, subjectId) => {
        e.preventDefault();
        const value = e.target.elements.courseName.value;
        console.log(value, courseId, semesterId, subjectId);
        editData(value, courseId, semesterId, subjectId);
    };

    return (
        <div>
            <h1>Courses:</h1>
            {info?.map((data) => (
                data?.id !== '' &&
                <div key={data.id}>
                    <div>
                        <button onClick={() => setShowSemester(!showSemester)}>
                            <p>{data.task.courseName}</p>
                        </button>
                        <button onClick={() => deleteData(data.id)}>Delete</button>
                        <button onClick={() => editBool(!data.edit, data.id)}>Edit</button>

                        {data.edit && <form onSubmit={(e) => handleSubmit(e, data.id)}>
                            <input type="text" placeholder="course name" name="courseName" />
                            <h4>Semester List</h4>
                            {data.task.semesters.map((items, index) => {
                                return <React.Fragment key={index}>
                                    <div className="semesters">
                                        Semester {index + 1}
                                        <input type="number" value={items?.semesterNo} style={{ margin: '10px' }} />
                                    </div>
                                    <div style={{ paddingTop: "5px" }} className="subjects">
                                        {items?.subjects.map((sItems, subIndex) => {
                                            return <input key={subIndex} type="text" value={sItems?.subjectName}
                                            />
                                        })}
                                    </div>
                                </React.Fragment>
                                
                            })}
                            <button type="submit">Update</button>
                        </form>}
                    </div>
                    {showSemester &&
                        <h1>Semester</h1>
                    }
                    {showSemester && data.task.semesters && data.task.semesters.map((sem) => (
                        <div key={sem.semesterId}>
                            <button onClick={() => setShowSubject(!showSubject)}>
                                <p>{sem.semesterNo}</p>
                            </button>
                            <button onClick={() => deleteData(data.id, sem.semesterId)}>Delete</button>
                            <button onClick={() => editBool(!sem.edit, data.id, sem.semesterId)}>Edit</button>
                            {sem.edit && <form onSubmit={(e) => handleSubmit(  )}>
                            <h4>Semester List</h4>
                            {sem.task.semesters.map((items, index) => {
                                return <React.Fragment key={index}>
                                    <div className="semesters">
                                        Semester {index + 1}
                                        <input type="number" value={items?.semesterNo} style={{ margin: '10px' }} />
                                    </div>
                                    <div style={{ paddingTop: "5px" }} className="subjects">
                                        {items?.subjects.map((sItems, subIndex) => {
                                            return <input key={subIndex} type="text" value={sItems?.subjectName}
                                            />
                                        })}
                                    </div>
                                </React.Fragment>  
                            })}
                            <button type="submit">Update</button>
                        </form>}
                            {showSubject &&
                                <h1>Subject</h1>
                            }
                            {showSubject && sem.subjects && sem.subjects.map((sub) => (
                                <div key={sub.subjectId}>
                                    <p>{sub.subjectName}</p>
                                    <button onClick={() => deleteData(data.id, sem.semesterId, sub.subjectId)}>Delete</button>
                                    <button onClick={() => editBool(!sub.edit, data.id, sem.semesterId, sub.subjectId)}>Edit</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}



        </div>
    );
};

export default Education;

