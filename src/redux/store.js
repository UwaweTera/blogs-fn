import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/slices/postSlice";
import authReducer from "./features/slices/authSlice"

export const reducers = {
  getPosts: postReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer: {
    ...reducers,
  },
});

export default store;
