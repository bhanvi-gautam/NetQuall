import { useLoginMutation ,useRegisterMutation} from './rtk/AddSlice';
import React, { useState } from "react";
import backgroundImage from "./images/backgroundImage.jpg";
import "./Login.css";



const Login = () => {
    const [sendData, posts] = useLoginMutation();
    let key;
    if (posts && posts.data && posts.data.tokens) {
        key = posts.data.tokens.access.token;
        localStorage.setItem("token", key);
        location.reload();
    } else {
        console.log('Token not found');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;
        const data = { email, password };
        sendData(data);

    };



    const myStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        height: "100vh",
        fontSize: "20px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div style={myStyle}>
                <form onSubmit={handleSubmit} className='formStyle'>

                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" name="email" />
                        <label className="form-label" for="form2Example1">
                            Email address
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            name="password"
                        />
                        <label className="form-label" for="form2Example2">
                            Password
                        </label>
                    </div>


                    <div>
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Sign in
                        </button>
                    </div>
                  

                </form>
           </div>

    )

}

export default Login;
