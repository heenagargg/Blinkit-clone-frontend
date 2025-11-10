import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useToast } from "../hooks/useToast";
import { successToast } from "../utils/handleToast";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleLogin = async (data) => {
    // console.log(data);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: {
          email: data.email,
          password: data.password,
        },
      });

      // console.log(response);

      if (response.data.success) {
        successToast(response.data.message, toast);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        reset();
        navigate("/");
      }

      // console.log(response); 
    } catch (error) {
      console.log("Error during login", error);
      AxiosToastError(error, toast);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Login to Blinkey</p>

        <form className="grid gap-2 mt-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-50 p-2 border border-slate-400 rounded outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-slate-50 p-2  border border-slate-400 rounded outline-none flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:underline"
            >
              Forgot password ?{" "}
            </Link>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`${
              isValid
                ? "bg-green-800 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/register"} className="font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
