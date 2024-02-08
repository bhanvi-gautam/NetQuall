// Sidebar.js
import React from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import SettingsIcon from "@mui/icons-material/Settings";
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
        title="View User"
        link="/viewUser"
      />
      <SidebarOptions
        Icon={LibraryBooksIcon}
        title="View Courses"
        link="/viewCourses"
      />
      <hr />
      <SidebarOptions Icon={SettingsIcon} title="Settings" link="/settings" />
    </div>
  );
};

export default Sidebar;
