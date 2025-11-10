import React, { useEffect, useRef, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useToast } from "../hooks/useToast";
import { errorToast, successToast } from "../utils/handleToast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  const email = location?.state?.email;

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const isEmpty = data.some((digit) => digit === "");

    if (isEmpty) {
      errorToast("Please enter all 6 digits of the OTP", toast);
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.forgotPasswordOtpVerification,
        data: {
          otp: data.join(""),
          email: email,
        },
      });

      if (response.data.success) {
        successToast(response.data.message, toast);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
            state:{
                data:response.data,
                email:email
            }
        });
      }
    } catch (error) {
      console.log("Error during otp verification ", error);
      AxiosToastError(error, toast);
    }
  };

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-sm mx-auto rounded p-4">
        <p className="font-semibold">OTP</p>

        <form className="grid gap-2 mt-6" onSubmit={handleOtpVerification}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter OTP:</label>
            <div className="flex items-center gap-2 justify-between">
              {data.map((_, index) => {
                return (
                  <input
                    key={"otp" + index}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    type="text"
                    id={`otp-${index}`}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // only digits allowed
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        if (data[index] === "" && index > 0) {
                          inputRef.current[index - 1].focus();
                        }
                      }
                    }}
                    maxLength={1}
                    className="bg-slate-50 p-2 w-full max-w-12 border border-slate-400 rounded outline-none text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-700 cursor-pointer text-white py-2 rounded font-semibold my-3 tracking-wide"
          >
            Verify
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

export default OtpVerification;
