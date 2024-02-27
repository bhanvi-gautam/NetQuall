import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CryptoJS from 'crypto-js';
import { useAddNewPostMutation, useGetOnePostMutation,useDeletePostMutation } from './rtk/AddSlice';

const EditForm = () => {
    let navigate = useNavigate();
    const { courseId } = useParams();
    const [semArr, setSemArr] = useState([]);
    const [getdata] = useGetOnePostMutation();
    const [updateData] = useAddNewPostMutation();
    const [deletePost] = useDeletePostMutation();
    const [info, setInfo] = useState(null);
    const [formData, setFormData] = useState(info);
    const userid=localStorage.getItem('userId');
    const secretKey = '6d090796-ecdf-11ea-adc1-0242ac112345';


    const encryptData = (data) => {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return encryptedData;
    };

    const decryptData = (encryptedData) => {
        console.log("temp1===", encryptedData);
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
        let decryptedObject;
        try {
            decryptedObject = JSON.parse(decryptedData);
            console.log("decryptedObject==", decryptedObject);
        } catch (error) {
            // Handle JSON parsing error if needed
            console.error('Failed to parse decrypted data:', error);
            return null;
        }
        return decryptedObject;
    };


    // console.log(courseId);
    // console.log("postData1===", info);
    // console.log("form1===",formData)

    const abc = () => {
        getdata(courseId)
            .unwrap()
            .then((fetchPt) => {
                console.log("hiiiii--",fetchPt.data)
                const fetchPosts = decryptData(fetchPt.data)
                console.log("hie--",fetchPosts)

                setInfo(fetchPosts);
                setFormData(fetchPosts)
                setSemArr(fetchPosts.userSemesters)
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

    
    const deleteItem = async (courseId = 0, semesterId = 0, subjectId = 0) => {
        try {

            // console.log("courseId==",courseId)
            // console.log("semesterId==",semesterId)
            // console.log("subjectId==",subjectId)
            // return;
            if (courseId && semesterId && subjectId) {
                await deletePost({ courseId, semesterId, subjectId }).unwrap()
                location.reload();
            }
            else if (courseId && semesterId) {
                await deletePost({ courseId, semesterId }).unwrap()
                location.reload();

            }
            else {
                await deletePost({ courseId }).unwrap()
                location.reload();

            }
        } catch (error) {
            console.log("Error deleting data");
        }
    }
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
            "userID": userid,
            "user_Id": userid,
        };
        await updateData(updatedFormData).unwrap();
        navigate('/viewCourses')
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
                                    /><CloseIcon onClick={(e)=>deleteItem(courseId,sem.id)}/>
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
                                                /><CloseIcon onClick={(e)=>deleteItem(courseId,sem.id,sub.id)}/>
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
