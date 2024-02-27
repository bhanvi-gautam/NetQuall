import { useLoginMutation } from './rtk/AddSlice';
import React, { useEffect, useState } from "react";
import backgroundImage from "./images/backgroundImage.jpg";
import "./Login.css";
import { Link } from 'react-router-dom';
// import { encryptData } from './util/utils';


const Login = () => {
    // const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [sendData, posts] = useLoginMutation();
    let key;
    let id;



    if (posts && posts.data && posts.data.tokens) {
        key = posts.data.tokens.access.token;
        id = posts.data.data.id;
        console.log("id==", id);
        // const encryptedId = encryptData(id);
        // const encryptedToken = encryptData(key);
        localStorage.setItem("userId", id);
        localStorage.setItem("token", key);

        location.reload();
    } else {
        console.log('Token not found');
    }
    useEffect(() => {
        console.log("posts1===", posts);
        if (posts.status === "rejected") {
            window.alert(posts.error);
        }
    }, [posts]);


    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;
        const data = { email, password };
        sendData(data);

    };
    //check posts if error then alert

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

    // useEffect(() => {
    //     {isLoggedIn && <Alert variant="success">Welcome!</Alert>}

    // }, isLoggedIn);

    return (
        <div style={myStyle}>
            <form onSubmit={handleSubmit} className='formStyle'>

                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="email" />
                    <label className="form-label" htmlFor="form2Example1">
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
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                </div>


                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign in
                    </button>
                </div>
                <div>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                </div>

            </form>
        </div>

    )

}

export default Login;
