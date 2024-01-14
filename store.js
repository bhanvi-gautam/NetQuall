import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './Reducer'
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
