import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import QuillEditor from "../../../components/common/QuillEditor";
import { createPostSchema } from "../../../utils/schema";
import { getPosts } from "../../../redux/features/slices/postSlice";
import {
  createPostThunk,
  EditPostThunk,
  getPostThunk,
} from "../../../redux/features/actions/postActions";
import { formatDate } from "../../../utils";

// Define the validation schema using yup

export const EditPost = () => {
  const { id } = useParams();
  const {
    postLoading,
    post,
    postError,
    editedPostError,
    editedPostLoading,
    editedPost,
  } = useSelector(getPosts);
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [initialImage, setInitialImage] = useState(""); // State to store initial image URL
  const [newImage, setNewImage] = useState(""); // State to store new image preview URL

  const dispatch = useDispatch();
  //   get single post
  useEffect(() => {
    dispatch(getPostThunk(id));
  }, [id, dispatch]);

  // Initialize the form with useForm
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
      setContent(post.content);
      setInitialImage(post.image);
    }
  }, [post, setValue]);

  const handleQuillChange = (value) => {
    setContent(value);
    setValue("content", value); // Update form value
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Set the preview URL for the new image
      };
      reader.readAsDataURL(file);
    } else {
      setNewImage(""); // Reset new image preview if no file is selected
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    // create formdata
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", !data.image[0] ? post.image : data.image[0]);

    const res = await dispatch(EditPostThunk({ id, data: formData }));

    if (res.type === "post/editPost/fulfilled") {
      toast.success("Post edited successfully");
    } else if (res.type === "post/editPost/rejected") {
      toast.error(editedPostError.message || "Error creating post");
    }
  };

  return (
    <div className="main-container">
      <ToastContainer />
      {postLoading ? (
        <div className="my-4 flex justify-center w-full">
          <span class="loading loading-bars loading-md"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="p-8 md:p-16 rounded bg-gray-100 ">
            <h1 className="font-medium  text-2xl mb-4">Edit Post</h1>

            <div className="mt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <label htmlFor="title" className="my-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    className="input input-bordered w-full"
                    {...register("title")} // Register input field
                  />
                </div>

                <p className="my-2">Post Content</p>
                <QuillEditor value={content} onChange={handleQuillChange} />

                <div className="mt-4">
                  <label htmlFor="image" className="my-2">
                    Image
                  </label>
                  <div className="my-2">
                    {newImage ? (
                      <img
                        src={newImage}
                        alt="New Preview"
                        className="w-[100px] h-[100px] object-cover my-2"
                      />
                    ) : initialImage ? (
                      <img
                        src={initialImage}
                        alt="Initial Preview"
                        className="w-[100px] h-[100px] object-cover my-2"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    placeholder="Enter Post Image"
                    className="file-input file-input-bordered w-full"
                    {...register("image")} // Register input field
                    onChange={handleImageChange}
                  />
                </div>

                <div className="mt-5">
                  <button
                    className="border rounded-lg py-2 bg-primary border-none hover:opacity-75 mt-4 w-full"
                    disabled={editedPostLoading}
                  >
                    {editedPostLoading && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}
                    <span className="ml-2">Edit Post</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="p-8 md:p-16 rounded bg-gray-100 ">
            <h1 className="font-medium  text-2xl mb-4">Comments</h1>
            <div className="my-5 border-t">
              {post?.comments?.length ? (
                <div>
                  {post.comments.map((comment, index) => (
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
                            <div>{formatDate(comment.updatedAt)}</div>
                          </div>
                        </div>

                        <div className="text-lg">{comment.comment}</div>
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
      )}
    </div>
  );
};
