import React, { useState, useEffect } from "react";
import { useGetSubjectsMutation } from "../../rtk/AddSlice";
import { MenuItem, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { decryptData } from "../../../assets/security/encryDecrypt";

const SubjectDropDown = ({ title, onSubjectChange }) => {
  const [subject, setSubject] = useState(0);
  const [getData, { post1 }] = useGetSubjectsMutation();
  const [posts, setPosts] = useState(post1);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    onSubjectChange(selectedSubject);
  };

  const filteredData = async () => {
    try {
      const fetchPosts = await getData().unwrap();
      const temp = decryptData(fetchPosts.data);
      setPosts(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filteredData();
  }, []);

  return (
    <form>
      <Grid item xs={12}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          label="Subject"
          onChange={handleChange}
          defaultValue="Select-a-Subject"
          style={{ minWidth: 320 }}
        >
          {posts?.map((data) => {
            return (
              <MenuItem value={data.subjectName}>{data.subjectName}</MenuItem>
            );
          })}
        </Select>
      </Grid>
    </form>
  );
};

export default SubjectDropDown;
