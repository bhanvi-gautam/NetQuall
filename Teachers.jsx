import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import dummyProfile from "./images/dummyProfile.webp";
import LockIcon from '@mui/icons-material/Lock';
import { useGetUsersMutation,useEnableDisableUserMutation} from './rtk/AddSlice';
import CryptoJS from 'crypto-js';

const Teachers = () => {
    const [getdata, { isLoading, isSuccess, post }] = useGetUsersMutation();
    const [sendData]=useEnableDisableUserMutation();
    // let navigate = useNavigate();
    const [posts, setPosts] = useState(post);
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


    const abc = async () => {
        const fetchPosts = await getdata({ filters: [false,false], search: '' ,sortBy:[]}).unwrap();
        console.log('fetchPosts==',fetchPosts);
        const temp = decryptData(fetchPosts.data)

        setPosts(temp);
        // setPosts(fetchPosts);
    }


    const handleDisableUser=async(id)=>{
        console.log("id====",id);
        
        await sendData(id).unwrap();

    
            // navigate('/viewTeacher');
       

    }
    useEffect(() => {
        abc();
    }, []);
    let index=0;
    console.log("postsTeachers==", posts);
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
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
                            <th>Update</th>
                            <th>Disable</th>
                            {/* <th>Delete </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.map((data) => {
                            if (data.occupation === 1 && data.is_available===0) {
                                index+=1;
                                return (
                                    <tr key={data.id}>
                                        <td>{index }.</td>
                                        <td>
                                            {data.profile ?
                                                <img src={`http://localhost:3003/images/${data.profile}`} width="100" height="100" />
                                                :
                                                <img src={dummyProfile} width="100" height="100" />
                                            }
                                        </td>
                                        <td>{data.first_name + " " + data.last_name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.address}</td>
                                        <td>{data.phone_number}</td>
                                        <td><Link to={`/addUser/editUser/${data.id}`}><EditIcon /></Link></td>
                                        <td><LockIcon onClick={()=>handleDisableUser(data.id)}/></td>
                                        {/* <td><DeleteIcon /></td> */}
                                    </tr>
                                )
                            }
                        })}
                    </tbody>

                </table>

            </>
        )


    }

    return (
        <>
            <h1>List of Teachers</h1>
            {content}
        </>
    );
}

export default Teachers


