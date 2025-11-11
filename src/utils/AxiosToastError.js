const AxiosToastError = (error, toast) => {
  const errorMessage = error.response?.data?.message;
  if (error.response?.status === 401 || errorMessage === "Token not found") {
    return toast({
      variant: "error",
      title: "Session expired. Please login again.",
    });
  } else if (error.response) {
    // Server responded with a status other than 2xx
    return toast({
      variant: "error",
      title: error.response?.data?.message || "Something went wrong",
    });
  } else if (error.request) {
    // Request was made but no response received
    return toast({
      variant: "error",
      title: "No response from server. Please try again later.",
    });
  } else {
    // Something happened while setting up the request
    return toast({
      variant: "error",
      title: error.message || "Unexpected error occurred",
    });
  }
};

export default AxiosToastError;
