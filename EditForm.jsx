import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAddNewPostMutation, useGetOnePostMutation } from './rtk/AddSlice';

const EditForm = () => {
    const { courseId } = useParams();
    const [semArr, setSemArr] = useState([]);
    const [getdata] = useGetOnePostMutation();
    const [updateData] = useAddNewPostMutation();
    const [info, setInfo] = useState(null);
    const [formData, setFormData] = useState(info);


    // console.log(courseId);
    // console.log("postData1===", info);
    // console.log("form1===",formData)

    const abc = () => {
        getdata(courseId)
            .unwrap()
            .then((fetchPosts) => {
                console.log(fetchPosts)
                setInfo(fetchPosts.data);
                setFormData(fetchPosts.data)
                setSemArr(fetchPosts.data.userSemesters)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        abc();
    }, [courseId]);
    useEffect(() => {
        console.log("semArr1==", semArr);
    }, [semArr]);

    const handleSemesterChange = (index, e) => {
        const semester = e.target.value;
        let newArray;
        setSemArr((prevArray) => {
            newArray = [...prevArray];
            newArray[index] = Number(semester);
            return newArray;
        });

        setFormData((prev) => {
            const newFormData = { ...prev };
            newFormData.userSemesters = newFormData.userSemesters.map((sem, i) => {
                return { ...sem, semesterNo: newArray[i] || sem.semesterNo };
            });
            return newFormData;
        });
    };

    const handleSubjectChange = (semesterIndex, subjectIndex, e) => {
        const subjectName = e.target.value;
        console.log("id===", subjectIndex)

        setSemArr((prevSemArr) => {
            const newSemArr = { ...prevSemArr };//shallow copy?
            const semesterSubjects = newSemArr[semesterIndex]?.userSubjects || [];
            const newSubjects = [...semesterSubjects];
            console.log("semesterSubjects==", semesterSubjects)//no change
            newSubjects[subjectIndex] = { subjectName: subjectName };
            console.log("arrnewSub==", newSubjects);//change
            newSemArr[semesterIndex] = { ...newSemArr[semesterIndex], userSubjects: newSubjects };
            console.log("arrnewSem==", newSemArr);//no change

            return newSemArr;
        });
        // ----------------WILL WORK WITHOUT FORMDATA ALSO -----------------------------
        // ----------------YOU NEED TO UPDATE UPDATEDDATA IN HANDLEUPDATE -----------------------------
        setFormData((prev) => {
            const newFormData = { ...prev };
            newFormData.userSemesters = newFormData.userSemesters.map((sem, i) => {
                if (i === semesterIndex) {
                    const newUserSubjects = sem.userSubjects.map((sub, j) => {
                        return j === subjectIndex ? { id: sub.id, subjectName: subjectName } : sub;
                    });
                    return { ...sem, userSubjects: newUserSubjects };
                }
                return sem;
            });
            return newFormData;
        });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("semArr", semArr)
        console.log("formData====", formData)
        const updatedFormData = {

            "courseId": formData.id,
            "courseName": formData.courseName,
            "semester": formData.userSemesters.map(sem => {
                return {
                    "Id": sem.id,
                    "sem": sem.semesterNo,
                    "subject": sem.userSubjects.map(sub => {
                        return {
                            "id": sub.id,
                            "subjectName": sub.subjectName
                        };
                    })
                }
            }),
            "userID": 8,
            "user_Id": 8,
        };
        await updateData(updatedFormData).unwrap();
    }


    return (

        <div>
            <div>
                <div>
                    <h1>Update details</h1>
                </div>
                <form onSubmit={handleUpdate}>
                    <div>
                        Course:
                        <input
                            type="text"
                            name="courseName"
                            defaultValue={info?.courseName}
                            onChange={(e) =>
                                setFormData({ ...formData, courseName: e.target.value })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        {info?.userSemesters.map((sem, index1) => (
                            <div key={sem.id}>
                                <span>SemesterNo {index1 + 1}:</span>
                                <span>
                                    <input
                                        type="number"
                                        name="sem"
                                        defaultValue={sem.semesterNo}
                                        onChange={(e) => handleSemesterChange(index1, e)}
                                    />
                                </span>
                                <br />
                                <div>
                                    {sem.userSubjects?.map((sub, index2) => (
                                        <div key={sub.id}>
                                            <span>Subject Name: </span>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="subjectName"
                                                    defaultValue={sub.subjectName}
                                                    onChange={(e) => handleSubjectChange(index1, index2, e)}
                                                />
                                            </span>
                                        </div>

                                    ))}
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div>
                        <button>Update</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditForm;
