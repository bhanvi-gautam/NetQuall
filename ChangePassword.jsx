import { React, useState } from 'react'
import { useChangePasswordMutation } from './rtk/AddSlice';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImage from "../../assets/img/register_bg_2.png";

// import {
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Input,
//   InputAdornment,
//   IconButton,
//   Box,
//   Grid,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();
   
    const [sendData] = useChangePasswordMutation();
  
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showPassword1, setShowPassword1] = useState(false);

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
           <div className="container mx-auto px-4 h-full" style={myStyle}>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h1 className="text-blueGray-500 text-lg font-bold">
                    Reset Password
                  </h1>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      New Password
                    </label>
          
         <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
          <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
         <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Show Password
                      </span>
                    </label>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default ChangePassword
