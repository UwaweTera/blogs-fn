import instance from "../../axiousInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPostsThunk = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/posts`);
      return response;
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const getPostThunk = createAsyncThunk(
  "post/getPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/posts/${id}`);
      return response;
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/posts/${id}`);
      console.log("get here", response);
      
      return response;
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
