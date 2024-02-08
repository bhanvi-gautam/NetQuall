import React from "react";
// import { useLoginMutation } from './rtk/AddSlice';

const Navbar = () => {
  let key;
  // const [ sendData,posts] = useLoginMutation();
  // console.log(posts.data?.tokens);
  // if (posts && posts.data ) {
  //      key = posts.data;
  //     console.log("data==", key);
  //     location.reload();
  // } else {
  //     console.log('Token not found');
  // }
  // const logout=()=>{
  //     localStorage.removeItem("token")
  //     location.reload();
  // }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark sticky-top ">
        <div className="container-fluid">
          <a className="navbar-brand">Learning Management System</a>

          <button className="btn btn-outline-primary">Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
