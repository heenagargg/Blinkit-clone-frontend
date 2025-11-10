import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useToast } from "../hooks/useToast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import { successToast } from "../utils/handleToast";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const [openDeleteConfirmatinBox, setOpenDeleteConfirmationBox] =
    useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  // console.log("All category", allCategory);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      if (response.data.success) {
        successToast(response.data.message, toast);
        fetchCategory();
        setOpenDeleteConfirmationBox(false);
      }
    } catch (error) {
      AxiosToastError(error, toast);
    }
  };

  // useEffect(() => {
  //   setCategoryData(allCategory);
  // }, [allCategory]);
  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div className="w-32 h-56 rounded shadow-md" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenDeleteConfirmationBox(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openDeleteConfirmatinBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmationBox(false)}
          confirm={handleDeleteCategory}
          close={() => setOpenDeleteConfirmationBox(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
