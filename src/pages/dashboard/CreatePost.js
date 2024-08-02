import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import QuillEditor from "../../components/common/QuillEditor";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [content, setContent] = useState("");
  const [data, setData] = useState("");
  //   const { loading, error, user } = useSelector(auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(signupSchema),
  });

  const handleQuillChange = (value) => {
    setContent(value);
  };

  const onSubmit = async (data) => {
    // const resp = await dispatch(signupThunk(data));
    // if (resp.type === "user/signup/fulfilled") {
    //   reset();
    //   toast.success("Signup successful!");
    //   dispatch(clearUser());
    //   //   navigate to login page after 2 second
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 2000);
    // }
  };
  //   useEffect(() => {
  //     if (error && !user) {
  //       toast.error(error.message || "Signup failed!");
  //     }
  //   }, [error, navigate]);

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
                type="title"
                name="title"
                placeholder="Enter  User Name"
                class="input input-bordered w-full"
                {...register("title")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.name?.message}
              </p>
            </div>
            <p className="my-2">post Content</p>
            <QuillEditor value={content} onChange={handleQuillChange} />
            <div className="mt-4">
              <label htmlFor="email" className="my-2">
                {" "}
                Image
              </label>
              <input
                type="file"
                name="image"
                placeholder="Enter Post Image"
                class="file-input file-input-bordered w-full"
                {...register("image")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.email?.message}
              </p>
            </div>

            <div className="mt-5">
              <button
                className="border rounded-lg py-2 bg-primary border-none hover:opacity-75 mt-4 w-full"
                disabled={loading}
              >
                {loading && (
                  <span class="loading loading-spinner loading-sm"></span>
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
