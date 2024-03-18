import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useLoginMutation, useGetOneUserMutation } from "../rtk/AddSlice";
import { Link, useNavigate } from "react-router-dom";
import dummyProfile from "../../assets/img/dummyProfile.png";
import { decryptData, encryptData } from "../../assets/security/encryDecrypt";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [posts, setPosts] = useState({
    profile: "",
    first_name: "",
    last_name: "",
  });
  const [getdata] = useGetOneUserMutation();

  const abc = () => {
    getdata(id)
      .unwrap()
      .then((fetchPosts) => {
        const temp = decryptData(fetchPosts.data);
        setPosts(temp?.response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    navigate("/");
  };

  useEffect(() => {
    abc();
  }, []);

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <Link
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            to={"/"}
          >
            Hello, {posts?.first_name + " " + posts?.last_name}!
          </Link>

          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <button
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              onClick={logout}
            >
              Logout
            </button>
          </form>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <Link to={"/settings"}>
              <Avatar
                alt="Welcome"
                src={
                  posts?.profile
                    ? `http://localhost:3003/images/${posts?.profile}`
                    : dummyProfile
                }
              />
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
