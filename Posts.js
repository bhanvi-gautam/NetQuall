import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../state/Reducer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./Posts.css";
const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle" || postStatus === "failed") {
      dispatch(
        fetchPosts({
          company_Id: 2,
          timeFilter: "Today",
        })
      );
    }
  }, []);

  let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postStatus === 'succeeded') {
        // Check if posts.data is an array before mapping
        if (Array.isArray(posts.data)) {
            content = (
                <div className="box-container">
                    {posts.data.map((post, index) => (
                        <div key={index} className="lead-count">
                            <p>NoAttemptLeadCount: {post.NoAttemptLeadCount || 'N/A'}</p>
                            <p>TotalLeadCount: {post.TotalLeadCount || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            );
        } else {
            content = <p>Data is not in the expected format.</p>;
        }
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default Posts;
