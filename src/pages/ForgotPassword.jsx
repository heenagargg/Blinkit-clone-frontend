import { useForm } from "react-hook-form";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useToast } from "../hooks/useToast";
import { successToast } from "../utils/handleToast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleForgotPassword = async (data) => {
    // console.log(data);
    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: {
          email: data.email,
        },
      });

      // console.log(response);

      if (response.data.success) {
        successToast(response.data.message, toast);

        navigate("/verify-otp", {
          state: {
            email: data.email,
          },
        });
        reset();
      }

      // console.log(response);
    } catch (error) {
      console.log("Error during forgot password ", error);
      AxiosToastError(error, toast);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <p>Forgot Password</p>

        <form
          className="grid gap-2 mt-6"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-50 p-2  border border-slate-400 rounded outline-none"
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

          <button
            type="submit"
            disabled={!isValid}
            className={`${
              isValid
                ? "bg-green-800 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Send Otp
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

export default ForgotPassword;
