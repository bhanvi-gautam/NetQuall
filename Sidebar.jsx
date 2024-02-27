import React from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SidebarOptions from "./SidebarOptions";

const Sidebar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <h1>Our Services</h1>
      <SidebarOptions
        Icon={PersonAddAltIcon}
        title="Add User"
        link="/addUser"
      />
      <SidebarOptions
        Icon={AddToPhotosIcon}
        title="Add Courses"
        link="/addCourses"
      />
      <SidebarOptions
        Icon={SupervisedUserCircleIcon}
        title="View All Users"
        link="/viewUser"
      />
      <SidebarOptions
        Icon={SupervisedUserCircleIcon}
        title="View Teachers"
        link="/viewTeacher"
      />
      <SidebarOptions
        Icon={SupervisedUserCircleIcon}
        title="View Students"
        link="/viewStudent"
      />
      <SidebarOptions
        Icon={LibraryBooksIcon}
        title="View Courses"
        link="/viewCourses"
      />
      <SidebarOptions
        Icon={ChatBubbleIcon}
        title="Chat"
        link="/viewChatBox"
      />
      <SidebarOptions
        Icon={ShowChartIcon}
        title="Status"
        link="/viewStatus"
      />
      <SidebarOptions
        Icon={AccountCircleIcon}
        title="My Account"
        link="/myaccount"
      />
      <hr />
      <SidebarOptions 
      Icon={SettingsIcon} 
      title="Settings" 
      link="/settings" />
      <SidebarOptions 
      Icon={SettingsIcon} 
      title="ChangePassword" 
      link="/changepass1" />
    </div>
  );
};

export default Sidebar;