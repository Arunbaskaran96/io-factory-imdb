import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

// export const signin = createAsyncThunk("user/signin", async (user) => {
//   const data = await fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
//   const res = await data.json();
//   return res;
// });

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: false,
    user: null,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userSelector = () => {
  return useSelector((state) => state.user);
};

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
