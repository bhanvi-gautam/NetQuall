import React, { useState } from 'react'
import { useRegisterMutation, useGetFileIdMutation, useUploadImageMutation } from './rtk/AddSlice';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                
                <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phnNo"
              label="Contact Number"
              type="tel"
              name="phnNo"
              pattern="[0-9]*"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="roleSelect"
              select
              label="What is the Role?"
              value={value}
              name="roleSelect"
              onChange={handleChange}
              variant="standard"
              fullWidth
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address"
              label="Address"
              name="address"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email address"
              name="email"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="confirm_password">
                Confirm Password
              </InputLabel>
              <Input
                id="confirm_password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>

            </form>
        </div>
    )
}

export default AddUser
