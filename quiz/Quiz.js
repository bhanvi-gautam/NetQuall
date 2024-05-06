import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOneQuizMutation } from '../rtk/AddSlice';
import { decryptData, encryptData } from '../../assets/security/encryDecrypt';
import { Box, Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Loading from '../../views/auth/Parts/Loading';
import Timer from './Parts/Timer'
import Chip from '@mui/material/Chip';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const quizId = useParams();
  const [getData, { isLoading, isSuccess, post }] = useGetOneQuizMutation();
  const [posts, setPosts] = useState(post);
  const [quizData, setQuizData] = useState(post);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const getQuiz = async () => {
    const encryptedId = encryptData(quizId);
    await getData({ id: encryptedId }).then((data) => {
      console.log('data', data.data.encryptedData)
      const temp = decryptData(data.data.encryptedData);
      setPosts(temp.quizQuestions);
      setQuizData(temp)
    })
  }
  useEffect(() => {
    getQuiz();
  }, []);

  
  console.log('selectedOptions', selectedOptions)


  const handleOptionChange = (option, index) => {
    if (option.is_correct) {
      setCorrectAnswers(prevState => [...prevState, option.option_text]);
    }
    setVisitedQuestions(prevState => [...prevState, currentQuestion]);
    if (posts[currentQuestion]?.question_type === false) {
      setSelectedOptions([option.option_text]);
    } else {
      setSelectedOptions(prevState => {
        if (prevState.includes(option.option_text)) {
          return prevState.filter(opt => opt !== option.option_text);
        } else {
          return [...prevState, option.option_text];
        }
      });
    }
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prevState => [...prevState, currentQuestion]);
  };


  return (
    <>
      {isLoading && <Loading />}
      {isSuccess &&
        <Box className="w-full mb-12">
          <Box className="relative md:pt-30 pb-32 pt-12" style={{ backgroundColor: '#135268' }}>
            <Box
              className="px-4"
              sx={{
                color: "white",
                width: "100%",
                position: "absolute",
                bottom: 0,
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography gutterBottom variant="h4" component="div" style={{ textTransform: "capitalize" }}>{quizData?.quizName}</Typography>
                <Typography gutterBottom variant="h5" component="div" ><Timer /></Typography>
              </Stack>
            </Box>
          </Box>
          <div
            className="relative pb-2 pt-2 "
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "white",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Item>
                  <Stack direction="row" spacing={1}>
                    {posts.map((_, index) => (
                      <Chip
                        label={index + 1}
                        clickable
                        color={markedForReview.includes(index) ? 'warning' : visitedQuestions.includes(index) ? 'success' : 'default'}
                        onClick={() => setCurrentQuestion(index)}
                      />
                    ))}
                  </Stack></Item>
              </Grid>
              <Grid xs={8}>
                <Item>
                  <Stack direction="row" justifyContent="space-between">
                    <Grid xs={7}><Typography gutterBottom variant="h5" component="div" >Question {currentQuestion + 1}</Typography>
                      <Typography gutterBottom variant="h6" component="div" >{posts[currentQuestion]?.question}</Typography><Stack justifyContent="center" alignItems="center">
                        {posts[currentQuestion]?.quizOptions.map((option, index) => {
                          if (posts[currentQuestion]?.question_type === false) {
                            return (
                              <FormControlLabel
                                control={<Radio />}
                                label={option.option_text}
                                checked={selectedOptions.includes(option.option_text)}
                                onChange={() => handleOptionChange(option, index)}
                                key={index}
                              />
                            );
                          } else {
                            return (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={option.option_text}
                                checked={selectedOptions.includes(option.option_text)}
                                onChange={() => handleOptionChange(option, index)}
                                key={index}
                              />
                            );
                          }
                        })}
                      </Stack></Grid>
                    <Grid xs={2}> <Typography gutterBottom variant="h6" component="div" >Marks:{posts[currentQuestion]?.question_marks}</Typography></Grid>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleMarkForReview}
                    >
                      Mark for Review
                    </Button>
                    {currentQuestion < posts?.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setShowScore(true);
                          setScore(correctAnswers.length);
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </Stack>
                </Item>
              </Grid>


            </Grid>



          </div>
        </Box>
      }
    </>
  )
}

export default Quiz


