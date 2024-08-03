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

export const getUserPostsThunk = createAsyncThunk(
  "post/getUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/posts/user`);
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
export const createPostThunk = createAsyncThunk(
  "post/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/posts`, data);
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

export const EditPostThunk = createAsyncThunk(
  "post/editPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/posts/${id}`, data);
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
      // console.log("get here", response);

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

export const getPostCommentsThunk = createAsyncThunk(
  "post/getPostComments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/posts/${id}/comments`);
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

export const postCommentThunk = createAsyncThunk(
  "post/postComment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/posts/${id}/comments`, data);
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
