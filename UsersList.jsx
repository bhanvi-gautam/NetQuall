import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import dummyProfile from "./images/dummyProfile.webp";
import { useGetUsersMutation, useEnableDisableUserMutation } from './rtk/AddSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CryptoJS from 'crypto-js';


const UsersList = () => {
    const [getdata, { isLoading, isSuccess, post }] = useGetUsersMutation();
    const [sendData] = useEnableDisableUserMutation();
    const [posts, setPosts] = useState(post);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [filters, setFilters] = useState({ Student: false, Teacher: false });
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
        // If both filters are false, fetch all data
        await getdata({ filters: [filters], search: search, sortBy: sortBy })
            .unwrap()
            .then((fetchPosts) => {
                console.log("first condition===", fetchPosts.data)
                const temp = decryptData(fetchPosts.data)
                setPosts(temp);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }
    console.log("posts1===", posts)

    useEffect(() => {
        filteredData();
    }, [filters, sortBy]);


    console.log("posts2===", posts)

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        filteredData();
    }
    const handleEnableUser = async (id) => {

        await sendData(id).unwrap();
    }


    const dropdown = (

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy(['email', 'asc'])}>Email (A-Z) </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy(['email', 'desc'])}>Email (Z-A) </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy(['first_name', 'asc'])}>First Name(A-Z)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy(['first_name', 'desc'])}>First Name(Z-A)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('')}>Remove</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    )

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        let currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);



        content = (
            <>
                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Address</th>
                            <th>Contact No.</th>
                            <th>Role</th>
                            <th>Update</th>
                            <th>Enable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map(
                            (data, index) =>

                                <tr key={data.id}>
                                    <td>{indexOfFirstItem + index + 1}.</td>

                                    <td> {data.profile ? <img src={`http://localhost:3003/images/${data.profile}`} /> : <img src={dummyProfile} width="100" height="100" />}</td>
                                    <td>{data.first_name + " " + data.last_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.address}</td>
                                    <td>{data.phone_number}</td>
                                    <td>{data.occupation == 0 ? "Student" : "Teacher"}</td>
                                    <td><Link to={`/addUser/editUser/${data.id}`}><EditIcon /></Link></td>
                                    <td>{data.is_available === 1 && <LockOpenIcon onClick={() => handleEnableUser(data.id)} />}</td>

                                </tr>

                        )
                        }
                    </tbody>
                </table>


                <div className="row d-flex justify-content-between">
                    <div className="col-sm text-left">
                        <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>Prev</button>
                    </div>
                    <div className="col-sm text-center">
                        <div className="row">
                            {Array(Math.ceil(posts?.length / itemsPerPage)).fill().map((_, index) => (
                                <div className="col-sm">
                                    <button onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-sm text-right">
                        <button onClick={() => setCurrentPage(currentPage < Math.ceil(posts?.length / itemsPerPage) ? currentPage + 1 : currentPage)}>Next</button>
                    </div>
                </div>

            </>
        )


    }
    return (
        <>
            <div className="row">
                <h1 className="col">List of Users</h1>
                <div className="col d-flex">
                    <p>Choose filter</p>
                    {['Student', 'Teacher'].map((role) => (
                        <div className="form-check" key={role}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name={role}
                                checked={filters[role]}
                                onChange={handleFilterChange}
                            />
                            <label className="form-check-label" >
                                {role}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="col d-flex">
                    {dropdown}
                </div>
                <form className="col d-flex">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by Name"
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
}

export default UsersList


