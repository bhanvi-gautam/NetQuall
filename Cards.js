import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ image, title, content, link }) => {
  return (
    <div>
      <div
        className="card"
        style={{ height: "20rem", margin: "20px", width: "15rem" }}
      >
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: "10rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <Link to={link} className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
