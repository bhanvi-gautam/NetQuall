import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentMutation, useGetQuizMutation } from "../rtk/AddSlice";
import { decryptData, encryptData } from "../../assets/security/encryDecrypt";
import CardTable6 from "../Cards/CardTable6.js";
import TableShimmer from "../Effects/TableShimmer";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { notifySuccess } from "../../toast";
import { ToastContainer } from "react-toastify";
import CardTable9 from "../Cards/CardTable9.js";

const ViewSubjectQuiz = () => {
  const subject = useParams();
  const [getData, { isLoading, isSuccess, post }] = useGetQuizMutation();
  const [posts, setPosts] = useState(post);
  const abc = async () => {
    const encryptedData=encryptData({subject: subject.subject})
    const fetchPosts = await getData({id:encryptedData}).unwrap();
    const temp = decryptData(fetchPosts.encryptedData);
    setPosts(temp);
  };
  
  const handleParent=()=>{
    abc();
  }
  console.log('posts', posts)

  useEffect(() => {
    abc();
  }, []);

  return (
    <>
      <Box className="w-full mb-12">
        <Box className="relative md:pt-30 pb-32 pt-12" style={{ backgroundColor: '#0099CC' }}>
          <Box
            className="px-4"
            sx={{
              color: "white",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
              <Typography gutterBottom variant="h4" component="div">
              {posts?.subjectName} Quizzes
              </Typography> 
              </Box>
        </Box>
        {isLoading && <TableShimmer />}

        {isSuccess && (
          <div
          className="relative pb-2"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            backgroundColor: "white",
          }}
        >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="info" style={{ margin: '10px' }}>
              Please note that each quiz can be attempted only once. There is no negative marking, so feel free to make your best guess! The quizzes are of multiple-choice question (MCQ) type, designed to test your knowledge in a fun and engaging way. Good luck!
              </Alert>
            </Stack>

            <CardTable9
              content={posts.data}
              heading={[
                "QuizName",
                "Marks",
                "No of Questions",
                "Start Quiz?",
              ]}
              subject={subject.subject}
              roleId={2}
              errorMessg={"No Quiz available"}
              handleParent={handleParent}
            />
          </div>
        )}
      </Box>
      <ToastContainer containerId="A" />
    </>
  );
};

export default ViewSubjectQuiz;
