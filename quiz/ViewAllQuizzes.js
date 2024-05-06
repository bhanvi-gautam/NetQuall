import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useGetQuizMutation } from '../rtk/AddSlice';
import { decryptData } from '../../assets/security/encryDecrypt';
import { ToastContainer } from 'react-toastify';
import CardTable8 from '../Cards/CardTable8';
import TableShimmer from '../Effects/TableShimmer'
import { notifyError, notifySuccess } from "../../toast";

const ViewAllQuizzes = () => {
    const [getQuizzes,{isLoading,isSuccess,isError,post}]=useGetQuizMutation();
    const [posts,setPosts]=useState(post);
    const userId=localStorage.getItem('userId');

    const getQuizData=async(value)=>{
        getQuizzes({id:userId}).then((fetchQuizzes)=>{
          console.log('fetchQuizzes', fetchQuizzes)
            const temp=decryptData(fetchQuizzes.data.encryptedData);
            setPosts(temp);
            if(value){
              notifySuccess(value)
            }
        }).catch((error)=>{
          console.log('error', error)
        })
    }

    useEffect(()=>{
        getQuizData();
    },[])

    console.log('posts', posts)
  return (
    <Box className="w-full mb-12">
        <Box className= "relative md:pt-30 pb-32 pt-12"  style={{backgroundColor:'#0099CC'}}>
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
              View All quizzes
            </Typography>
          </Box>
        </Box>
        {isLoading && <TableShimmer />}
        {isSuccess && (
          <div
            className="relative pb-2 "
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "white",
            }}
          >
            <CardTable8

            content ={posts?.data}
            errorMessg={"No Student available"}
            getQuizData={getQuizData}
            subject={posts?.subjectName}
            heading={['Quiz Name','Subject','Marks','Action','']}
            />
            </div>
        )}
        <ToastContainer containerId="A"/>
        <ToastContainer containerId="B"/>
    </Box>
  )
}

export default ViewAllQuizzes
