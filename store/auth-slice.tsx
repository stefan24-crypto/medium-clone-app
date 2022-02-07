import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models";

interface state {
  curUser: User | any;
}

const initialState: state = {
  curUser: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCurUser(state, action) {
      state.curUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
