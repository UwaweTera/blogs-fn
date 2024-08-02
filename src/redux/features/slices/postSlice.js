import { createSlice } from "@reduxjs/toolkit";
import {
  deletePostThunk,
  getPostsThunk,
  getPostThunk,
} from "../actions/postActions";

const initialState = {
  posts: null,
  loading: false,
  error: { message: undefined, status: false },
  post: null,
  postLoading: false,
  postError: { message: undefined, status: false },
  deletedPost: null,
  deleteLoading: false,
  deleteError: { message: undefined, status: false },
};

const PostSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {
    clearDeletedPost: (state) => {
      state.deletedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error.status = payload.error?.response?.status || "500";
        state.error.message =
          payload.error?.response?.message || "Server Error";
      })
      .addCase(getPostsThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.loading = false;
          state.posts = payload.data;
        } else {
          state.loading = false;
          state.error.status = payload.error?.response?.status || "500";
          state.error.message = payload.error?.response?.message || "Error";
        }
      })
      // slices for single post
      .addCase(getPostThunk.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(getPostThunk.rejected, (state, { payload }) => {
        state.postLoading = false;
        state.postError.status = payload.error?.response?.status || "500";
        state.postError.message =
          payload.error?.response?.message || "Server Error";
      })
      .addCase(getPostThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.postLoading = false;
          state.post = payload.data;
        } else {
          state.postLoading = false;
          state.postError.status = payload.error?.response?.status || "500";
          state.postError.message = payload.error?.response?.message || "Error";
        }
      })

      // slices for delete post
      .addCase(deletePostThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePostThunk.rejected, (state, { payload }) => {
        console.log("delete fail payload: ", payload);
        state.deleteLoading = false;
        state.deleteError.status = payload?.status || "500";
        state.deleteError.message = payload?.message || "Server Error";
      })
      .addCase(deletePostThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.deleteLoading = false;
          state.deletedPost = payload
        }
      });
  },
});

export const { clearDeletedPost } = PostSlice.actions;
export const getPosts = (state) => state.getPosts;
export default PostSlice.reducer;
