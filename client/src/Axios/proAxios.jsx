import axios from "axios";
import { useSelector } from "react-redux";
import { proffesionalApi} from "../Constants/Api";

const createProfessionalInstance = () => {
  const token = useSelector(store=> store.Proffessional?store.Proffessional.Token:'');

  const professionalInstance = axios.create({
    baseURL: proffesionalApi,
  });


  professionalInstance.interceptors.request.use(
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

  return professionalInstance;
};

export default createProfessionalInstance;