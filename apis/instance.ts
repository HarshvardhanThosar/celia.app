import axios from "axios";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  //   timeout: 1000,
});

const authenticate_instance = (token: string) => {
  instance.defaults.headers.patch.Authorization = `Bearer ` + token;
};

const unauthenticate_instance = () => {
  instance.defaults.headers.delete.Authorization;
};

export { instance, authenticate_instance, unauthenticate_instance };
