import { React, useState } from 'react'
import { useVerifyPasswordMutation, useChangePasswordMutation } from './rtk/AddSlice';

const ChangePassNew = () => {
    const userId = localStorage.getItem('userId');
    const [oldPassword, setOldPasssword] = useState('');
    const [currentPassword, setCurrentPasssword] = useState('');
    const [confirmPassword, setConfirmPasssword] = useState('');
    const [show, setShow] = useState(false);
    const [checkPassword] = useVerifyPasswordMutation();
    const [sendData] = useChangePasswordMutation();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const handleOldPass = async (e) => {
        e.preventDefault();
        try {

            let check = await checkPassword({ userId: userId, oldPassword: oldPassword }).unwrap();
            if (check.status) {
                setShow(true);
            }
        } catch (error) {
            window.alert('Wrong Old Password');
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        let checking = 1;
        if (!currentPassword.match(lowerCase)) {
            checking++;
            setErrorMessage("Password should contains lowercase letters!");
        } else if (!currentPassword.match(upperCase)) {
            checking++;
            setErrorMessage("Password should contain uppercase letters!");
        } else if (!currentPassword.match(numbers)) {
            checking++;
            setErrorMessage("Password should contains numbers also!");
        } else if (currentPassword.length < 10) {
            checking++;
            setErrorMessage("Password length should be more than 10.");
        } else {
            checking = 1;
            setErrorMessage("Password is strong!");
        }

        if (checking === 1) {



            let flag;
            if (currentPassword !== confirmPassword) {
                window.alert('Passwords do not match!');
            } else {
                flag = await sendData({ userId: userId, password: currentPassword }).unwrap();
            }
            if (flag) {
                window.alert('Password updated')
            }
        }
    }

    return (
        <div>
            <h1>Form to change password</h1>
            <form onSubmit={handleOldPass}>
               
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label" name="oldpassword" >Current Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" onChange={(e) => { setOldPasssword(e.target.value) }} required />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Next
                    </button>
                </div>
            </form>

            {show &&
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label" name="newpassword">New Password</label>
                        <div className="col-sm-10">
                            <input type={showPassword ? "text" : "password"} className="form-control" onChange={(e) => { setCurrentPasssword(e.target.value) }} required />
                            <label for="check">Show Password</label>
                            <input
                                type="checkbox"
                                value={showPassword}
                                onChange={() =>
                                    setShowPassword((prev) => !prev)
                                }
                            />
                            <div style={{ color: "red" }}> {errorMessage} </div>

                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label" name="confirm_password">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type={showPassword1 ? "text" : "password"} className="form-control" onChange={(e) => { setConfirmPasssword(e.target.value) }} required />
                            <label for="check">Show Password</label>
                            <input
                                type="checkbox"
                                value={showPassword1}
                                onChange={() =>
                                    setShowPassword1((prev) => !prev)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Change Password
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default ChangePassNew
