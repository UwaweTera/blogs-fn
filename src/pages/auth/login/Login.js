import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "../../../utils/schema";
import { useDispatch, useSelector } from "react-redux";
import {
  loginThunk,
  signupThunk,
} from "../../../redux/features/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth, clearLoginUser } from "../../../redux/features/slices/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const { loginLoading, loginError, loginUser } = useSelector(auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [data, setData] = useState("");
  const onSubmit = async (data) => {
    const resp = await dispatch(loginThunk(data));
    if (resp.type === "user/login/fulfilled") {
      reset();
      navigate("/");
    }
  };
  useEffect(() => {
    if (loginError && !loginUser) {
      toast.error(loginError.message || "Login failed!");
    }
  }, [loginError, navigate]);

  useEffect(() => {
    if (loginUser) {
      // Save to local storage
      localStorage.setItem("userAuth", JSON.stringify(loginUser.user));
      localStorage.setItem("token", loginUser.accessToken);
      dispatch(clearLoginUser()); // Clear loginUser from Redux state if needed
    }
  }, [loginUser, dispatch]);

  return (
    <div className="main-container flex items-center justify-center h-[80vh]">
      <ToastContainer />
      <div className="w-[90%] md:w-[50%] p-8 md:p-16 rounded bg-gray-100 ">
        <h1 className="font-medium text-center text-2xl mb-4">Login</h1>

        <div className="mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="mt-5">
              <button
                className="border rounded-lg py-2 bg-primary border-none hover:opacity-75 mt-4 w-full"
                disabled={loginLoading}
              >
                {loginLoading && (
                  <span class="loading loading-spinner loading-sm"></span>
                )}
                <span className="ml-2">Login</span>
              </button>
            </div>
            <div className="mt-8">
              <p className="text-center text-sm">
                Don't have account{" "}
                <Link to="/signup" className="text-blue-500">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
