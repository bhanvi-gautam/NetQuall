import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
// import { encryptData } from './util/utils';
import { useGetOneUserMutation, useDeleteUserMutation, useUpdateUserMutation, useDeleteProfileMutation, useGetFileIdMutation, useUploadImageMutation } from './rtk/AddSlice';


const EditUserForm = () => {
    const { userId } = useParams();
    const modalRef = useRef();
    let navigate = useNavigate();
    const [getdata, { isLoading, isSuccess, post }] = useGetOneUserMutation();
    const [updateData] = useUpdateUserMutation();
    const [deletePhoto] = useDeleteProfileMutation();
    const [uploadImage] = useUploadImageMutation();
    const [sendFileName, { post1 }] = useGetFileIdMutation();
    const [posts, setPosts] = useState(post);
    const [formData, setFormData] = useState();
    const [files, setFiles] = useState([]);
    const [fileSize, setFileSize] = useState(0);
    const [fileId, setFileId] = useState('');
    const [isProfileRemoved, setIsProfileRemoved] = useState(false);
    const [fileToBeRemoved, setFileToBeRemoved] = useState('null');
    const [fileName, setFileName] = useState('No image chosen');
    const [userToDelete, setUserToDelete] = useState(null);
    // const [profileInput, setProfileInput] = useState(null);
    const [deleteData] = useDeleteUserMutation();
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
    const abc = () => {
        let id = userId;
        getdata(Number(id))
            .unwrap()
            .then((fetchPosts) => {
            //     console.log("temp1==",fetchPosts.data)
                const temp = decryptData(fetchPosts.data)
                console.log("temp==",temp);
                setPosts(temp);
                setFormData(temp);
                // setProfileInput(fetchPosts.data.profile);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        abc();
    }, [userId]);

    const handleDelete = async () => {
        if (userToDelete) {
            let userId = userToDelete;
            console.log("hie==", fileToBeRemoved);
            try {
                if (fileToBeRemoved) {
                    await deletePhoto({ fileToBeRemoved }).unwrap();
                }
                console.log("checkk!!!");
                setTimeout(async () => {
                    const abc = await deleteData({ userId }).unwrap();
                    // if(abc){
                    // }

                }, 100);
                // Hide the modal
                var bootstrapModal = bootstrap.Modal.getInstance(modalRef.current);
                bootstrapModal.hide();
                navigate('/viewUser');

                console.log("Deleted successfully, navigating...");

            } catch (error) {
                console.error("Error in delete operations", error);
            }
        }
        else {
            console.log("No course selected for deletion");
        }
    }


    const whenDeleteClicked = (id, profile) => {
        setUserToDelete(id);
        setFileToBeRemoved(profile);
    }


    const handleUpload = (e) => {
        console.log("hie");
        let file = e.target.files[0].name;
        let size = e.target.files[0].size;
        setFileSize(size);

        setFileName(file);
        console.log(file);

        setTimeout(() => {
            if (posts.profile) {
                ///delete previous file
                setFileToBeRemoved(profile);
            }
        }, 1000);


        if (fileSize < 5242880) {
            sendFileName(file).unwrap().then((fetchFileId) => {
                console.log("adduser function===", fetchFileId.fileId);
                localStorage.removeItem('xFileId');
                setTimeout(() => {
                    // const temp=encryptData(fetchFileId.fileId);
                    localStorage.setItem('xFileId',fetchFileId.fileId);
                }, 1000);


                setFileId(fetchFileId.fileId);
            }).catch((error) => {
                console.error('Error fetching FileId: ', error);
            });
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
        }
        else {
            window.alert("File size must be less than 5 mb")
        }

    };

    const RemovePhoto = () => {
        setIsProfileRemoved(true);
        // setProfileInput(null);
    }

    const handleUpdate = async () => {
        console.log(formData);
        console.log(" Profile==", formData.profile);
        let profile = formData.profile;

        // If a new file has been chosen, upload the new file
        if (fileName !== 'No image chosen') {
            profile = `file-${fileId}-${fileName}`;
            // delelte previous photo before adding new one

            try {
                if (fileToBeRemoved) {
                    await deletePhoto({ fileToBeRemoved });
                    // setProfileInput(null);
                }
            } catch (error) {
                console.error("Error in delete operations", error);
            }

            const start = 0;
            const end = fileSize;
            try {
                for (const file of files) {
                    const fileData = new FormData();
                    fileData.append('file', file);
                    await uploadImage({ x: fileData, y: fileId, z: `bytes=${start}-${end}/${fileSize}` });

                }
                navigate('/viewUser');
            } catch (error) {
                console.error("Error in upload operations", error);
            }
        }
        const updatedFormData = { ...formData, profile: isProfileRemoved ? "" : profile };

        try {
            await updateData(updatedFormData).unwrap();
            navigate('/viewUser');


        } catch (error) {
            console.error("Error in update operations", error);
        }
    }



    console.log("posts==", posts);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <>
                <table className="table table-hover">

                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>email</th>
                            <th>Address</th>
                            <th>Contact No.</th>
                            <th>Role</th>
                            <th>Update</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={posts.id}>
                            <td><div className="custom-file">
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choosen file:
                                </label>
                                {posts.profile ?
                                    <img src={`http://localhost:3003/images/${posts.profile}`} width="100" height="100" /> :
                                    "No file Choosen"
                                }
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name='profile'
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    onChange={handleUpload}
                                    accept=".png,.jpg,.jpeg"
                                />
                                <button type="button" onClick={RemovePhoto}>Remove Profile Photo</button>
                            </div>
                            </td>

                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    defaultValue={posts.first_name}
                                    posts onChange={(e) =>
                                        setFormData({ ...formData, first_name: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    defaultValue={posts.last_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, last_name: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    defaultValue={posts.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={posts.address}
                                    onChange={(e) =>
                                        setFormData({ ...formData, address: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="tel"
                                    name="phnNo"
                                    defaultValue={posts.phone_number}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone_number: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                {posts.occupation == 0 ? 'Student' : 'Teacher'}

                            </td>
                            <td><DoneIcon onClick={() => handleUpdate()} /></td>
                            <td>
                                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => whenDeleteClicked(posts.id, posts.profile)}>
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
                                                Are you sure you want to delete this whole user?
                                                The data inside it will be deleted
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

                                                <button type="button" className="btn btn-primary" onClick={handleDelete} data-bs-dismiss="modal">Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>



                    </tbody>
                </table>

            </>
        )


    }

    return (
        <>
            <h1>Update Users</h1>
            {content}
        </>
    );
}

export default EditUserForm;



