import { createSlice } from "@reduxjs/toolkit";

const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return { user: null };
  }

  const userItem = JSON.parse(userStr);
  const now = new Date();

  if (userItem.expiry && now.getTime() > userItem.expiry) {
    localStorage.removeItem("user");
    return { user: null }; 
  }

  return { user: userItem.value }; 
};

const initialState = getUser();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const now = new Date();
      const expiry = now.getTime() + 24 * 60 * 60 * 1000; 

      const userItem = {
        value: action.payload,
        expiry: expiry,
      };

      localStorage.setItem("user", JSON.stringify(userItem));
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      localStorage.removeItem("user");
      state.user = null; 
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;