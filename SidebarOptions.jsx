import React from "react";
import { Link } from "react-router-dom";

const SidebarOptions = ({ Icon, title, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Icon style={{ marginRight: "10px" }} />
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export default SidebarOptions;