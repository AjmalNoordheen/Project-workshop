import axios from "axios";
import { useSelector } from "react-redux";
import { userApi} from "../Constants/Api";

const createUserInstance = () => {
  const token = useSelector((state)=> state.Client.Token);

  const userInstance = axios.create({
    baseURL: userApi,
  });


  userInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return userInstance;
};

export default createUserInstance;