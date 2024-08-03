import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getPostCommentsThunk,
  getPostsThunk,
  getPostThunk,
  postCommentThunk,
} from "../../redux/features/actions/postActions";
import { getPosts } from "../../redux/features/slices/postSlice";
import { formatDate } from "../../utils";
import { FaRegComment } from "react-icons/fa";
import Description from "../../components/Description";
import { ToastContainer, toast } from "react-toastify";

export const Post = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const {
    postLoading,
    post,
    postError,
    loading,
    posts,
    error,
    comments,
    commentsError,
    commentsLoading,
    createdCommentError,
    createdCommentLoading,
    createdComment,
  } = useSelector(getPosts);

  const dispatch = useDispatch();
  //   get single post
  useEffect(() => {
    dispatch(getPostThunk(id));
  }, [id]);

  useEffect(() => {
    dispatch(getPostCommentsThunk(id));
  }, [id]);

  //   get related posts
  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);
  // console.log("comments", comments);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim() === "") {
      // Optionally show an error message if the comment is empty
      toast.error("Please enter a comment");
      return;
    }
    const res = await dispatch(
      postCommentThunk({ id, data: { message: comment } })
    );

    if (res.type === "post/postComment/fulfilled") {
      toast.success("Comment successfully");
      setComment("");
      dispatch(getPostCommentsThunk(id));
    } else if (res.type === "post/postComment/rejected") {
      toast.error(createdCommentError.message || "Error creating post");
    }
  };
  // console.log("comments: ", comments);
  return (
    <div className="main-container flex flex-col md:flex-row">
      <ToastContainer />
      <div className="post-container pr-10 w-[100%]  md:w-[75%] flex  justify-center">
        {postLoading ? (
          <div>
            <div className="my-4 flex justify-center w-full">
              <span class="loading loading-bars loading-md"></span>
            </div>
          </div>
        ) : (
          <>
            {!post ? (
              <div>
                <h1>Post not found</h1>
              </div>
            ) : (
              <div className=" w-[100%]  md:w-[85%] ">
                <div className="">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-[100%] h-[60vh] object-cover"
                  />
                </div>
                <div className="post-header my-4 text-4xl font-serif font-semibold">
                  {post.title}
                </div>
                <div className="flex items-center border-b py-3">
                  <div class="avatar">
                    <div class="w-12 rounded-full">
                      <img src="https://res.cloudinary.com/dqy4dps7q/image/upload/v1717308706/user_ye5vmx.png" />
                    </div>
                  </div>
                  <div className="ml-2 font-medium">
                    <div>
                      By{" "}
                      <span className="capitalize">{post.author.username}</span>
                    </div>
                    <div>{formatDate(post.updatedAt)}</div>
                  </div>
                </div>
                <div></div>
                <div className="post-header text-lg mt-3">
                  <Description description={post.content} showMore={false} />
                </div>

                {/* comment sidebar */}
                <div className="drawer drawer-end">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content w-[50px]">
                    <label for="my-drawer-4" class="drawer-button ">
                      <div className="flex items-center py-5 cursor-pointer">
                        <FaRegComment size={24} />{" "}
                        <span className="mx-2 font-medium text-lg">
                          {comments?.length}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="drawer-side z-40 ">
                    <label
                      for="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <div className="menu bg-white text-base-content min-h-full w-[70%] md:w-[27%] p-5">
                      <h1 className="font-semibold text-xl">
                        Comments <span>( {comments?.length} )</span>{" "}
                      </h1>

                      <div className="bg-gray-100 shadow p-4  my-5 rounded  ">
                        <div>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Bio"
                            value={comment}
                            onChange={handleInputChange}
                          ></textarea>

                          <div className="flex justify-end mt-3">
                            <button
                              className="font-medium text-md hover:opacity-75 transation duration-500 bg-primary rounded-full px-5 py-2"
                              onClick={handleSubmit}
                              disabled={createdCommentLoading}
                            >
                              {createdCommentLoading && (
                                <span className="loading loading-spinner loading-sm"></span>
                              )}
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="my-5 border-t">
                        {commentsLoading ? (
                          <div>loading...</div>
                        ) : (
                          <>
                            {comments?.length ? (
                              <div>
                                {comments.map((comment, index) => (
                                  <div key={index} className="border-b py-5">
                                    <div>
                                      <div className="flex items-center py-3">
                                        <div class="avatar">
                                          <div class="w-10 rounded-full">
                                            <img src="https://res.cloudinary.com/dqy4dps7q/image/upload/v1717308706/user_ye5vmx.png" />
                                          </div>
                                        </div>
                                        <div className="ml-2 ">
                                          <div>
                                            By{" "}
                                            <span className="capitalize">
                                              {comment.author.username}
                                            </span>
                                          </div>
                                          <div>
                                            {formatDate(comment.updatedAt)}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="text-lg">
                                        {comment.comment}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
                                <p className="text-lg font-medium text-gray-600 my-3">
                                  No comments yet
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className=" md:border-l md:pl-10 w-[100%] md:w-[25%] mt-5 md:mt-0">
        <h1 className="font-medium text-2xl">Recommended</h1>

        <div>
          {loading ? (
            <div>loading..</div>
          ) : (
            <>
              {posts?.slice(0, 5).map((post) => (
                <Link
                  to={`/posts/${post.id}`}
                  key={post.id}
                  className="bg-white p-4 rounded-md block my-4
                    hover:bg-gray-100 cursor-pointer flex items-center w-full"
                >
                  <div>
                    <div class="avatar">
                      <div class="w-16 rounded">
                        <img src={post.image} alt={post.title} />
                      </div>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h1 className="text-lg font-medium">{post.title}</h1>
                    <p className="text-sm text-left">
                      {" "}
                      <Description
                        description={post.content}
                        showMore={false}
                        maxLength={40}
                      />
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
