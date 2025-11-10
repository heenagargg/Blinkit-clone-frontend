import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import { useToast } from "../hooks/useToast";
import AxiosToastError from "../utils/AxiosToastError";
import { successToast } from "../utils/handleToast";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        successToast(response.data.message, toast);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error, toast);
    }
  };

  const handleClose = async () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          <span className="text-medium text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:font-semibold"
        >
          <HiOutlineExternalLink size={15} />
        </Link>{" "}
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
          >
            Sub Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
          >
            Upload Product
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
          >
            Product
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          My orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 py-1 hover:bg-slate-100 cursor-pointer"
        >
          Save address
        </Link>
        <button
          className="text-left px-2 py-1 hover:bg-slate-100 cursor-pointer"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
