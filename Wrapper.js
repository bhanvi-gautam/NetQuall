import Form from './Form'
import Education from './Education'
import { v4 as uuidv4 } from "uuid";
import React, { useState } from 'react';
const Wrapper = () => {

    // const [edit,setEdit]=useState(false);
    const [dataset, setDataset] = useState([{ id: '', task: {}, edit: false }]);

    const addData = (data) => {
        setDataset([
            ...dataset,
            { id: uuidv4(), task: data, edit: false },
        ]);
    };

    const deleteData = (id = '', semesterId = '', subjectId = '') => {
        // course
        if (id && semesterId === '') {
            setDataset(dataset.filter((data) => data.id !== id));
        }
        // semester
        if (id && semesterId && subjectId === '') {
            setDataset((prevDataset) => prevDataset.map((data) => {
                if (data && data.task && data.task.semesters) {
                    data.task.semesters = data.task.semesters.filter((sem) => sem.semesterId !== semesterId);
                }
                return data;
            }));
        }
        // subjects
        if (id && semesterId && subjectId) {
            setDataset((prevDataset) => prevDataset.map((data) => {
                if (data && data.task && data.task.semesters) {
                    data.task.semesters = data.task.semesters.map((semester) => {
                        if (semester.semesterId === semesterId && semester.subjects) {
                            semester.subjects = semester.subjects.filter((sub) => sub.subjectId !== subjectId);
                        }
                        return semester;
                    });
                }
                return data;
            }));
        }
    }

    const editData = (value, id = '', semesterId = '', subjectId = '') => {
        try {
            // course
            console.log("calue==",value,"id===", id ,'semester===', semesterId , 'subject===', subjectId )
            if (id && semesterId === '') {
                let updateData = dataset.map((item) => {
                    if (item?.id === id) {
                        return { ...item, task: { ...item.task, courseName: value } };
                    }
                    return item;
                })
                setDataset(updateData);
            }
            // semester
            if (id && semesterId && subjectId === '') {
                // let updateData = dataset.map((item) => {
                //     if (item?.id === id) {
                //         return { ...item, task: { ...item.task, courseName: value } };
                //     }
                //     return item;
                // })
                // setDataset(updateData);
            }
            // subjects
            if (id && semesterId && subjectId) {
                // setDataset((prevDataset) => prevDataset.map((data) => {
                //     if (data && data.task && data.task.semesters) {
                //         data.task.semesters = data.task.semesters.map((semester) => {
                //             if (semester.semesterId === semesterId && semester.subjects) {
                //                 semester.subjects = semester.subjects.filter((sub) => sub.subjectId !== subjectId);
                //             }
                //             return semester;
                //         });
                //     }
                //     return data;
                // }));
            }
            

        } catch (error) {

        }
    }

    const editBool = (edit, id = '', semesterId = '', subjectId = '') => {
        try {
            let updateData = dataset.map((items) => {
                if (items?.id === id) {
                    return { ...items, edit: edit }
                }
                return items;
            })
            setDataset(updateData);
        } catch (error) {
            console.error(error)
        }
    };


    console.log("data==", dataset)
    return (
        <div>
            <Form addData={addData} />
            <Education info={dataset} deleteData={deleteData} editData={editData} editBool={editBool} />
        </div>
    );
};

export default Wrapper;
