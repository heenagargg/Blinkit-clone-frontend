import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Sending access token in the header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//extend the life span of access token with help of refresh token
Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const { config, response } = error; 
    let originRequest = error.config; //original Request 
    if (error.response.status === 401 && !originRequest.retry) {  // 401 - for expired or invalid token
      {
        originRequest.retry = true;  // to avoid infinite loop - refresh token storms
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return Axios(originRequest); // will retry original request
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    // console.log(response);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;


// Full Flow Example
// User logs in → Backend sends accessToken + refreshToken.
// You store both in localStorage.
// When making API calls:
    // Request interceptor attaches accessToken.
    // If valid → request succeeds.
    // If expired → response interceptor catches 401.
    // Calls refreshAccessToken().
    // Saves new token → retries the request.
// All this happens automatically, so your components don’t need to worry about tokens.