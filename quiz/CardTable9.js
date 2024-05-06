import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NoDataFound from "./NoDataFound";
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { DialogActions, Typography } from "@mui/material";
export default function CardTable9({
  content,
  heading,
  errorMessg,
  subject,
  handleParent
}) {

  const [layout, setLayout] = React.useState({
    show: undefined,
    id: null
  });

  const handleStartQuiz = () => {

  }
  console.log('content', content)
  let flag = 0;
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {heading?.map((data) => (
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content?.map((data, index) => {
                if (data.is_available == 1) {
                  console.log('data.id', data.id)
                  flag++;
                  return (
                    <tr key={index}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.quizName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.quiz_marks}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {data.quizQuestions.length}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Button
                          variant="outlined"
                          color="neutral"
                          onClick={() => {
                            setLayout((prev) => {
                              return { ...prev, show: "fullScreen", id: data?.id }
                            });
                          }}>Start Quiz?</Button>

                        {layout && layout.id === data?.id && <React.Fragment>

                          <Modal open={!!layout.show} onClose={() => setLayout(undefined)}>
                            <ModalDialog layout={layout?.show}>
                              <ModalClose />
                              <DialogTitle>Quiz Instructions</DialogTitle>
                              <DialogContent>
                                <br />
                                <Typography variant="h6" gutterBottom>
                                  Please read the following instructions carefully:
                                </Typography>
                                <br />
                                <Typography variant="body1" gutterBottom>
                                  - <b>Attempt Limit:</b><br /> This quiz can only be attempted <i>once</i>.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Completion:</b><br /> If the quiz is closed before completion, that attempt will be counted.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Scoring:</b><br /> There is <i>no negative marking</i>. Answer carefully!
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Number of Questions:</b><br /> The quiz consists of <i>{data.quizQuestions.length} multiple-choice questions (MCQs)</i>.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Answer Options:</b><br /> Questions may have <i>one or more correct answers</i>.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Time Limit:</b><br /> You have <i>30 minutes</i> to complete the quiz.
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  - <b>Submission:</b><br /> Click 'Submit' once you have answered all questions.
                                </Typography>
                                <br />
                                <Typography variant="body2" gutterBottom>
                                  Press <code>esc</code> or click outside this dialog to close it. Remember, once you start the quiz, you must complete it in one go. Good luck!
                                </Typography>
                              </DialogContent>
                              <DialogActions style={{ justifyContent: 'flex-end' }}>
                                <Link to={`/quiz/${layout?.id}`} style={{ backgroundColor: 'lightgreen' }}>
                                  Start Quiz {layout?.id}
                                </Link>
                              </DialogActions>
                            </ModalDialog>
                          </Modal>

                        </React.Fragment>}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          {flag === 0 && <NoDataFound content={errorMessg} />}
        </div>
      </div>
    </>
  );
}
