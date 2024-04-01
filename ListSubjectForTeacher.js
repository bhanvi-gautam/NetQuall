import React, { useState, useEffect } from "react";
import { useGetTeacherSubjectMutation } from "../rtk/AddSlice";
import { decryptData } from "../../assets/security/encryDecrypt";
import CardShimmer from "../Effects/CardShimmer";
import { Link } from "react-router-dom";
import NoDataFound from "../Cards/NoDataFound";
import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ListSubjectForTeacher = () => {
  const [getData, { isLoading, isSuccess, isError, post }] =
    useGetTeacherSubjectMutation();
  const [posts, setPosts] = useState(post);
  const userId = localStorage.getItem("userId");
  const [length, setLength] = useState(0);
  console.log("userId", decryptData(userId));

  const abc = async () => {
    const fetchPosts = await getData({ userId: userId }).unwrap();
    console.log("fetchPosts", fetchPosts.encryptedData);
    const subjects = decryptData(fetchPosts.encryptedData);
    console.log("subjects", subjects);
    setLength(subjects.response.data.length);
    setPosts(subjects.response.data);
  };

  useEffect(() => {
    abc();
  }, []);
  console.log("posts", posts);
  return (
    <div className="w-full mb-12">
      {isLoading && <CardShimmer />}

      {isSuccess && (
        <>
          <div
            className="relative bg-lightBlue-600 md:pt-20 pb-20 pt-20"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              position: "relative", // Ensure positioning context for absolute positioning
            }}
          >
            {/* Heading */}
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              color={"white"}
              style={{
                position: "absolute",
                bottom: 0,
                left: 15,
              }}
            >
              Subjects
            </Typography>
          </div>
          <div
            className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start", // Align cards from the start of the row
              alignItems: "flex-start", // Align cards from the top of the row
              height: "100vh",
              padding: "0 20px", // Add padding to adjust spacing
            }}
          >
            {/* Cards */}
            {length === 0 ? (
              <NoDataFound content="No Subjects" />
            ) : (
              <>
                {posts?.map((data, index) => (
                  <Card
                    key={index}
                    elevation={3}
                    style={{
                      height: "150px",
                      width: "150px",
                      margin: "15px", // Adjust margin to add spacing between cards
                      position: "relative",
                      transition: "transform 0.2s ease", // Add hover effect
                      "&:hover": {
                        transform: "scale(1.05)", // Increase size on hover
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {data}
                      </Typography>
                      <CardActions
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                      >
                        <IconButton>
                          <Link to={`/viewStudentUnderTeacher/${data}`}>
                            <ArrowForwardIcon />
                          </Link>
                        </IconButton>
                      </CardActions>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListSubjectForTeacher;
