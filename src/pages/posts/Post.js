import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getPostsThunk,
  getPostThunk,
} from "../../redux/features/actions/postActions";
import { getPosts } from "../../redux/features/slices/postSlice";
import { formatDate } from "../../utils";
import { FaRegComment } from "react-icons/fa";

export const Post = () => {
  const { id } = useParams();
  const { postLoading, post, postError, loading, posts, error } =
    useSelector(getPosts);

  const dispatch = useDispatch();
  //   get single post
  useEffect(() => {
    dispatch(getPostThunk(id));
  }, [id]);

  //   get related posts
  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);
  console.log("posts=", post);
  return (
    <div className="main-container flex flex-col md:flex-row">
      <div className="post-container pr-10 w-[100%]  md:w-[75%] flex  justify-center">
        {postLoading ? (
          <div>loading...</div>
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
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
                <div className="post-header text-lg mt-3">{post.content}</div>

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
                          {post?.comments?.length}
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
                        Comments <span>( {post.comments.length} )</span>{" "}
                      </h1>

                      <div className="bg-gray-100 shadow p-4  my-5 rounded  ">
                        <div>
                          <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Bio"
                          ></textarea>

                          <div className="flex justify-end mt-3">
                            <button className="font-medium text-md hover:opacity-75 transation duration-500 bg-primary rounded-full px-5 py-2">
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="my-5 border-t">
                        {post.comments.length ? (
                          <div>
                            {post.comments.map((comment, index) => (
                              <div key={index} className="border-b py-5">
                                <div>
                                  <div className="flex items-center py-3">
                                    <div class="avatar">
                                      <div class="w-10 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                      </div>
                                    </div>
                                    <div className="ml-2 ">
                                      <div>
                                        By{" "}
                                        <span className="capitalize">
                                          {comment.author.username}
                                        </span>
                                      </div>
                                      <div>{formatDate(comment.updatedAt)}</div>
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
              {posts?.map((post) => (
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
                    <p className="text-sm">{post.content}</p>
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
