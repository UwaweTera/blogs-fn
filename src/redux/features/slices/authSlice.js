import { createSlice } from "@reduxjs/toolkit";
import { signupThunk, loginThunk } from "../actions/userActions";

const initialState = {
  loading: false,
  error: null,
  user: null,
  loginLoading: false,
  loginError: null,
  loginUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearLoginUser: (state) => {
      state.loginUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup actions
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(signupThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
      })

      // Handle login actions
      .addCase(loginThunk.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.loginLoading = false;
        state.loginError = payload;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.loginUser = payload.data;
      });
  },
});

export const { clearUser } = authSlice.actions;
export const { clearLoginUser } = authSlice.actions;
export const auth = (state) => state.auth;
export default authSlice.reducer;
