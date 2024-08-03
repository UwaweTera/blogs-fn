import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import QuillEditor from "../../components/common/QuillEditor";
import { createPostSchema } from "../../utils/schema";
import { getPosts } from "../../redux/features/slices/postSlice";
import { createPostThunk } from "../../redux/features/actions/postActions";

// Define the validation schema using yup

export const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { createPostError, createPostLoading, createdPost } =
    useSelector(getPosts);
  const dispatch = useDispatch();

  // Initialize the form with useForm
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPostSchema),
  });

  const handleQuillChange = (value) => {
    setContent(value);
    setValue("content", value); // Update form value
  };

  const onSubmit = async (data) => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const userId = userAuth?.id;
    // create formdata
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]); // Append the first image file

    const res = await dispatch(createPostThunk(formData));

    if (res.type === "post/createPost/fulfilled") {
      toast.success("Post created successfully");
      reset();
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else if (res.type === "post/createPost/rejected") {
      toast.error(createPostError.message || "Error creating post");
    }
  };

  return (
    <div className="main-container flex items-center justify-center h-[80vh]">
      <ToastContainer />
      <div className="w-[90%] md:w-[50%] p-8 md:p-16 rounded bg-gray-100 ">
        <h1 className="font-medium text-center text-2xl mb-4">Create Post</h1>

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
              <p className="text-sm text-red-500 my-2">
                {errors.title?.message}
              </p>
            </div>

            <p className="my-2">Post Content</p>
            <QuillEditor value={content} onChange={handleQuillChange} />
            <p className="text-sm text-red-500 my-2">
              {errors.content?.message}
            </p>

            <div className="mt-4">
              <label htmlFor="image" className="my-2">
                Image
              </label>
              <input
                type="file"
                name="image"
                placeholder="Enter Post Image"
                className="file-input file-input-bordered w-full"
                {...register("image")} // Register input field
              />
              <p className="text-sm text-red-500 my-2">
                {errors.image?.message}
              </p>
            </div>

            <div className="mt-5">
              <button
                className="border rounded-lg py-2 bg-primary border-none hover:opacity-75 mt-4 w-full"
                disabled={createPostLoading}
              >
                {createPostLoading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                <span className="ml-2">Create Post</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
