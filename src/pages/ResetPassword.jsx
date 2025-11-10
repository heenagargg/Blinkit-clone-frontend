import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { successToast } from "../utils/handleToast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleResetPassword = async (data) => {
    // console.log(data);
    try {
      const response = await Axios({
        ...SummaryApi.resetPassowrd,
        data: {
          email: data.email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      });

      // console.log(response);

      if (response.data.success) {
        successToast(response.data.message, toast);
        reset();
        navigate("/login");
      }

      // console.log(response);
    } catch (error) {
      console.log("Error during registration", error);
      AxiosToastError(error, toast);
    }
  };

  useEffect(() => {
    // if (!location?.state?.data?.success) {
    //   navigate("/");
    // }
    if (location?.state?.email) {
      setValue("email", location.state.email);
    }
  }, []);
  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Reset Password</p>

        <form
          className="grid gap-2 mt-6"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <div className="grid gap-1">
            <label htmlFor="newPassword"> New Password:</label>
            <div className="bg-slate-50 p-2  border border-slate-400 rounded outline-none flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="newPassword"
                placeholder="Enter new password"
                className="w-full outline-none"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have atleast 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[\d@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-slate-50 p-2  border border-slate-400 rounded outline-none flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter confirm password"
                className="w-full outline-none"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
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
            Change Password
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="font-semibold">
            login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
