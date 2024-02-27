import React, { useState } from 'react'
import { useRegisterMutation, useGetFileIdMutation, useUploadImageMutation } from './rtk/AddSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import CryptoJS from 'crypto-js';

const AddUser = () => {
    let navigate = useNavigate();
    const [addData] = useRegisterMutation();
    const [uploadImage] = useUploadImageMutation();
    const [sendFileName, { isLoading, isSuccess, post }] = useGetFileIdMutation();
    const [files, setFiles] = useState([]);
    const [fileSize, setFileSize] = useState(0);
    const [fileId, setFileId] = useState('');
    const [value, setValue] = useState(0);
    const [fileName, setFileName] = useState('');
    const[fileUploaded,setFileUploaded]=useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileUploaded(file.name);
          handleUpload(e);
        }
      };

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

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleRegisterSubmit = async (e) => {

        e.preventDefault();
        // let profile = fileName;
        let profile = "";
        if (fileId) {
            profile = `file-${fileId}-${fileName}`;
        }

        let first_name = e.target.elements.firstName.value;
        let last_name = e.target.elements.lastName.value;
        let phone_number = e.target.elements.phnNo.value;
        let address = e.target.elements.address?.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;
        let confirm_password = e.target.elements.confirm_password.value;
        let occupation = e.target.elements.roleSelect.value === 'Teacher' ? 1 : 0;
        console.log(fileName);

        const data = { profile, occupation, first_name, last_name, phone_number, address, email, password, confirm_password };

        const start = 0;
        const end = fileSize;
        try {
            if (profile) {
                for (const file of files) {
                    const fileData = new FormData();
                    fileData.append('file', file);
                    // console.log("fileData==", fileData);
                    // console.log("fileId==", fileId)
                    await uploadImage({ x: fileData, y: fileId, z: `bytes=${start}-${end}/${fileSize}` });
                }
            }
            // const encryptedData=encryptData(data1);
            // const base64EncodedData = btoa(encryptedData);
            // const data = encryptData(data1);
            // console.log(data)
            await addData(data);
        } catch (error) {
            console.error("Error in upload or add operations", error);
        }

        // navigate('/viewUser');
    }




    const handleUpload = (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0].name;
            let size = e.target.files[0].size;
            setFileSize(size);
            setFileName(file);

            if (fileSize < 5242880) {
                sendFileName(file).unwrap().then((fetchFileId) => {
                    localStorage.removeItem('xFileId');
                    setTimeout(() => {
                        const temp = encryptData(fetchFileId.fileId);
                        localStorage.setItem('xFileId', temp);
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
        } else {
            // Set default fileId and fileName when no file is selected
            setFileId(null);
            setFileName(null);
        }
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });





    return (
        <div>
            <h1>Add New User's Details</h1>
            <form onSubmit={handleRegisterSubmit} encType="multipart/form-data">
                
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg"/>
                </Button>
                
                <p className="info-message">Max size: 5MB</p>
                
                <div className="form-outline mb-4">
                    <input type="text" className="form-control" name="firstName" />
                    <label className="form-label"  >
                        First Name
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="text" className="form-control" name="lastName" />
                    <label className="form-label"  >
                        Last Name
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="tel"
                        className="form-control"
                        name="phnNo"
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                    <label className="form-label">
                        Contact Number
                    </label>
                </div>

                <div className="form-outline mb-4">
                    <select className="form-control" id="roleSelect" name="roleSelect" value={value} onChange={handleChange}>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                    <label className="form-label" htmlFor="roleSelect">
                        What is the Role?
                    </label>
                </div>

                <div className="form-outline mb-4">
                    <input type="text" className="form-control" name="address" />
                    <label className="form-label"  >
                        Address
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" className="form-control" name="email" />
                    <label className="form-label"  >
                        Email address
                    </label>
                </div>

                <div className="form-outline mb-4">
                    <input
                        type="password"

                        className="form-control"
                        name="password"
                    />
                    <label className="form-label"   >
                        Password
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"

                        className="form-control"
                        name="confirm_password"
                    />
                    <label className="form-label"   >
                        Confirm Password
                    </label>
                </div>


                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4" >
                        Add

                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddUser
