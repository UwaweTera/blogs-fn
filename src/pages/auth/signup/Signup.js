import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../../../redux/features/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth, clearUser } from "../../../redux/features/slices/authSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const [data, setData] = useState("");
  const onSubmit = async (data) => {
    const resp = await dispatch(signupThunk(data));
    if (resp.type === "user/signup/fulfilled") {
      reset();
      toast.success("Signup successful!");
      dispatch(clearUser());
      //   navigate to login page after 2 second
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  useEffect(() => {
    if (error && !user) {
      toast.error(error.message || "Signup failed!");
    }
  }, [error, navigate]);

  return (
    <div className="main-container flex items-center justify-center h-[80vh]">
      <ToastContainer />
      <div className="w-[90%] md:w-[50%] p-8 md:p-16 rounded bg-gray-100 ">
        <h1 className="font-medium text-center text-2xl mb-4">SignUp</h1>

        <div className="mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter  User Name"
                class="input input-bordered w-full"
                {...register("name")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.name?.message}
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                class="input input-bordered w-full"
                {...register("email")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.email?.message}
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Type Password"
                class="input input-bordered w-full"
                {...register("password")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.password?.message}
              </p>
            </div>
            <div className="mt-4">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                placeholder="Rewrite Password"
                class="input input-bordered w-full"
                {...register("confirmPassword")}
              />
              <p className="text-sm text-red-500 my-2">
                {errors.confirmPassword?.message}
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
                <span className="ml-2">SignUp</span>
              </button>
            </div>
            <div className="mt-8">
              <p className="text-center text-sm">
                Already have Account{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
