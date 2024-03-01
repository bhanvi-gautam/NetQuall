// Admin navbar

import { React, useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { useLoginMutation } from './rtk/AddSlice';
import { Link } from "react-router-dom";
import dummyProfile from "./images/dummyProfile.webp";
import { useGetOneUserMutation } from './rtk/AddSlice';
import CryptoJS from 'crypto-js';
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

const Navbar = () => {
  let key;
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const id = localStorage.getItem('userId');
  const [getdata, { isLoading, isSuccess, post }] = useGetOneUserMutation();
  const [sendData, posts] = useLoginMutation();


  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }


  const abc = () => {
    getdata(Number(id))
      .unwrap()
      .then((fetchPosts) => {
        console.log("profile===", fetchPosts.data.profile)
        const temp = decryptData(fetchPosts.data)
        console.log("temp==",temp);
     
        setImage(temp.profile);
        setFirstName(temp.first_name);
        setLastName(temp.last_name);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    abc();
  }, []);
  console.log(posts.data?.tokens);
  if (posts && posts.data) {
    key = posts.data;
    console.log("data==", key);
    location.reload();
  } else {
    console.log('Token not found');
  }
  const logout = () => {
    localStorage.removeItem("token")
    location.reload();
  }

  return (
    <div>
     <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
       
    <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
             to={'/'}>Hello, {capitalize(firstName)} {capitalize(lastName)}!</Link>
    
     
                      <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">

            <button className="text-white text-sm uppercase hidden lg:inline-block font-semibold" onClick={logout}>
              Logout
            </button>
 </form>
     <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
             <Link  to={'/settings'}><Avatar alt="Welcome" src={image ? `http://localhost:3003/images/${image}` : dummyProfile} /></Link>
          </ul>
    
  </div>
</nav>
    </div>
  );
};

export default Navbar;
