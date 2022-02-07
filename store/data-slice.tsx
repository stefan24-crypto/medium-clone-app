import { createSlice } from "@reduxjs/toolkit";
import { User, Post } from "../models";

interface state {
  posts: Post[];
  users: User[];
}

const initialState: state = {
  posts: [],
  users: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
