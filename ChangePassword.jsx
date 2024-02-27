import { React, useState } from 'react'
import { useChangePasswordMutation } from './rtk/AddSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [password, setPasssword] = useState('');
    const [confirmPassword, setConfirmPasssword] = useState('');
    const [sendData] = useChangePasswordMutation();
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);


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
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={email} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label" name="password">Password</label>
                    <div className="col-sm-10">
                        <input type={showPassword ? "text" : "password"} className="form-control" onChange={(e) => { setPasssword(e.target.value) }} />
                        <label for="check">Show Password</label>
                        <input
                            id="check"
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
                        <input type={showPassword1 ? "text" : "password"} className="form-control" onChange={(e) => { setConfirmPasssword(e.target.value) }} />
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

        </div>
    )
}

export default ChangePassword
