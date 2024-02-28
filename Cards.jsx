import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Image,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
  Icon,
} from "semantic-ui-react";

const Cards = ({ image, title, content, link }) => {
  return (
    <Card>
      <Image
        src={image}
        wrapped
        ui={false}
        // style={{ height: "200px", width: "200px", objectFit: "cover" }}
      />
      <CardContent>
        <CardHeader style={{ fontSize: "20px", fontWeight: "bold" }}>
          {title}
        </CardHeader>
        <CardDescription>{content}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Link to={link}>
          <Icon name="user" />
          Go to Next Page
        </Link>
      </CardContent>
    </Card>
  );
};

export default Cards;
