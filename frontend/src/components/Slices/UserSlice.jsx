import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [
    {
      data: "",
      token: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userData[0].data = action.payload.data;
      state.userData[0].token = action.payload.token;

      // push({ data: action.payload.data, token: action.payload.token });
    },
  },
});

// Destructure the getUser action correctly
export const { getUser } = userSlice.actions;

// Export the reducer for use in your Redux store
export default userSlice.reducer;
