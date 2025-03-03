import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 1000,
  withCredentials: true,
});

const authenticate_instance = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ` + token;
};

const unauthenticate_instance = () => {
  instance.defaults.headers.delete.Authorization;
};

export { instance, authenticate_instance, unauthenticate_instance };
