import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown from 'react-bootstrap/Dropdown';
import { useGetPostsMutation, useDeletePostMutation } from './rtk/AddSlice';
import CryptoJS from 'crypto-js';

const Education = () => {
    let navigate = useNavigate();
    const modalRef = useRef();
    const [getdata, { isLoading, isSuccess, post }] = useGetPostsMutation();
    const [deleteData] = useDeletePostMutation();
    const [posts, setPosts] = useState(post);
    const [courseIdToDelete, setCourseIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState([]);
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
    const filteredData = async () => {

        const fetchPosts = await getdata({ search: search, sortBy: sortBy }).unwrap();
        const temp = decryptData(fetchPosts.data)
        setPosts(temp);
    }

    useEffect(() => {
        filteredData();
    }, [sortBy]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        filteredData();
    }

    const dropdown = (

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy(['courseName', 'desc'])}>Course Name (Z-A) </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy(['courseName', 'asc'])}>Course Name(A-Z)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('')}>Remove</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    )

    const deleteCourse = async () => {
        if (courseIdToDelete) {
            let courseId = courseIdToDelete;
            setTimeout(async () => {
                await deleteData({ courseId }).unwrap();
            }, 100);
            setCourseIdToDelete(null);
            var bootstrapModal = bootstrap.Modal.getInstance(modalRef.current);
            bootstrapModal.hide();
            navigate('/viewCourses');
        }
        else {
            console.log("No course selected for deletion");
        }
    }
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
        content = (
            <>
                <table className="table table-hover">


                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Course</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map(
                            (data, index) =>

                                <tr key={data.id}>
                                    <td>{indexOfFirstItem + index + 1}.</td>
                                    <td>{data.courseName}</td>
                                    <td><Link to={`/addEducation/editCourse/${data.id}`}><EditIcon /></Link></td>
                                    {/* modal for confirmation */}
                                    <td>
                                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setCourseIdToDelete(data.id)}>
                                            <DeleteIcon />
                                        </button>
                                        <div className="modal fade" ref={modalRef} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="staticBackdropLabel">Confirm Deletion!</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Are you sure you want to delete this whole course?
                                                        The data inside it will be deleted
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                                                        <button type="button" className="btn btn-primary" onClick={deleteCourse}>Yes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                        )
                        }
                    </tbody>
                </table>

                <div className="row">
                    <div className="col-sm text-left">
                        <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>Prev</button>
                    </div>
                    <div className="col-sm text-center">
                        <div className="row">
                            {Array(Math.ceil(posts.length / itemsPerPage)).fill().map((_, index) => (
                                <div className="col-sm">
                                    <button onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-sm text-right">
                        <button onClick={() => setCurrentPage(currentPage < Math.ceil(posts.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
                    </div>
                </div>

            </>
        )
    }
    return (
        <>
            <div className="row">
                <h1 className="col">List of Courses</h1>

                <div className="col d-flex">
                    {dropdown}
                </div>
                <form className="col d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by Course"
                        aria-label="Search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
                </form>
            </div>

            {content}
        </>
    );
};

export default Education;