const AxiosToastError = (error, toast) => {
  if (error.response) {
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
