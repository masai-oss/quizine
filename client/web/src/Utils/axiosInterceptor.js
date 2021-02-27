import { store } from "../store";
import axios from "axios";
import { authActions } from "../Structure/Authentication";

const axiosInterceptor = () => {
  const { dispatch } = store;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error?.response?.status === 401 &&
        localStorage.getItem("token")
      ) {
        dispatch(authActions.logoutProcess());
        window.open(process.env.REACT_APP_HOME, "_self");
      } 
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use((request) => {
    return request
  }, (error) => {
    return Promise.reject(error);
  })
};

export { axiosInterceptor };
