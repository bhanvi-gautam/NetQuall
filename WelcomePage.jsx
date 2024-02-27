import React from "react";
import Cards from "./Cards";
import viewCourses from "./images/viewCourses.jpg";
import viewUsers from "./images/viewUsers.png";

const WelcomePage = () => {
  console.log("hie2");
  return (
    // <div/>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#3f0f40", textAlign: "center" }}>Welcome, User</h1>
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>
        Quick Links
      </h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Cards
          image={viewCourses}
          title="View Courses"
          content="Click here to view all courses."
          link="/courses"
        />
        <Cards
          image={viewUsers}
          title="View Users"
          content="Click here to view all users."
          link="/users"
        />
      </div>
    </div>
  );
};

export default WelcomePage;