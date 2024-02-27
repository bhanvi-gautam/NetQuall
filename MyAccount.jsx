import { React, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useGetOneUserMutation, useDeleteUserMutation, useDeleteProfileMutation, useGetFileIdMutation, useUploadImageMutation, useUpdateUserMutation } from './rtk/AddSlice';
import Avatar from '@mui/material/Avatar';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import dummyProfile from "./images/dummyProfile.webp";


const MyAccount = () => {
    let navigate = useNavigate();
    const [image, setImage] = useState('');
    const[show,setShow]=useState(false);
    const userId = localStorage.getItem('userId');
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


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -13,
            top: 0,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const abc = () => {
        getdata(Number(userId))
            .unwrap()
            .then((fetchPosts) => {
                console.log("profile===", fetchPosts.data.profile)
                setImage(fetchPosts.data.profile);
                setPosts(fetchPosts.data);
                setFormData(fetchPosts.data);

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        abc();
    }, []);

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
                    localStorage.setItem('xFileId', fetchFileId.fileId);
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
            if (isProfileRemoved) {
                try {
                    if (fileToBeRemoved) {
                        await deletePhoto({ fileToBeRemoved });
                        // setProfileInput(null);
                    }
                } catch (error) {
                    console.error("Error in delete operations", error);
                }
            }
            const start = 0;
            const end = fileSize;
            try {
                for (const file of files) {
                    const fileData = new FormData();
                    fileData.append('file', file);
                    await uploadImage({ x: fileData, y: fileId, z: `bytes=${start}-${end}/${fileSize}` });

                }
                navigate('/myaccount');
            } catch (error) {
                console.error("Error in upload operations", error);
            }
        }

        const updatedFormData = { ...formData, profile };
        try {
            await updateData(updatedFormData).unwrap();
            navigate('/myaccount');


        } catch (error) {
            console.error("Error in update operations", error);
        }
    }

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <>


                <form>
                {/* {show && <div className="custom-file">
                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Change Profile?
                                </label>
                                
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name='profile'
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    onChange={handleUpload}
                                    accept=".png,.jpg,.jpeg"
                                />
                                <p>Or</p>
                                <button type="button" onClick={RemovePhoto}>Remove Profile Photo</button>
                            </div>
                           } */}
                    <div className="form-group">
                        <label>First Name</label>
                        <p>
                        <input
                            type="text"
                            name="firstName"
                            defaultValue={posts.first_name}
                            onChange={(e) =>
                                setFormData({ ...formData, first_name: e.target.value })
                            }
                        />
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <p>
                        <input
                            type="text"
                            name="lastName"
                            defaultValue={posts.last_name}
                            onChange={(e) =>
                                setFormData({ ...formData, last_name: e.target.value })
                            }
                        />
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <p>
                        <input
                            type="text"
                            name="email"
                            defaultValue={posts.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <p>
                        <input
                            type="text"
                            name="address"
                            defaultValue={posts.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                        />
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <p>
                        <input
                            type="tel"
                            name="phnNo"
                            defaultValue={posts.phone_number}
                            onChange={(e) =>
                                setFormData({ ...formData, phone_number: e.target.value })
                            }
                        />
                        </p>
                    </div>
                   
                    <button type="button" onClick={() => handleUpdate()}><DoneIcon /></button>
                   
                </form>
            </>
        )
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <h1>Here are all your details!</h1>
            {/* <IconButton aria-label="edit"> */}
                {/* <StyledBadge badgeContent={<EditIcon onClick={()=>setShow(true)}/>} color="secondary" overlap="circular"> */}
                    <Avatar alt="Welcome"
                        src={image ? `http://localhost:3003/images/${image}` : dummyProfile}
                        sx={{ width: 120, height: 120 }}
                        
                    />
                {/* </StyledBadge> */}
            {/* </IconButton> */}
            <div>
                {content}
            </div>
        </div>

    )
}

export default MyAccount
