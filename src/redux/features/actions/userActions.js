import instance from "../../axiousInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupThunk = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/auth/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      // Extract only the necessary serializable parts
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/auth/login`, {
        email: data.email,
        password: data.password,
      });
      
      localStorage.removeItem("userAuth");
      localStorage.removeItem("token");
      const { user, accessToken } = response.data;
      localStorage.setItem("userAuth", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      return { data: response.data, status: response.status };
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
