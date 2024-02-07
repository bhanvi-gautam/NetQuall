import React from "react";
import backgroundImage from "../images/backgroundImage.jpg";
import "./Home.css";

const Home = () => {
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
  const formStyle = {
    backgroundColor: "rgba(128, 128, 128, 0.7)",
    padding: "20px",
    width: "auto",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(128, 128, 128, 0.8)",
    },
  };

  return (
    <>
      <div style={myStyle}>
        <form style={formStyle}>
          <div className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" />
            <label className="form-label" for="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
            />
            <label className="form-label" for="form2Example2">
              Password
            </label>
          </div>

          {/* <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  checked
                />
                <label className="form-check-label" for="form2Example31">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
  */}
          <button type="button" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
          {/*}
          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button> */}
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default Home;
