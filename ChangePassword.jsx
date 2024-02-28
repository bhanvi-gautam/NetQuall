import { React, useState } from 'react'
import { useChangePasswordMutation } from './rtk/AddSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();
   
    const [sendData] = useChangePasswordMutation();
  
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        let checking = 1;
        if (!password.match(lowerCase)) {
            checking++;
            setErrorMessage("Password should contains lowercase letters!");
        } else if (!password.match(upperCase)) {
            checking++;
            setErrorMessage("Password should contain uppercase letters!");
        } else if (!password.match(numbers)) {
            checking++;
            setErrorMessage("Password should contains numbers also!");
        } else if (password.length < 10) {
            checking++;
            setErrorMessage("Password length should be more than 10.");
        } else {
            checking = 1;
            setErrorMessage("Password is strong!");
        }

        if (checking === 1) {

            let flag;
            if (password !== confirmPassword) {
                window.alert('passwords do not match!');
            }
            else {
                flag = await sendData({ email: email, password: password }).unwrap();
            }

            if (flag) {
                navigate('/');
            }
        }
    }

    return (
        <div>
            <h1>Form to change password</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              value={email}
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errorMessage !== "Password is strong!"}
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              helperText={errorMessage}
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={password !== confirmPassword}
              id="confirm_password"
              label="Confirm Password"
              name="confirm_password"
              type={showPassword1 ? "text" : "password"}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              helperText={
                password !== confirmPassword ? "Passwords do not match!" : ""
              }
              variant="standard"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </Grid>
        </Grid>
            </form>

        </div>
    )
}

export default ChangePassword
