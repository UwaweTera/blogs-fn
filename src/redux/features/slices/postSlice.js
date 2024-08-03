import { createSlice } from "@reduxjs/toolkit";
import {
  createPostThunk,
  deletePostThunk,
  EditPostThunk,
  getPostCommentsThunk,
  getPostsThunk,
  getPostThunk,
  getUserPostsThunk,
  postCommentThunk,
} from "../actions/postActions";

const initialState = {
  posts: null,
  loading: false,
  error: { message: undefined, status: false },
  post: null,
  postLoading: false,
  postError: { message: undefined, status: false },
  userPosts: null,
  userPostsLoading: false,
  userPostsError: null,
  createdPost: null,
  createPostLoading: false,
  createPostError: null,
  editedPost: null,
  editedPostLoading: false,
  editedPostError: null,
  deletedPost: null,
  deleteLoading: false,
  deleteError: null,
  comments: null,
  commentsLoading: false,
  commentsError: null,
  createdComment: null,
  createdCommentLoading: false,
  createdCommentError: null,
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
      // get user posts
      .addCase(getUserPostsThunk.pending, (state) => {
        state.userPostsLoading = true;
      })
      .addCase(getUserPostsThunk.rejected, (state, { payload }) => {
        state.userPostsLoading = false;
        state.userPostsError = payload;
      })
      .addCase(getUserPostsThunk.fulfilled, (state, { payload }) => {
        state.userPostsLoading = false;
        state.userPosts = payload.data;
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

      // slices for create post
      .addCase(createPostThunk.pending, (state) => {
        state.createPostLoading = true;
      })
      .addCase(createPostThunk.rejected, (state, { payload }) => {
        // console.log("delete fail payload: ", payload);
        state.createPostLoading = false;
        state.createPostError = payload;
      })
      .addCase(createPostThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.createPostLoading = false;
          state.createdPost = payload;
        }
      })

      // slices for edit post
      .addCase(EditPostThunk.pending, (state) => {
        state.editedPostLoading = true;
      })
      .addCase(EditPostThunk.rejected, (state, { payload }) => {
        // console.log("delete fail payload: ", payload);
        state.editedPostLoading = false;
        state.editedPostError = payload;
      })
      .addCase(EditPostThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.editedPostLoading = false;
          state.editedPost = payload;
        }
      })

      // slices for delete post
      .addCase(deletePostThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePostThunk.rejected, (state, { payload }) => {
        // console.log("delete fail payload: ", payload);
        state.deleteLoading = false;
        state.deleteError = payload;
      })
      .addCase(deletePostThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) {
          state.deleteLoading = false;
          state.deletedPost = payload;
        }
      })

      // slices for get comments
      .addCase(getPostCommentsThunk.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(getPostCommentsThunk.rejected, (state, { payload }) => {
        // console.log("delete fail payload: ", payload);
        state.commentsLoading = false;
        state.commentsError = payload;
      })
      .addCase(getPostCommentsThunk.fulfilled, (state, { payload }) => {
        // console.log('payload comm ', payload)
        if (payload.status === 200) {
          state.commentsLoading = false;
          state.comments = payload.data;
        }
      })
      // slices for post comments
      .addCase(postCommentThunk.pending, (state) => {
        state.createdCommentLoading = true;
      })
      .addCase(postCommentThunk.rejected, (state, { payload }) => {
        // console.log("delete fail payload: ", payload);
        state.createdCommentLoading = false;
        state.createdCommentError = payload;
      })
      .addCase(postCommentThunk.fulfilled, (state, { payload }) => {
        console.log("payload comm ", payload);
        if (payload.status === 200) {
          state.createdCommentLoading = false;
          state.createdComment = payload.data;
        }
      });
  },
});

export const { clearDeletedPost } = PostSlice.actions;
export const getPosts = (state) => state.getPosts;
export default PostSlice.reducer;
