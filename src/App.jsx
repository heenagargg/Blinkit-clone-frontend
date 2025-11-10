import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toaster from "./toast/toaster";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import SummaryApi from "./common/SummaryApi";
import Axios from "./utils/Axios";
import AxiosToastError from "./utils/AxiosToastError";
import { useToast } from "./hooks/useToast";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";
import { MdTry } from "react-icons/md";
import { handleAddItemCart } from "./store/cartProduct";
import CartMobileLink from "./components/CartMobile";
import GlobalProvider from "./provider/GlobalProvider";

function App() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const location = useLocation();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    // console.log("user Data", userData.data);
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
        // setCategoryData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error, toast);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      if (response.data.success) {
        console.log("setAllSubCategory-------------",response.data.data)
        dispatch(setAllSubCategory(response.data.data));
      }
    } catch (error) {
      AxiosToastError(error, toast);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/checkout" && <CartMobileLink />}
    </GlobalProvider>
  );
}

export default App;