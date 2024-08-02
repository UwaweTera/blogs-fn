import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/features/slices/postSlice";
import { getPostsThunk } from "../../redux/features/actions/postActions";
import { MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../utils";
import DeletePost from "../../components/Actions/DeletePost";
import { ToastContainer } from "react-toastify";

export const Dashboard = () => {
  const { loading, posts, error } = useSelector(getPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);
  return (
    <div className="main-container">
      <ToastContainer />
      <h1 className="font-medium text-lg">Dashboard</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h2 className="font-medium text-lg">Total Posts</h2>
            <p className="text-3xl font-bold">1000</p>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h2 className="font-medium text-lg">Total Comments</h2>
            <p className="text-3xl font-bold">
              {posts?.length
                ? posts.reduce((acc, post) => acc + post.comments.length, 0)
                : 0}
            </p>
          </div>
        </div>
        {/* <div>
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h2 className="font-medium text-lg">Total Users</h2>
            <p className="text-3xl font-bold">1000</p>
          </div>
        </div> */}
      </div>

      <div className="mt-10">
        <div className="flex justify-end">
          <Link
            to={"/dashboard/posts/create"}
            className="block flex items-center bg-primary text-white rounded py-2 px-3 hover:opacity-75"
          >
            <span>
              <IoMdAdd />
            </span>
            <span className="ml-1"> Create Post</span>
          </Link>
        </div>

        <div>
          <table className="table mt-3 table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Post Title</th>
                <th>Post Content</th>
                <th>Post Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div>
                  <span class="loading loading-bars loading-md"></span>
                </div>
              ) : (
                <>
                  {posts?.length ? (
                    <>
                      {posts?.map((post, index) => (
                        <tr key={post.id}>
                          <td>{index + 1}</td>
                          <td className="flex items-center py-4 px-6 text-sm text-gray-500">
                            <div>
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-12 h-12 rounded-full"
                              />
                            </div>
                            <div className="ml-3">
                              <b>{post.title}</b>
                            </div>
                          </td>
                          <td>{post.content}</td>
                          <td>{formatDate(post.updatedAt)}</td>
                          <td className="flex items-center">
                            <Link
                              to={`/dashboard/posts/${post.id}`}
                              className="block"
                            >
                              <span>
                                <MdEdit size={20} />
                              </span>
                            </Link>
                            <button>
                              <DeletePost id={post.id} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className="text-center">No Post found</p>
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
